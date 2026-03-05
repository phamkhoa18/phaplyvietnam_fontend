import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { ApiService } from 'src/app/services/api.service';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-hochieuv2',
  templateUrl: './hochieuv2.component.html',
  styleUrls: ['./hochieuv2.component.scss'],
  providers: [MessageService]
})
export class Hochieuv2Component {
form80: any ;
  date: Date[] | undefined;
  placeholder: String = 'Nhập dữ liệu';
  isNext: boolean = false ;

  selectedFiles: File[] = [];
  fileError: string | undefined;

  tooltipOptions = {
    showDelay: 150,
    autoHide: false,
    tooltipEvent: 'hover',
    tooltipPosition: 'center'
};


  listdenghi : any = [
    {name : 'Cấp hộ chiếu có gắn chíp điện tử'},
    {name : "Cấp hộ chiếu không gắn chíp điện tử"},
  ]

  public hochieu: any ;
  uploadedFiles: any[] = [];




  constructor(
    private fb: FormBuilder ,
    public api : ApiService ,
    private mess : MessageService,
    private data : DataService,
    private title : Title
  ) {

      this.hochieu = this.fb.group({
            firstname : new FormControl('' , Validators.required ) ,
            lastname : new FormControl('' , Validators.required ) ,
            gender : new FormControl('Nam') ,
            date: new FormControl('' , Validators.required),
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

      this.title.setTitle('Tờ khai hộ chiếu');
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  onSelect(event: any) {
    this.selectedFiles = event.currentFiles;
  }


  onUpload(event: any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.mess.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}



  customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions) {
      options.filter(event);
  }

  nextStep(section: string) {
    const sectionGroup = this.form80.get(section) as FormGroup;
    if (sectionGroup && sectionGroup.valid) {
      // Sau đó gọi emit để chuyển sang bước tiếp theo
      this.isNext = true ;
    } else {
      this.isNext = false ;
      this.markSectionAsTouched(sectionGroup);
    }
  }

  markSectionAsTouched(sectionGroup: FormGroup) {
    Object.keys(sectionGroup.controls).forEach(controlName => {
      const control = sectionGroup.get( [controlName] );
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markSectionAsTouched(control);
      }
    });
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
    
    let date: Date;
    
    // Nếu value đã là Date object
    if (value instanceof Date) {
      date = value;
    } else if (typeof value === 'string') {
      // Nếu là string, parse theo format dd/mm/yyyy hoặc ISO string
      if (value.includes('/')) {
        // Format dd/mm/yyyy
        const parts = value.split('/');
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
          const year = parseInt(parts[2], 10);
          date = new Date(year, month, day);
        } else {
          date = new Date(value);
        }
      } else {
        // ISO string hoặc format khác
        date = new Date(value);
      }
    } else {
      date = new Date(value);
    }
    
    if (isNaN(date.getTime())) return value.toString(); // nếu không hợp lệ thì trả lại nguyên
    
    // Sử dụng local date (không phải UTC) để tránh bị thụt ngày
    // PrimeNG calendar trả về Date object với local time, nên dùng getDate() thay vì getUTCDate()
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatDateToVN(dateInput: string | Date): string {
    const date = new Date(dateInput);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } 

  formatDateToVietnamese(dateStr: string): string {
    const [day, month, year] = dateStr.split('/');
    return `${day} tháng ${month} năm ${year}`;
  }


  showWarn() {
    this.mess.add({ severity: 'error', summary: 'Error' , detail: 'Không đủ thông tin, vui lòng kiểm tra lại' , key: 'br', life: 3000 });
  }


// Trả về chỉ năm từ chuỗi "dd/mm/yyyy"
extractYear(dateString: string): number | null {
  if (!dateString) return null;
  const parts = dateString.split('/');
  return parts.length === 3 ? parseInt(parts[2], 10) : null;
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
            
            if(this.hochieu.value.cmnd != '') {
                const trimarray = this.hochieu.value.cmnd ;
                const arraycmnd = trimarray.split('');
                contentObject.cmnd = arraycmnd;
            }


            const date = new Date(Date.now()) ;

            this.hochieu.value.date_ngay_now = date.getDate().toString() ;
            this.hochieu.value.date_nam_now = date.getFullYear().toString() ;
            this.hochieu.value.date_thang_now = (date.getMonth() + 1).toString() ;

            const validDates = [
              'date' ,
              'cmnd_day',
              'day_pp',
              'day_address_single',
          ];

          const formattedValues = { ...this.hochieu.value };

          for (const field of validDates) {
            if (formattedValues[field]) {
                formattedValues[field] = this.toDateFormat(formattedValues[field]);
            }
          }

          // Xử lý các trường năm sinh (date_dad, date_mother, date_cv) - chúng là number input
          // Chuyển đổi sang string nếu có giá trị
          if (formattedValues.date_dad !== null && formattedValues.date_dad !== undefined && formattedValues.date_dad !== '') {
            formattedValues.date_dad = formattedValues.date_dad.toString();
          }
          if (formattedValues.date_mother !== null && formattedValues.date_mother !== undefined && formattedValues.date_mother !== '') {
            formattedValues.date_mother = formattedValues.date_mother.toString();
          }
          if (formattedValues.date_cv !== null && formattedValues.date_cv !== undefined && formattedValues.date_cv !== '') {
            formattedValues.date_cv = formattedValues.date_cv.toString();
          }

           if (formattedValues.date) {
            const objectVN = this.formatDateToVietnamese(formattedValues.date);
            formattedValues.date = objectVN; // Gán vào trường mới, tránh ghi đè nếu cần giữ lại
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
    }
     else {
      this.showWarn() ;
      this.hochieu.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.hochieu.reset();
  }
}
