import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { ApiService } from 'src/app/services/api.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { Title } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { Form80serviceService } from 'src/app/services/form80service.service';

@Component({
  selector: 'app-visa600v2',
  templateUrl: './visa600v2.component.html',
  providers: [MessageService , ConfirmationService],
  styleUrls: ['./visa600v2.component.scss']
})
export class Visa600v2Component {
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

  itemthongtin: any = {} ;
  thongtinarray:any = [] ;

  itemthanhvien: any = {} ;
  thongtinthanhvienarray:any = [] ;
  countries: any[] | undefined;

  public lylichtuphap: any ;
  uploadedFiles: any[] = [];
  selectedCountries: any ;



  constructor(
    private fb: FormBuilder ,
    public api : ApiService ,
    private mess : MessageService,
    private data : DataService,
    private title : Title,
    private form80service: Form80serviceService
  ) {
      this.lylichtuphap = this.fb.group({
        nuocngoai : new FormControl('' , Validators.required) ,
        oquocgia : new FormControl('' , Validators.required) ,
        textoquocgia : new FormControl('') ,
        quoctichvn : new FormControl('Quốc tịch Việt Nam (Citizent)' , Validators.required),
        mucdich : new FormControl('' , Validators.required),
        lydo : new FormArray([]),
        lydokhac : new FormControl(''),
        lydobl : new FormControl(''),
        datedenuc : new FormControl('', Validators.required) ,
        dktheonhom : new FormControl('' , Validators.required),
        nhanvien : new FormControl('' , Validators.required),
        ho : new FormControl('' , Validators.required),
        ten : new FormControl('' , Validators.required),
        gender: new FormControl('', Validators.required),
        date : new FormControl('' , Validators.required),
        sohc : new FormControl(''),
        quocgiacaphc : new FormControl(''),
        ngaycaphc : new FormControl(''),
        ngayhethc : new FormControl(''),
        noicaphc : new FormControl(''),
        cmnd : new FormControl('', Validators.required) ,
        socmnd : new FormControl('' ),
        quocgiacapcmnd : new FormControl('') ,
        noisinh : new FormControl(''),
        honnhan : new FormControl('', Validators.required),
        quoctichht : new FormControl('' , Validators.required),
        quoctichngoai : new FormControl(''),
        nopvisauc : new FormControl('' , Validators.required),
        tungdenuc : new FormControl('' , Validators.required),
        visauc : new FormControl(''),
        dc : new FormControl('' , Validators.required),
        sdt : new FormControl('', Validators.required),
        ndgiadinh : new FormArray([]) ,
        ndnguoithan : new FormArray([]) ,
        ndcongviec : new FormControl('') ,
        tuchoivisa : new FormControl('') ,
        email : new FormControl(''),
        date_ngay_now : new FormControl(''),
        date_thang_now : new FormControl(''),
        date_nam_now : new FormControl(''),
        date_now : new FormControl(Date.now()) ,
      });

      this.itemthongtin = this.fb.group({
          vaitro: new FormControl('', Validators.required),
          ten: new FormControl('', Validators.required),
          namsinh: new FormControl(''),
          quocgia: new FormControl(''),
      });

      this.itemthanhvien = this.fb.group({
        ten: new FormControl('', Validators.required),
        diachi : new FormControl(''),
        nghenghiep : new FormControl(''),
        namsinh: new FormControl(''),
        quocgia: new FormControl(''),
    });
      this.countries = this.form80service.countries ;
      this.title.setTitle('Lý lịch tư pháp 2024');
  }

  listlydo : any = [
    { i : 0, title : 'Du lịch' , value : false},
    {i : 1,title : 'Làm ăn' , value : false},
    { i : 2,title : 'Tham dự sự kiện' , value : false},
  ]

  onDateChange(event: any , namefield: string , items: any = null): void {
    if (event) {
      // Định dạng ngày thành MM/yyyy
      const formattedDate = formatDate(event, 'dd/MM/yyyy', 'en-US');
      console.log(formattedDate);

      // Set giá trị vào FormControl 'ap.addr to'
      if(items == null) {
        this.lylichtuphap.get(namefield)?.setValue(formattedDate);
      } else {
        items.get(namefield)?.setValue(formattedDate);
      }
    }
  }

  confirm() {
    if(this.itemthongtin.valid) {
      this.thongtinarray.push(this.itemthongtin.value);
      this.showSuccess() ;
    } else {
      this.showWarn() ;
      this.itemthongtin.markAllAsTouched();
    }
  }

  confirm2() {
    if(this.itemthanhvien.valid) {
      this.thongtinthanhvienarray.push(this.itemthanhvien.value);
      this.showSuccess() ;
    } else {
      this.showWarn() ;
      this.itemthanhvien.markAllAsTouched();
    }
  }

  remove(index: any, value: any) {
    this.thongtinarray.splice(index , 1)
    this.showDelele();
  }

  remove2(index: any, value: any) {
    this.thongtinthanhvienarray.splice(index , 1)
    this.showDelele();
  }

    // Hàm xử lý khi người dùng nhập ngày bằng tay
    onInputChange(event: any , namefield: string , items: any = null) {
      const inputValue = event.target.value;

      // Kiểm tra xem giá trị nhập có đúng định dạng không
      if (this.isValidDate(inputValue)) {
        const parsedDate = this.parseDate(inputValue); // Chuyển chuỗi thành đối tượng Date
        const formattedDate = formatDate(parsedDate, 'dd/MM/yyyy', 'en-US');
        console.log('Ngày đã nhập: ', formattedDate);
        console.log(formattedDate);
        if(items == null) {
          this.lylichtuphap.get(namefield)?.setValue(formattedDate);
        } else {
          items.get(namefield)?.setValue(formattedDate);
        }
      } else {
        console.log('Ngày không hợp lệ');
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

onCheckboxChange(event: any, nameControl: any , title: any) {
  console.log(event);

  this.selectedCountries = this.lylichtuphap.get(nameControl) as FormArray;

  // Kiểm tra nếu FormArray chưa được khởi tạo
  if (!this.selectedCountries) {
    console.error("FormArray chưa được khởi tạo");
    return;
  }

  if (event.checked && title) {
    if(event.checked[0] == null) {
      // Tìm vị trí của giá trị trong FormArray và xóa nó nếu có
      const index = this.selectedCountries.controls.findIndex((x: any) => x.value === title);
      if (index !== -1) {
        this.selectedCountries.removeAt(index);
      }
    } else {
      this.selectedCountries.push(new FormControl(event.checked[0]));
    }
  }
}


isChecked(title: string): boolean {
  const lydo: FormArray = this.lylichtuphap.get('lydo') as FormArray;
  return lydo.controls.some(control => control.value === title);
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

  showDelele() {
    this.mess.add({ severity: 'success', summary: 'Success' , detail: 'Xóa dữ liệu thành công' , key: 'br', life: 3000 });
  }

  showWarn() {
    this.mess.add({ severity: 'error', summary: 'Error' , detail: 'Không đủ thông tin, vui lòng kiểm tra lại' , key: 'br', life: 3000 });
  }

  showSuccess() {
    this.mess.add({ severity: 'success', summary: 'Success' , detail: 'Thêm dữ liệu thành công' , key: 'br', life: 3000 });
  }

  async submit() {
    if (this.lylichtuphap.valid) {
        const date = new Date(Date.now()) ;

        this.lylichtuphap.value.date_ngay_now = date.getDate() ;
        this.lylichtuphap.value.date_nam_now = date.getFullYear() ;
        this.lylichtuphap.value.date_thang_now = date.getMonth() + 1 ;

        const ndgiadinhArray = this.lylichtuphap.get('ndgiadinh') as FormArray;
        const ndnguoithanArray = this.lylichtuphap.get('ndnguoithan') as FormArray;

        // Clear FormArray trước khi thêm mới
        ndgiadinhArray.clear();
        ndnguoithanArray.clear();

        // Thêm FormControl cho từng phần tử trong mảng
        this.thongtinarray.forEach(() => ndgiadinhArray.push(new FormControl('')));
        this.thongtinthanhvienarray.forEach(() => ndnguoithanArray.push(new FormControl('')));

        // Gán giá trị vào FormArray
        ndgiadinhArray.setValue(this.thongtinarray);
        ndnguoithanArray.setValue(this.thongtinthanhvienarray);


      const formattedValues = { ...this.lylichtuphap.value };

        const arraycontent = [];
        arraycontent.push(formattedValues);

        const data = new FormData() ;
        data.append('name' , this.lylichtuphap.value.ten?.toString() ?? '') ;
        data.append('title' , 'THONG TIN VISA 600 (VISA DU LICH UC)') ;
        data.append('content' , JSON.stringify(arraycontent));
        data.append('posision' , "formvisa600");
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
      console.log('còn lỗi ');
      this.lylichtuphap.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.lylichtuphap.reset();
  }
}
