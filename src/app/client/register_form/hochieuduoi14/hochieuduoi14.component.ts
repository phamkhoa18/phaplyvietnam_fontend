import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'primeng/api';
import { DropdownFilterOptions } from 'primeng/dropdown';

@Component({
  selector: 'app-hochieuduoi14',
  templateUrl: './hochieuduoi14.component.html',
  styleUrls: ['./hochieuduoi14.component.scss'],
  providers: [MessageService]
})
export class Hochieuduoi14Component implements OnInit {

  placeholder: String = 'Nhập dữ liệu';
  selectedFiles: File[] = [];
  fileError: string | undefined;
  uploadedFiles: any[] = [];

  listdenghi : any = [
    {name : 'Cấp hộ chiếu có gắn chíp điện tử'},
    {name : "Cấp hộ chiếu không gắn chíp điện tử"},
  ]

  public hochieu : any ;

  constructor(
    private data : DataService , 
    public api : ApiService , 
    private titleService : Title , 
    private fb : FormBuilder,
    private mess : MessageService
  ) {
    this.titleService.setTitle('Tờ khai hộ chiếu dưới 14 tuổi');
  }

  ngOnInit(): void {
    this.hochieu = this.fb.group({
      fullname : new FormControl('' , Validators.required),
      firstname : new FormControl('' , Validators.required),
      lastname : new FormControl('' , Validators.required),
      gender : new FormControl('Nam') ,
      gender_14 : new FormControl('Nam') ,
      date : new FormControl('' , Validators.required) ,
      date_14 : new FormControl('' , Validators.required) ,
      date_address : new FormControl('' ),
      cmnd : new FormControl('' ) ,
      cmnd_14 : new FormControl('' ),
      cmnd_day : new FormControl(''),
      nation : new FormControl('' ) ,
      religion : new FormControl('' ) ,
      quoctich : new FormControl('') ,
      phone : new FormControl(''  , Validators.required) ,
      address_foreign : new FormControl(''),
      address_foreign_14 : new FormControl(''),
      quan_he : new FormControl('' , Validators.required) ,
      address_vn : new FormControl(''),
      job : new FormControl(''),
      address_organ : new FormControl(''),
      name_dad : new FormControl('' ),
      date_dad : new FormControl('') ,
      name_mother : new FormControl('' ),
      date_mother : new FormControl('') ,
      passport : new FormControl(''),
      day_pp : new FormControl(''),
      de_nghi : new FormControl('Cấp hộ chiếu có gắn chíp điện tử' , Validators.required),
      date_ngay_now : new FormControl(''),
      date_thang_now : new FormControl(''),
      date_nam_now : new FormControl(''),
      date_day : new FormControl(''),
      date_month : new FormControl(''),
      date_year : new FormControl(''),
      d14d : new FormControl(''),
      d14m : new FormControl(''),
      d14y : new FormControl(''),
    })
  }

  onSelect(event: any) {
    this.selectedFiles = event.currentFiles;
  }

  // Hàm xử lý khi người dùng nhập ngày bằng tay
  onInputChange(event: any, namefield: string, items: any = null) {
    const inputValue = event.target.value;

    // Kiểm tra xem giá trị nhập có đúng định dạng không
    if (this.isValidDate(inputValue)) {
      const parsedDate = this.parseDate(inputValue); // Chuyển chuỗi thành đối tượng Date
      this.hochieu.get(namefield)?.setValue(parsedDate);
    } else {
      // Nếu không hợp lệ, có thể giữ nguyên hoặc clear
      if (inputValue.trim() === '') {
        this.hochieu.get(namefield)?.setValue(null);
      }
    }
  }

  // Kiểm tra xem chuỗi có phải là ngày hợp lệ hay không
  isValidDate(dateString: string): boolean {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; // dd/MM/yyyy
    return regex.test(dateString);
  }

  // Chuyển chuỗi ngày thành đối tượng Date
  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(+year, +month - 1, +day);
  }

  onUpload(event: any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
    this.mess.add({severity: 'info', summary: 'Đã tải lên', detail: `${event.files.length} file`, key: 'br', life: 2000 });
  }

  customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions) {
      options.filter(event);
  }

  getErrorMessage(controlName: string): string {
    const control = this.hochieu.get(controlName);
    if (control && control.touched) {
      if (control.hasError('required')) {
        return 'Vui lòng không để trống';
      }
      if (control.hasError('email')) {
        return 'Please enter a valid email address.';
      }
      if (control.hasError('minlength')) {
        const minLength = control.errors?.['minlength'].requiredLength;
        return `Minimum length is ${minLength} characters.`;
      }
      if (control.hasError('maxlength')) {
        const maxLength = control.errors?.['maxlength'].requiredLength;
        return `Maximum length is ${maxLength} characters.`;
      }
      if (control.hasError('pattern')) {
        return 'Invalid format.';
      }
    }
    return '';
  }

  toDateFormat(value : any) {
    if (!value) return '';
    const date = value instanceof Date ? value : new Date(value.toString());
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
  }

  formatDateToVN(dateInput: string | Date): string {
    if (!dateInput) return '';
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } 

  formatDateToVietnamese(dateStr: string): string {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${day} tháng ${month} năm ${year}`;
  }

  showWarn() {
    this.mess.add({ severity: 'error', summary: 'Lỗi' , detail: 'Vui lòng điền đầy đủ thông tin bắt buộc' , key: 'br', life: 3000 });
  }

  extractYear(dateString: string): number | null {
    if (!dateString) return null;
    const parts = dateString.split('/');
    return parts.length === 3 ? parseInt(parts[2], 10) : null;
  }

  async submit() {
    if (this.hochieu.valid) {
        try {
          var contentObject: any = this.hochieu.value;
              
          if(this.hochieu.value.cmnd && this.hochieu.value.cmnd.toString().trim() != '') {
              const trimarray = this.hochieu.value.cmnd.toString().trim() ;
              const arraycmnd = trimarray.split('');
              contentObject.cmnd = arraycmnd;
          } else {
              contentObject.cmnd = '';
          }

          const date = new Date(Date.now()) ;

          this.hochieu.value.date_ngay_now = date.getDate().toString() ;
          this.hochieu.value.date_nam_now = date.getFullYear().toString() ;
          this.hochieu.value.date_thang_now = (date.getMonth() + 1).toString() ;

          // Handle date to format date function toDateFormat(input)
          const value = this.hochieu.value.date ? this.toDateVariable(this.hochieu.value.date) : null;
          const value2 = this.hochieu.value.date_14 ? this.toDateVariable(this.hochieu.value.date_14) : null;

          if (value && value.length >= 3) {
            this.hochieu.value.date_day = value[2] ;
            this.hochieu.value.date_month = value[1] ;
            this.hochieu.value.date_year = value[0] ;
          }

          if (value2 && value2.length >= 3) {
            this.hochieu.value.d14d = value2[2] ;
            this.hochieu.value.d14m = value2[1] ;
            this.hochieu.value.d14y = value2[0] ;
          }

          const validDates = [
            'cmnd_day',
            'date_dad',
            'date_mother',
            'day_pp'
          ];

          const formattedValues = { ...this.hochieu.value };

          // Format dates
          for (const field of validDates) {
            if (formattedValues[field]) {
                formattedValues[field] = this.toDateFormat(formattedValues[field]);
            } else {
                formattedValues[field] = '';
            }
          }

          // Format date and date_14 to Vietnamese format
          if (formattedValues.date) {
            formattedValues.date = this.toDateFormat(formattedValues.date);
            const objectVN = this.formatDateToVietnamese(formattedValues.date);
            formattedValues.date = objectVN;
          } else {
            formattedValues.date = '';
          }

          if (formattedValues.date_14) {
            formattedValues.date_14 = this.toDateFormat(formattedValues.date_14);
            const objectVN = this.formatDateToVietnamese(formattedValues.date_14);
            formattedValues.date_14 = objectVN;
          } else {
            formattedValues.date_14 = '';
          }

          // Ensure all fields are strings, not null/undefined
          for (const key in formattedValues) {
            if (formattedValues[key] === null || formattedValues[key] === undefined) {
              formattedValues[key] = '';
            } else if (formattedValues[key] instanceof Date) {
              // Convert Date to string format
              formattedValues[key] = this.toDateFormat(formattedValues[key]);
            } else if (typeof formattedValues[key] === 'object' && !Array.isArray(formattedValues[key])) {
              // Skip non-array objects
              continue;
            } else if (Array.isArray(formattedValues[key]) && formattedValues[key].length === 0) {
              // Empty arrays should be empty string
              formattedValues[key] = '';
            }
          }

          const arraycontent = [];
          arraycontent.push(formattedValues);

          console.log('Form data to send:', formattedValues);

          const data = new FormData() ;
          data.append('name' , this.hochieu.value.fullname ?? '') ;
          data.append('title' , 'Đăng ký hộ chiếu dưới 14') ;
          data.append('content' , JSON.stringify(arraycontent));
          data.append('posision' , "ho_chieu_duoi_14");
          for (const image of this.selectedFiles) {
            data.append('images', image);
          };

          console.log('Sending form data...');

          (await this.api.post('/addform' , data)).subscribe({
            next: (v : any ) => {
              console.log('Response received:', v);
              if(v && v.status == 200) {
                this.data.notification('Thông tin gửi lên đã thành công' , 'Cảm ơn bạn , chúng tôi sẽ hỗ trợ bạn nhanh nhất !' , 'success' , v.filename , 'output_docx');
                console.log('Success - filename:', v.filename);
                this.resetForm();
              } else {
                console.error('Response error:', v);
                this.data.notification('Thông tin gửi lên đã thất bại' , 'Bạn hãy kiểm tra lại xem mạng có ổn định chưa !' , 'error' , '' , '');
              }
            },
            error: (error: any) => {
              console.error('Error submitting form:', error);
              this.mess.add({ severity: 'error', summary: 'Lỗi', detail: 'Gửi form thất bại. Vui lòng thử lại!' , key: 'br', life: 3000 });
              this.data.notification('Thông tin gửi lên đã thất bại' , 'Đã xảy ra lỗi khi gửi form. Vui lòng thử lại sau!' , 'error' , '' , '');
            }
          })
        } catch (error) {
          console.error('Error in submit function:', error);
          this.mess.add({ severity: 'error', summary: 'Lỗi', detail: 'Xử lý form thất bại!' , key: 'br', life: 3000 });
        }
    } else {
      this.showWarn() ;
      this.hochieu.markAllAsTouched();
    }
  }

  toDateVariable(value: any ) {
    if (!value) return [];
    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = (value.getMonth() + 1).toString().padStart(2, '0');
      const day = value.getDate().toString().padStart(2, '0');
      return [year, month, day];
    }
    const valuenew = value.toString().split('-');
    return valuenew ;
  }

  resetForm(): void {
    this.hochieu.reset();
    this.uploadedFiles = [];
    this.selectedFiles = [];
  }
}
