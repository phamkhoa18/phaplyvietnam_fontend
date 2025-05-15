import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { ApiService } from 'src/app/services/api.service';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lylichtuphapv2',
  templateUrl: './lylichtuphapv2.component.html',
  styleUrls: ['./lylichtuphapv2.component.scss'],
  providers: [MessageService]
})


export class Lylichtuphapv2Component {
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

  listtokhai : any = [
    {name : 'Cá nhân'},
    {name : 'Cơ quan tiến hành tố tụng'},
    {name : 'Cơ quan tổ chức'},
    {name : "Uỷ quyền"}
  ];

  listdoituong : any = [
    {name : 'Không có thông tin'},
    {name : "Công dân Việt Nam"},
    {name : "Cơ quan tiến hành tố tụng"},
    {name : "Cơ quan tổ chức"},
    {name : "Nước ngoài"}
  ]

  public lylichtuphap: any ;
  uploadedFiles: any[] = [];




  constructor(
    private fb: FormBuilder ,
    public api : ApiService ,
    private mess : MessageService,
    private data : DataService,
    private title : Title
  ) {
      this.lylichtuphap = this.fb.group({
        address_thuong_tru : new FormControl(''),
        index_thuong_tru : new FormControl(''),
        thuong_tru: new FormControl(false),
        tam_tru: new FormControl(false),
        address_tam_tru : new FormControl(''),
        index_tam_tru : new FormControl(''),
        loai_giay_to : new FormControl('' , Validators.required),
        number_giay_to : new FormControl('' , Validators.required),
        ngay_cap_giay_to : new FormControl(''),
        noi_cap_giay_to : new FormControl(''),
        email : new FormControl(''),
        phone : new FormControl('', Validators.required),
        datacutru : new FormArray([]),
        to_khai : new FormControl('Cá nhân') ,
        doi_tuong : new FormControl('Công dân Việt Nam'),
        muc_dich_cap_phieu : new FormControl(''),
        so_luong_cap_them : new FormControl(''),
        thong_tin_an_tich : new FormControl(''),
        yeu_cau_cap_ly_lich : new FormControl('Số 1'),
        fullname : new FormControl('' , Validators.required ),
        fullname_new : new FormControl(''),
        nation : new FormControl('') ,
        national : new FormControl('') ,
        gender: new FormControl('Nam'),
        date : new FormControl('' , Validators.required),
        date_address : new FormControl(''),
        name_dad : new FormControl('' ),
        date_dad : new FormControl('' ),
        name_mother : new FormControl('' ),
        date_mother : new FormControl('' ),
        name_cv : new FormControl('' ),
        date_cv : new FormControl('' ),
        date_now : new FormControl(Date.now()) ,
        date_ngay_now : new FormControl(''),
        date_thang_now : new FormControl(''),
        date_nam_now : new FormControl(''),
      });

      this.title.setTitle('Lý lịch tư pháp 2024');
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


  addtr() {
    (this.lylichtuphap.get('datacutru') as FormArray).push(this.createItemFormGroup());
  }

  get addDynamicRow() {
    return this.lylichtuphap.get('datacutru') as FormArray;
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      tu_ngay: [''],
      den_ngay: [''],
      noi_cu_tru: [''],
      nghe_nghiep:  [''],
      noi_lam:  ['']
    });
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

        this.lylichtuphap.value.date_ngay_now = date.getDate() ;
        this.lylichtuphap.value.date_nam_now = date.getFullYear() ;
        this.lylichtuphap.value.date_thang_now = date.getMonth() + 1 ;


        const validDates = [
          'date',
          'ngay_cap_giay_to',
          'date_dad',
          'date_mother',
          'date_cv'
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
        data.append('title' , 'ĐĂNG KÝ LÝ LỊCH TƯ PHÁP') ;
        data.append('content' , JSON.stringify(arraycontent));
        data.append('posision' , "ly_lich_tu_phap_cap");
        for (const image of this.selectedFiles) {
          data.append('images', image);
        };

      (await this.api.post('/addform' , data)).subscribe((v : any ) => {
        if(v.status == 200) {
          this.data.notification('Thông tin gửi lên đã thành công' , 'Cảm ơn bạn , chúng tôi sẽ hỗ trợ bạn nhanh nhất !' , 'success' , v.filename , 'output_docx');
          this.resetForm();
          this.selectedFiles = [] ;
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
    // this.lylichtuphap.reset();
  }
}
