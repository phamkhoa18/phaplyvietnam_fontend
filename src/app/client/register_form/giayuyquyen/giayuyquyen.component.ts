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
declare var google: any;

@Component({
  selector: 'app-giayuyquyen',
  templateUrl: './giayuyquyen.component.html',
  styleUrls: ['./giayuyquyen.component.scss'],
  providers: [MessageService]
})
export class GiayuyquyenComponent {
  date: Date[] | undefined;
  placeholder: String = 'Nhập dữ liệu';

  selectedFiles: File[] = [];
  fileError: string | undefined;
  public giayuyquyen: any ;
  uploadedFiles: any[] = [];
  selectedCountries: any ;


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
    private ngZone: NgZone,
  ) {

      this.giayuyquyen = this.fb.group({
          name: new FormControl('' , Validators.required),
          date: new FormControl('' , Validators.required),
          cmnd: new FormControl(''),
          capcmnd: new FormControl(''),
          noicap: new FormControl(''),
          diachi: new FormControl(''),
          conten: new FormControl('', Validators.required),
          datecon: new FormControl(''),
          // ủy quyền
          nameuq: new FormControl('' , Validators.required),
          dateuq: new FormControl('' , Validators.required),
          diachiuq: new FormControl(''),
          cmnduq: new FormControl(''),
          noicapuq: new FormControl(''),
          capngayuq: new FormControl(''),
          quanheuq: new FormControl(''),
          dulichuq: new FormControl(''),
          tubayuq: new FormControl(''),
          denbayuq: new FormControl(''),
          ngaybayuq: new FormControl(''),
          giobayuq: new FormControl(''),
          ngay: new FormControl(''),
          thang: new FormControl(''),
          nam: new FormControl(''),
      })
      this.title.setTitle('Tờ khai ủy quyền cho trẻ');
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
        this.giayuyquyen.get(namefield)?.setValue(formattedDate);
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
        this.giayuyquyen.get(namefield)?.setValue(formattedYear);
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
          this.giayuyquyen.get(namefield)?.setValue(formattedDate);
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
          this.giayuyquyen.get('giobayuq')?.setValue(formattedTime);
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
          this.giayuyquyen.get(namefield)?.setValue(formattedYear);
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
    const control = this.giayuyquyen.get(controlName);
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

  async submit() {
    if (this.giayuyquyen.valid) {
        const date = new Date(Date.now()) ;

        this.giayuyquyen.value.ngay = date.getDate() ;
        this.giayuyquyen.value.thang = date.getMonth() + 1 ;
        this.giayuyquyen.value.nam =  date.getFullYear() ;

      const formattedValues = { ...this.giayuyquyen.value };

        const arraycontent = [];
        arraycontent.push(formattedValues);

        const data = new FormData() ;
        data.append('name' , this.giayuyquyen.value.name?.toString() ?? '') ;
        data.append('title' , 'GIẤY ỦY QUYỀN') ;
        data.append('content' , JSON.stringify(arraycontent));
        data.append('posision' , "formgiayuyquyen");
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
      this.giayuyquyen.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.giayuyquyen.reset();
  }
}
