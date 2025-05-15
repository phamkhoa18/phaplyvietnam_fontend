import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent {

  menu = new FormGroup({
    _id : new FormControl('') ,
    name : new FormControl('' , Validators.required ) ,
    parentcategory : new FormControl(null) ,
    image : new FormControl(''),
    filter : new FormControl(true)
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

    this.getSelect();
    this.getItem(myId) ;




  }

  async getItem(_id : any ) {
    (await this.api.get('/getcategory/' + _id)).subscribe((v) => {
        this.item = v ;

        this.menu.patchValue({
          _id : this.item._id ,
          name : this.item.title ,
          parentcategory : this.item.parent_id,
          filter : this.item.filter ,
          image : this.item.background
        })

        this.isLoading = false ;
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  async getSelect(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listcategory')).subscribe(
        (v: any) => {
          this.listselectdanhmuc = v;
          this.isLoading = false;
          resolve();
        },
        (error: any) => {
          reject();
        }
      );
    });
  };


 async  submit() {
    if (this.menu.valid) {
      const formData = new FormData();
      const filterValue = this.menu.value.filter ? 'true' : 'false';
      formData.append('_id' , this.item._id)
      formData.append('title' , this.menu.value.name ?? '');
      formData.append('parent_id' , this.menu.value.parentcategory ?? "");
      formData.append('background' , this.selectedFile ?? this.item.background);
      formData.append('background_old' , this.item.background);
      formData.append('filter' , filterValue );
      (await this.api.post("/edit_category" , formData)).subscribe((v : any ) => {
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
