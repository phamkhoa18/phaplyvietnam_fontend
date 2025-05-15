import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { ApiService } from 'src/app/services/api.service';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-quoctichvietnam',
  templateUrl: './quoctichvietnam.component.html',
  styleUrls: ['./quoctichvietnam.component.scss'],
  providers: [MessageService]
})
export class QuoctichvietnamComponent {
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

  listnation : any ;
  listtp : any ;
  listgiayto : any[] | undefined ;

  public lylichtuphap: any ;


  constructor(
    private fb: FormBuilder ,
    public api : ApiService ,
    private mess : MessageService,
    private data : DataService,
    private title : Title
  ) {
      this.lylichtuphap = this.fb.group({
        fullname : new FormControl('' , Validators.required ),
        gender: new FormControl('' , Validators.required),
        date : new FormControl('' , Validators.required),
        date_address : new FormControl(''),
        address_cu_tru: new FormControl('') ,
        address_thuong_tru: new FormControl('') ,
        quoctich_nuoc_ngoai: new FormControl('') ,
        loai_giayto: new FormControl('', Validators.required) ,
        so_giayto: new FormControl('' , Validators.required) ,
        ngaycap_giayto: new FormControl('') ,
        noicap_giayto: new FormControl('') ,
        date_now : new FormControl(Date.now()) ,
        ngay : new FormControl(''),
        thang : new FormControl(''),
        nam : new FormControl(''),
      });

      this.title.setTitle('Tờ Khai xác nhận có quốc tịch Việt Nam');
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.listgiayto = [
      {name : 'CMND / Identity card'},
      {name : 'Hộ chiếu / Passport'},
      {name : 'Thẻ thường trú / Residence card'},
      {name : 'Thẻ Căn cước công dân'}
    ]
  }

  onSelect(event: any) {
    this.selectedFiles = event.currentFiles;
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
    const control = this.lylichtuphap.get(controlName);
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

  toDateFormat(value : String) {
    const date = new Date(value.toString());
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
  }

  showWarn() {
    this.mess.add({ severity: 'error', summary: 'Error' , detail: 'Không đủ thông tin, vui lòng kiểm tra lại' , key: 'br', life: 3000 });
  }

  async submit() {
    if (this.lylichtuphap.valid) {
        const date = new Date(Date.now()) ;

        this.lylichtuphap.value.ngay = date.getDate() ;
        this.lylichtuphap.value.nam = date.getFullYear() ;
        this.lylichtuphap.value.thang = date.getMonth() + 1 ;


        const validDates = [
          'date',
          'ngaycap_giayto',
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
        data.append('name' , this.lylichtuphap.value.fullname) ;
        data.append('title' , 'TỜ KHAI XÁC NHẬN CÓ QUỐC TỊCH VIỆT NAM') ;
        data.append('content' , JSON.stringify(arraycontent));
        data.append('posision' , "quoc_tich_viet_nam");
        for (const image of this.selectedFiles) {
          data.append('images', image);
        };
      (await this.api.post('/addform' , data)).subscribe((v : any ) => {
        if(v.status == 200) {
          this.data.notification('Thông tin gửi lên đã thành công' , 'Cảm ơn bạn , chúng tôi sẽ hỗ trợ bạn nhanh nhất !' , 'success' , v.filename , 'output_docx');
          this.selectedFiles = [] ;
          this.resetForm() ;
        } else {
          this.showWarn() ;
        }
      })
    }
     else {
      this.showWarn() ;
      this.lylichtuphap.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.lylichtuphap.reset();
  }
}
