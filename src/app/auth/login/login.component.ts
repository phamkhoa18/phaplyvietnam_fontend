import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  login = new FormGroup({
    email : new FormControl(''  , [Validators.required , Validators.email]),
    password : new FormControl('' , [Validators.required , Validators.minLength(5)])

  });

  constructor(private api : ApiService , private data : DataService , private router : Router) {

  }

  async submit() {
    if (this.login.valid) {
      console.log(this.login.value);

      (await this.api.post('/login' , this.login.value)).subscribe((v: any ) => {
          if(v.status == 200) {
              sessionStorage.setItem('user' , JSON.stringify(v.message));
              this.data.notification('Đăng nhập thành công' , 'Chào mừng ' + v.message.username + ' đã đăng nhập thành công' , 'success');
              this.router.navigate(['/admin/home']);
              window.location.reload();
          } else {
            this.data.notification('Đăng nhập thất bại' , 'Bạn đã đăng nhập thất bại vui lòng nhập lại' , 'error');
          }
      })

    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.login.markAllAsTouched();
    }
  }



}
