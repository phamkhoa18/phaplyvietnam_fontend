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
  selector: 'app-dangkymoiquanhevochong',
  templateUrl: './dangkymoiquanhevochong.component.html',
  styleUrls: ['./dangkymoiquanhevochong.component.scss'],
  providers: [MessageService]
})
export class DangkymoiquanhevochongComponent {
date: Date[] | undefined;
  placeholder: String = 'Nhập dữ liệu';
  placeholder2: String = 'Ghi rõ các thông tin tại đây (Fill in the information here)';

  selectedFiles: File[] = [];
  fileError: string | undefined;
  public quayuyquyen: any ;
  public moiquanhevochong: any ;
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

      this.moiquanhevochong = this.fb.group({
        // Phần 1
        name: new FormControl('' , Validators.required),
        date: new FormControl('', Validators.required),
        address: new FormControl(''),
        phone: new FormControl(''),
        email: new FormControl(''),
        name_2: new FormControl('', Validators.required),
        date_2: new FormControl(''),
        address_2: new FormControl(''),
        start_mqh: new FormControl(''),
        chinhthuc: new FormControl(''),
        chungsong: new FormControl(''),
        // Phần 2
        gapnhau: new FormControl(''),
        chudong: new FormControl(''),
        antuong: new FormControl(''),
        thuhut: new FormControl(''),
        thaoluan: new FormControl(''),
        timehenho: new FormControl(''),
        timebatdau: new FormControl(''),
        // Phần 3
        songchung: new FormControl(''),
        addresshenho: new FormControl(''),
        denghisongchung: new FormControl(''),
        phancong: new FormControl(''),
        hoatdong: new FormControl(''),
        covid: new FormControl(''),
        // Phần 4
        chungcty: new FormControl('', Validators.required),
        deschungcty: new FormControl(''),
        chungbank: new FormControl('', Validators.required),
        deschungbank: new FormControl(''),
        khoanphi: new FormControl(''),
        dautuchung: new FormControl(''),
        taisankhac: new FormControl(''),
        // Phần 5
        dulich: new FormControl('', Validators.required),
        desdulich: new FormControl(''),
        dangnho: new FormControl(''),
        kehoach: new FormControl(''),
        // Phần 6
        gioithieu2ben: new FormControl(''),
        gapbome: new FormControl(''),
        gapbomeconlai: new FormControl(''),
        thamgia: new FormControl(''),
        thanthiet: new FormControl(''),
        // Phần 7
        kehoachkethon: new FormControl(''),
        kehoachsinhcon: new FormControl(''),
        muanha: new FormControl(''),
        thuchiencungnhau: new FormControl(''),
        // Phần 8
        tinmqh: new FormControl(''),
        khokhan: new FormControl(''),
        chiasethem: new FormControl(''),
      })
      this.title.setTitle('Tờ khai câu hỏi về mối quan hệ vợ chồng');
  }

  onDateChange(event: any , namefield: string , items: any = null): void {
    if (event) {
      // Định dạng ngày thành MM/yyyy
      const formattedDate = formatDate(event, 'dd/MM/yyyy', 'en-US');
      if(items == null) {
        this.moiquanhevochong.get(namefield)?.setValue(formattedDate);
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
        this.moiquanhevochong.get(namefield)?.setValue(formattedYear);
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
          this.moiquanhevochong.get(namefield)?.setValue(formattedDate);
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
          this.moiquanhevochong.get('giobayuq')?.setValue(formattedTime);
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
          this.moiquanhevochong.get(namefield)?.setValue(formattedYear);
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
    const control = this.moiquanhevochong.get(controlName);
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
    if (this.moiquanhevochong.valid) {
      const formattedValues = { ...this.moiquanhevochong.value };

        const arraycontent = [];
        arraycontent.push(formattedValues);

        const data = new FormData() ;
        data.append('name' , this.moiquanhevochong.value.name?.toString() ?? '') ;
        data.append('title' , 'BẢNG CÂU HỎI VỀ MỐI QUAN HỆ VỢ CHỒNG') ;
        data.append('content' , JSON.stringify(arraycontent));
        data.append('posision' , "formmoiquanhevochong");
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
      this.moiquanhevochong.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.moiquanhevochong.reset();
  }
}
