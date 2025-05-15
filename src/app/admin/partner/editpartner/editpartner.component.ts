import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editpartner',
  templateUrl: './editpartner.component.html',
  styleUrls: ['./editpartner.component.scss']
})
export class EditpartnerComponent {

  menu = new FormGroup({
    _id : new FormControl('') ,
    name : new FormControl('' , Validators.required ) ,
    href : new FormControl(''),
    image : new FormControl(''),
  });
  item : any ;
  selectedFile : File | undefined ;
  listselectdanhmuc : any = [] ;
  isLoading : Boolean = true ;

  constructor(public api : ApiService ,private data : DataService , private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const myId = this.route.snapshot.paramMap.get('id');
    this.getItem(myId) ;




  }

  async getItem(_id : any ) {
    (await this.api.get('/getpartner/' + _id)).subscribe((v) => {
        this.item = v ;

        this.menu.patchValue({
          _id : this.item._id ,
          name : this.item.title ,
          href : this.item.link ,
          image : this.item.background
        })

        this.isLoading = false ;
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

 async  submit() {
    if (this.menu.valid) {
      const formData = new FormData();
      formData.append('_id' , this.item._id)
      formData.append('title' , this.menu.value.name ?? '');
      formData.append('link' , this.menu.value.href ?? '');
      formData.append('background' , this.selectedFile ?? this.item.background);
      formData.append('background_old' , this.item.background);
      (await this.api.post("/edit_partner" , formData)).subscribe((v : any ) => {
          if(v.status == 200) {
            this.data.notification('Sửa danh mục thành công' , 'Sửa danh mục thành công','success');
          } else {
            this.data.notification('Sửa danh mục thất bại' , 'Sửa danh mục thất bại' , 'error');
          }
      })
    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.menu.markAllAsTouched();
    }
  }
}
