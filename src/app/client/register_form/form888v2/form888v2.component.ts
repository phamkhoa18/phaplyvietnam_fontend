import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { ApiService } from 'src/app/services/api.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { Title } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { Form80serviceService } from 'src/app/services/form80service.service';
import { GooglemapsService } from 'src/app/services/googlemaps.service';
declare var google: any;

@Component({
  selector: 'app-form888v2',
  templateUrl: './form888v2.component.html',
  styleUrls: ['./form888v2.component.scss'],
  providers: [MessageService]
})
export class Form888v2Component {
  date: Date[] | undefined;
  placeholder: String = 'Nhập dữ liệu';
  placeholder2: String = 'Ghi rõ các thông tin tại đây (Fill in the information here)';

  selectedFiles: File[] = [];
  fileError: string | undefined;
  public form888:any ;
  uploadedFiles: any[] = [];
  selectedCountries: any ;

  // list di trú
  listditru : any = [
    {name : 'PERMANENT RESIDENT (THƯỜNG TRÚ NHÂN ÚC)' } ,
    {name : 'AUSTRALIAN CITIZEN (CÔNG DÂN ÚC)'},
    {name : 'OTHER ( KHÁC)'}
  ]

  // list thời hạn
  listthoihan : any = [
    {name : 'VALID AUS PASSPORT (HỘ CHIẾU ÚC CÒN HẠN)'},
    {name : 'EXPIRED AUS PASSPORT (HỘ CHIẾU ÚC HẾT HẠN)'},
    {name : 'VALID VIET PASSPORT (HỘ CHIẾU VIỆT NAM CÒN HẠN)'},
    {name : 'EXPIRED VIET PASSPORT (HỘ CHIẾU VIỆT NAM HẾT HẠN)'},
    {name : 'PERMANENT RESIDENT VISA (GIẤY CẤP THƯỜNG TRÚ)'},
  ]


  inputId: string = `autocomplete-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('autocomplete', { static: false }) autocompleteInput!: ElementRef;
  @ViewChild('autocomplete2', { static: false }) autocompleteInput2!: ElementRef;
  autocomplete: any;
  autocomplete2: any;
  datetime12h: Date[] | undefined;

  datetime24h: Date[] | undefined;

  time: Date[] | undefined;

  constructor(
    private fb: FormBuilder ,
    public api : ApiService ,
    private mess : MessageService,
    private data : DataService,
    private title : Title,
    private googleMapservice: GooglemapsService,
    private ngZone: NgZone,
  ) {


    this.form888 = this.fb.group({
      hoduongdon : new FormControl('' , Validators.required),
      duongdon : new FormControl('' , Validators.required),
      hobaolanh : new FormControl('' , Validators.required),
      baolanh : new FormControl('' , Validators.required),
      sonamquenbiet : new FormControl('') ,
      sonamquenbietdc : new FormControl('') ,
      hc : new FormControl(''),
      email  :new FormControl('') ,
      address : new FormControl(''),
      phone : new FormControl(''),
      hofullname : new FormControl('' , Validators.required),
      fullname : new FormControl('' , Validators.required ),
      job : new FormControl('' ) ,
      ditru : new FormControl('' ),
      thoihan : new FormControl('' , Validators.required),
      songchung : new FormControl(''),
      quenbiet : new FormControl('' , Validators.required) ,
      gapgo : new FormControl('') ,
      nhanxet : new FormControl('') ,
      tinquanhe : new FormControl('') ,
      tamsu : new FormControl('') ,
      cuxu : new FormControl('' , Validators.required),
      gender: new FormControl('', Validators.required),
      date : new FormControl('' , Validators.required),
      date_now : new FormControl(Date.now()) ,
      now : new FormControl('') ,
      date_ngay_now : new FormControl(''),
      date_thang_now : new FormControl(''),
      date_nam_now : new FormControl(''),
    });
      this.title.setTitle('Tờ khai câu hỏi về mối quan hệ vợ chồng');
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }



  onDateChange(event: any , namefield: string , items: any = null): void {
    if (event) {
      // Định dạng ngày thành MM/yyyy
      const formattedDate = formatDate(event, 'dd/MM/yyyy', 'en-US');
      if(items == null) {
        this.form888.get(namefield)?.setValue(formattedDate);
      } else {
        items.get(namefield)?.setValue(formattedDate);
      }
    }
  }

  onDateChangeYear(event: any, namefield: string, items: any = null): void {
    if (event) {
      // Định dạng ngày thành chỉ năm (yyyy)
      const formattedYear = formatDate(event, 'yyyy', 'en-US');
      if (items == null) {
        this.form888.get(namefield)?.setValue(formattedYear);
      } else {
        items.get(namefield)?.setValue(formattedYear);
      }
    }
  }


    // Hàm xử lý khi người dùng nhập ngày bằng tay
    onInputChange(event: any , namefield: string , items: any = null) {
      const inputValue = event.target.value;

      // Kiểm tra xem giá trị nhập có đúng định dạng không
      if (this.isValidDate(inputValue)) {
        const parsedDate = this.parseDate(inputValue); // Chuyển chuỗi thành đối tượng Date
        const formattedDate = formatDate(parsedDate, 'dd/MM/yyyy', 'en-US');
        if(items == null) {
          this.form888.get(namefield)?.setValue(formattedDate);
        } else {
          items.get(namefield)?.setValue(formattedDate);
        }
      } else {
        console.log('Ngày không hợp lệ');
      }
    }

    onTimeSelect(event: any): void {
      if (event && event.value) {
        const selectedTime = event.value;

        // Kiểm tra kiểu dữ liệu của selectedTime
        console.log("Selected time: ", selectedTime);

        // Kiểm tra nếu giá trị là đối tượng Date hợp lệ
        if (selectedTime instanceof Date && !isNaN(selectedTime.getTime())) {
          const hours = selectedTime.getHours();
          const minutes = selectedTime.getMinutes();

          // Định dạng lại kết quả theo dạng "Giờ phút"
          const formattedTime = `${hours} giờ ${minutes} phút`;

          console.log("Formatted time: ", formattedTime);  // In ra kết quả

          // Cập nhật giá trị vào FormControl
          this.form888.get('giobayuq')?.setValue(formattedTime);
        } else {
          console.error("Invalid date value");
        }
      }
    }


    onInputChangeYear(event: any, namefield: string, items: any = null) {
      const inputValue = event.target.value;

      // Kiểm tra giá trị nhập có phải là năm hợp lệ không
      if (this.isValidYear(inputValue)) {
        const formattedYear = inputValue.trim(); // Giữ nguyên năm đã nhập
        if (items == null) {
          this.form888.get(namefield)?.setValue(formattedYear);
        } else {
          items.get(namefield)?.setValue(formattedYear);
        }
      } else {
        console.log('Năm không hợp lệ');
      }
    }

    // Hàm kiểm tra năm hợp lệ
    isValidYear(value: string): boolean {
      const yearPattern = /^\d{4}$/; // Định dạng năm gồm 4 chữ số
      const year = parseInt(value, 10);
      return yearPattern.test(value) && year >= 1900 && year <= new Date().getFullYear();
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
    const control = this.form888.get(controlName);
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
    this.mess.add({ severity: 'error', summary: 'Error' , detail: 'Kiểm tra lại thông tin' , key: 'br', life: 3000 });
  }

  showSuccess() {
    this.mess.add({ severity: 'success', summary: 'Success' , detail: 'Thêm dữ liệu thành công' , key: 'br', life: 3000 });
  }

  xoaDauChu(s: string): string {
    // Xóa dấu
    let chuoiKhongDau = s.replace(/đ/g, "d").replace(/Đ/g, "D");
    return chuoiKhongDau;
  }

  async submit() {
    if (this.form888.valid) {

      const date = new Date(Date.now()) ;

        this.form888.value.date_ngay_now = date.getDate() ;
        this.form888.value.date_nam_now = date.getFullYear() ;
        this.form888.value.date_thang_now = date.getMonth() + 1 ;

        this.form888.value.now = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();


        const validDates = [
          'date'
      ];

      const formattedValues = { ...this.form888.value };

      for (const field of validDates) {
        if (formattedValues[field]) {
            formattedValues[field] = this.toDateFormat(formattedValues[field]);
        }
      }

       // Duyệt qua các thuộc tính của formattedValues và áp dụng hàm xoaDauChu nếu là chuỗi
      for (const key in formattedValues) {
        if (formattedValues.hasOwnProperty(key) && typeof formattedValues[key] === 'string') {
          formattedValues[key] = this.xoaDauChu(formattedValues[key]);
        }
      }

        const arraycontent = [];
        arraycontent.push(formattedValues);

        const data = new FormData() ;
        data.append('name' , this.form888.value.fullname?.toString() ?? '') ;
        data.append('title' , 'TỜ KHAI 888') ;
        data.append('content' , JSON.stringify(arraycontent));
        data.append('posision' , "form888");
        for (const image of this.selectedFiles) {
          data.append('images', image);
        };


      (await this.api.post('/addform' , data)).subscribe((v : any ) => {
        if(v.status == 200) {
          this.data.notification('Thông tin gửi lên đã thành công' , 'Cảm ơn bạn , chúng tôi sẽ hỗ trợ bạn nhanh nhất !' , 'success' , v.filename , 'output_docx');
          // this.resetForm();
          this.selectedFiles = [] ;
        } else {
          this.showWarn() ;
        }
      })
    }
     else {
      this.showWarn() ;
      console.log('còn lỗi ');
      this.form888.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.form888.reset();
  }
}
