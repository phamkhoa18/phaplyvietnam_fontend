import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-lylichtuphap',
  templateUrl: './lylichtuphap.component.html',
  styleUrls: ['./lylichtuphap.component.scss']
})
export class LylichtuphapComponent {

  constructor(private data : DataService , public api : ApiService , private titleService : Title) {
      this.titleService.setTitle('Bản khai làm giấy Lý lịch tư pháp số 2');
  }

  lylichtuphap = new FormGroup({
    fullname : new FormControl('' , Validators.required ) ,
    gender : new FormControl('Nam') ,
    date : new FormControl(null ,Validators.required),
    date_address : new FormControl('' , Validators.required),
    national : new FormControl('' , Validators.required) ,
    passport : new FormControl('' , Validators.required),
    day_passport : new FormControl(null ,Validators.required),
    phone : new FormControl(''  , [Validators.required, Validators.pattern('[0-9]{9}')]) ,
    address_passport : new FormControl('' , Validators.required),
    name_dad : new FormControl('' ,Validators.required),
    date_dad : new FormControl(null ,Validators.required),
    name_mother : new FormControl('' ,Validators.required),
    date_mother : new FormControl(null ,Validators.required),
    name_chong_vo : new FormControl('' ),
    date_chong_vo : new FormControl(null ),
    email : new FormControl('' , [Validators.required , Validators.email]),
    date_ngay_now : new FormControl(''),
    date_thang_now : new FormControl(''),
    date_nam_now : new FormControl('')
  });


  async submit() {
    // console.log('khoa');

    if (this.lylichtuphap.valid) {
       console.log(this.lylichtuphap.value);
       var arraycontent = [] ;

       const date = new Date(Date.now());

       this.lylichtuphap.value.date_nam_now = date.getDate().toString() ;
        this.lylichtuphap.value.date_nam_now = date.getFullYear().toString()  ;
        this.lylichtuphap.value.date_thang_now = (date.getMonth() + 1).toString()  ;


        arraycontent.push(this.lylichtuphap.value);

        const data = new FormData() ;
        data.append('name' , this.lylichtuphap.value.fullname?.toString() ?? '') ;
        data.append('title' , 'Đăng ký Lý lịch tư pháp') ;
        data.append('content' , JSON.stringify(arraycontent));
        data.append('posision' , "ly_lich_tu_phap");


     (await this.api.post('/addform' , data)).subscribe((v : any ) => {
      if(v.status == 200) {
        this.data.notification('Thông tin gửi lên đã thành công' , 'Cảm ơn bạn , chúng tôi sẽ hỗ trợ bạn nhanh nhất !' , 'success' , v.filename , 'output_docx');
        console.log(v.filename);
        this.resetForm();
      } else {
          this.data.notification('Thông tin gửi lên đã thất bại' , 'Bạn hãy kiểm tra lại xem mạng có ổn định chưa !' , 'error' , '' , '');
      }
     })


    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.lylichtuphap.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.lylichtuphap.reset();
  }
}
