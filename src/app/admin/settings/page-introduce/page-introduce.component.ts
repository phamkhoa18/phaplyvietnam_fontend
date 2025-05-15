import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-introduce',
  templateUrl: './page-introduce.component.html',
  styleUrls: ['./page-introduce.component.scss']
})
export class PageIntroduceComponent {
  menu = new FormGroup({
    _id : new FormControl(''),
    title : new FormControl('') ,
    description : new FormControl(''),
    image : new FormControl(''),
    background_old : new FormControl(''),
    posision : new FormControl('introduce')
  });

  selectedFile : File | undefined ;
  introduce : any  ;
  isLoading : Boolean = true  ;



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData('introduce');
  }

  constructor(public api : ApiService , private data : DataService) {}



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  async getData(posision : any ) {
    (await this.api.get('/getsettings/' + posision)).subscribe((v : any ) => {
        this.introduce = v[0] ;
        this.menu.patchValue({
          _id : this.introduce._id ,
          title : this.introduce.title ,
          description : this.introduce.description ,
          image : this.introduce.image ,
          background_old : this.introduce.image
        })
    })
  }




  async submit() {
    if (this.menu.valid) {
      const formData = new FormData();
      formData.append('title' , this.menu.value.title ?? '');
      formData.append('description' , this.menu.value.description ?? '');
      formData.append('posision' , this.menu.value.posision ?? 'introduce');
      formData.append('image' , this.selectedFile ?? this.introduce.image);
      if(this.menu.value._id = ''){
        (await this.api.post("/addsettings" , formData)).subscribe((v : any ) => {
          if(v.status == 200) {
            this.data.notification('Thêm introduce thành công' , 'Thêm introduce thành công','success');
            this.resetForm() ;
          } else {
            this.data.notification('Thêm introduce thất bại' , 'Thêm introduce thất bại' , 'error');
          }
      })
      } else {
        formData.append('_id' , this.introduce._id );
        formData.append('background_old' , this.introduce.image);

        (await this.api.post("/editsettings" , formData)).subscribe((v : any ) => {
          if(v.status == 200) {
            this.data.notification('Thay đổi introduce thành công' , 'Thay đổi introduce thành công','success');
            this.resetForm() ;
          } else {
            this.data.notification('Thay đổi introduce thất bại' , 'Thay đổi introduce thất bại' , 'error');
          }
      })
      }
    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.menu.markAllAsTouched();
    }
  }



  resetForm(): void {
    this.menu.reset();
  }
}
