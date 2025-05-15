import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-hochieu',
  templateUrl: './hochieu.component.html',
  styleUrls: ['./hochieu.component.scss']
})
export class HochieuComponent {

  @Input() name: string | undefined;
  @ViewChild('sigPad', { static: true }) sigPad!: ElementRef<HTMLCanvasElement>; // Sử dụng khai báo "!" để cho TypeScript biết sigPad đã được khởi tạo
  sigPadElement!: HTMLCanvasElement; // Sử dụng khai báo "!" để cho TypeScript biết sigPadElement đã được khởi tạo
  context!: CanvasRenderingContext2D; // Sử dụng khai báo "!" để cho TypeScript biết context đã được khởi tạo
  isDrawing = false;
  img: any;
  checkdongy: Boolean = false;
  public hochieu : any ;


  constructor(private data : DataService , public api : ApiService , private titleService : Title , private fb : FormBuilder) {
    this.titleService.setTitle('Thông tin tờ khai đăng kí làm hộ chiếu');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.hochieu = this.fb.group({
      firstname : new FormControl('' , Validators.required ) ,
      lastname : new FormControl('' , Validators.required ) ,
      gender : new FormControl('Nam') ,
      date_day : new FormControl('' , Validators.required) ,
      date_month : new FormControl('' , Validators.required) ,
      date_year : new FormControl('' , Validators.required) ,
      date_address : new FormControl(''),
      cmnd : new FormControl('' ) ,
      cmnd_day : new FormControl(''),
      nation : new FormControl('' ) ,
      religion : new FormControl('' ) ,
      phone : new FormControl(''  , Validators.required) ,
      address_foreign : new FormControl(''),
      address_vn : new FormControl(''),
      job : new FormControl(''),
      address_organ : new FormControl(''),
      name_dad : new FormControl(''),
      date_dad : new FormControl('' ),
      date_mother : new FormControl('' ),
      name_mother : new FormControl(''),
      name_chong_vo : new FormControl('' ),
      date_cv : new FormControl('' ),
      passport : new FormControl(''),
      day_pp : new FormControl(''),
      de_nghi : new FormControl('Cấp hộ chiếu có gắn chíp điện tử' , Validators.required),
      address_single : new FormControl('New South Wales' , Validators.required),
      day_address_single : new FormControl('' ),
      date_ngay_now : new FormControl(''),
      date_thang_now : new FormControl(''),
      date_nam_now : new FormControl(''),
    });

  }




  selectedFiles: File[] = [];
  fileError: string | undefined;

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    // Reset the file error message
  this.fileError = undefined;

  if (this.selectedFiles) {
    let totalSize = 0;
    const allowedFormats = ['image/jpeg', 'application/pdf'];

    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];

      if (!allowedFormats.includes(file.type)) {
        alert( `Định dạng tệp ${file.name} không hợp lệ. Chỉ hỗ trợ JPG và PDF.`);
        return;
      }

      totalSize += file.size;
    }

    if (totalSize > 6 * 1024 * 1024) {
      this.fileError = "Tổng kích thước tệp vượt quá 6MB.";
      alert(this.fileError);
      return;
    }
  }
}

toDateFormat(value : String) {
  const valuenew = value.split('-');
  return `${valuenew[2]}/${valuenew[1]}/${valuenew[0]}`
}





  async submit() {
    if (this.hochieu.valid) {
            var contentObject: any = this.hochieu.value;
            var fullname : any ;
            if (this.hochieu.value.firstname && this.hochieu.value.lastname) {
              fullname = this.hochieu.value.firstname.concat(this.hochieu.value.lastname);
              // Use the fullname variable as needed
            } else {
              fullname = this.hochieu.value.lastname ;
            }
            if(this.hochieu.value.cmnd) {
                const trimarray = this.hochieu.value.cmnd ;
                const arraycmnd = trimarray.split('');
                contentObject.cmnd = arraycmnd;
            }


            const date = new Date(Date.now()) ;

            this.hochieu.value.date_ngay_now = date.getDate().toString() ;
            this.hochieu.value.date_nam_now = date.getFullYear().toString() ;
            this.hochieu.value.date_thang_now = (date.getMonth() + 1).toString() ;

            const validDates = [
              'cmnd_day',
              'date_dad',
              'date_mother',
              'day_pp',
              'day_address_single',
              'date_cv'
          ];

          const formattedValues = { ...this.hochieu.value };

          for (const field of validDates) {
            if (formattedValues[field]) {
                formattedValues[field] = this.toDateFormat(formattedValues[field]);
            }
          }

          const arraycontent = [];
          arraycontent.push(formattedValues);

            const data = new FormData() ;
            data.append('name' , fullname) ;
            data.append('title' , 'Đăng ký hộ chiếu') ;
            data.append('content' , JSON.stringify(arraycontent));
            data.append('posision' , "ho_chieu");
            for (const image of this.selectedFiles) {
              data.append('images', image);
            };

            // Chuyển dữ liệu từ canvas thành định dạng hình ảnh

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
      this.hochieu.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.hochieu.reset();
  }

}
