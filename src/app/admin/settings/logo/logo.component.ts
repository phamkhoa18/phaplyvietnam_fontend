import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  menu = new FormGroup({
    _id : new FormControl(''),
    link : new FormControl('' ) ,
    image : new FormControl(''),
    background_old : new FormControl(''),
    posision : new FormControl('logo')
  });

  selectedFile : File | undefined ;
  logo : any  ;
  isLoading : Boolean = true  ;



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData('logo');
  }

  constructor(public api : ApiService , private data : DataService) {}



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  async getData(posision : any ) {
    (await this.api.get('/getsettings/' + posision)).subscribe((v : any ) => {
        this.logo = v[0] ;
        this.menu.patchValue({
          _id : this.logo._id ,
          link : this.logo.link ,
          image : this.logo.image ,
          background_old : this.logo.image
        })
    })
  }




  async submit() {
    if (this.menu.valid) {
      console.log(this.menu.value);
      console.log(this.selectedFile);
      const formData = new FormData();
      formData.append('link' , this.menu.value.link ?? '');
      formData.append('posision' , this.menu.value.posision ?? 'logo');
      formData.append('image' , this.selectedFile ?? this.logo.image);

      if(this.menu.value._id = ''){
        (await this.api.post("/addsettings" , formData)).subscribe((v : any ) => {
          if(v.status == 200) {
            this.data.notification('Thêm logo thành công' , 'Thêm logo thành công','success');
            this.resetForm() ;
          } else {
            this.data.notification('Thêm logo thất bại' , 'Thêm logo thất bại' , 'error');
          }
      })
      } else {
        formData.append('_id' , this.logo._id );
        formData.append('background_old' , this.logo.image);

        (await this.api.post("/editsettings" , formData)).subscribe((v : any ) => {
          if(v.status == 200) {
            this.data.notification('Thay đổi logo thành công' , 'Thay đổi logo thành công','success');
            this.resetForm() ;
          } else {
            this.data.notification('Thay đổi logo thất bại' , 'Thay đổi logo thất bại' , 'error');
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
