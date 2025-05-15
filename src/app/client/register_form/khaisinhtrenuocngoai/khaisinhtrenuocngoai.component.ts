import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-khaisinhtrenuocngoai',
  templateUrl: './khaisinhtrenuocngoai.component.html',
  styleUrls: ['./khaisinhtrenuocngoai.component.scss']
})
export class KhaisinhtrenuocngoaiComponent {

  public lylichtuphap : any ;

  constructor(private data : DataService , public api : ApiService, private titleService : Title) {
    this.titleService.setTitle('Giấy khai sinh cho trẻ em Việt Nam sinh ra tại nước ngoài');

    this.lylichtuphap = new FormGroup({
      fullname_req : new FormControl('' , Validators.required ) ,
      cmnd_req  : new FormControl('', Validators.required) ,
      relationship_req : new FormControl(''),
      address_req : new FormControl('' , Validators.required),
      fullname : new FormControl('' , Validators.required ),
      nation : new FormControl('') ,
      national : new FormControl('' , Validators.required) ,
      gender: new FormControl('Nam'),
      date : new FormControl('' , Validators.required),
      date_text : new FormControl(''),
      birthplace : new FormControl('', Validators.required),
      nativeland : new FormControl('' ),
      cmnd_day : new FormControl(Date),
      name_dad : new FormControl('' ,Validators.required),
      date_dad : new FormControl('' ,Validators.required),
      nation_dad : new FormControl('' ) ,
      national_dad : new FormControl('' , Validators.required) ,
      address_dad : new FormControl(''),
      nativeland_dad : new FormControl('' ),
      name_mother : new FormControl('' ,Validators.required),
      date_mother : new FormControl('' ,Validators.required),
      nation_mother : new FormControl('' ) ,
      national_mother : new FormControl('' , Validators.required) ,
      address_mother : new FormControl(''),
      nativeland_mother : new FormControl('' ),
      register : new FormControl(''),
      register_date : new FormControl('' ),
      numberregister : new FormControl('') ,
      address_register : new FormControl(''),
      date_cap_register : new FormControl(''),
      check : new FormControl(false),
      date_ngay_now : new FormControl(''),
      date_thang_now : new FormControl(''),
      date_nam_now : new FormControl('')
    });
  }


toDateFormat(value : String) {
  const valuenew = value.split('-');
  return `${valuenew[2]}/${valuenew[1]}/${valuenew[0]}`
}


 async submit() {
    if (this.lylichtuphap.valid) {
      if(this.lylichtuphap.value.check) {
        const date = new Date(Date.now()) ;

        this.lylichtuphap.value.date_ngay_now = date.getDay().toString() ;
        this.lylichtuphap.value.date_nam_now = date.getFullYear().toString()  ;
        this.lylichtuphap.value.date_thang_now = (date.getMonth() + 1).toString()  ;

        const validDates = [
          'date' ,
          'date_dad',
          'date_mother',
          'register_date',
          'date_cap_register'
      ];

      const formattedValues = { ...this.lylichtuphap.value };

      for (const field of validDates) {
        if (formattedValues[field]) {
            formattedValues[field] = this.toDateFormat(formattedValues[field]);
        }
      }

      const arraycontent = [];
      arraycontent.push(formattedValues);

        const data = new FormData() ;
        data.append('name' , this.lylichtuphap.value.fullname_req?.toString() ?? '') ;
        data.append('title' , 'Khai sinh cho trẻ nước ngoài') ;
        data.append('content' , JSON.stringify(arraycontent));
        data.append('posision' , "khai_sinh_tre_nuoc_ngoai");


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
            this.data.notification('Thông tin gửi lên đã thất bại' , 'Bạn hãy kiểm tra lại xem mạng có ổn định chưa !' , 'error' , '' , '');
      }
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
