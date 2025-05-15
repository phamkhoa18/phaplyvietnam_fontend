import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { ApiService } from 'src/app/services/api.service';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { Title } from '@angular/platform-browser';
import { GooglemapsService } from 'src/app/services/googlemaps.service';
import { formatDate } from '@angular/common';
declare var google: any;
@Component({
  selector: 'app-dangkychubaolanh',
  templateUrl: './dangkychubaolanh.component.html',
  styleUrls: ['./dangkychubaolanh.component.scss'],
  providers: [MessageService]
})
export class DangkychubaolanhComponent {
  form80: any ;
  date: Date[] | undefined;
  placeholder: String = 'Nhập dữ liệu';
  isNext: boolean = false ;
  hochieu: any ;
  selectedFiles: File[] = [];
  fileError: string | undefined;
  inputId: string = `autocomplete-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('autocomplete', { static: false }) autocompleteInput!: ElementRef;
  autocomplete: any;

  tooltipOptions = {
    showDelay: 150,
    autoHide: false,
    tooltipEvent: 'hover',
    tooltipPosition: 'center'
};

  uploadedFiles: any[] = [];




  constructor(
    private fb: FormBuilder ,
    public api : ApiService ,
    private mess : MessageService,
    private data : DataService,
    private title : Title,
    private googleMapservice: GooglemapsService,
    private ngZone: NgZone,
  ) {

      this.hochieu = this.fb.group({
        Business : new FormControl('' , Validators.required ) ,
        Location : new FormControl('' , Validators.required ) ,
        Contact : new FormControl('' , Validators.required ) ,
        Email : new FormControl('' , Validators.required) ,
        Website : new FormControl('' ) ,
        Reprensentative : new FormControl('' ) ,
        Date : new FormControl('' ) ,
        Type : new FormControl('' ) ,
        Have : new FormControl('' ) ,
        obligations : new FormControl('' ) ,
        Currently : new FormControl('' ) ,
        fulltime : new FormControl('' ) ,
        parttime : new FormControl('' ) ,
        casual : new FormControl('' ) ,
        pr : new FormControl('' ) ,
        ac : new FormControl('' ) ,
        annual : new FormControl('' ) ,
        company : new FormControl('' ) ,
        date_ngay_now : new FormControl(''),
        date_thang_now : new FormControl(''),
        date_nam_now : new FormControl(''),
      });

      this.title.setTitle('Điều kiện trở thành chủ bảo lãnh trên nước Úc');

      this.googleMapservice.loadGoogleMaps().then(() => {
        this.initializeAutocomplete();
      }).catch(error => {
        console.error('Error loading Google Maps script:', error);
      });
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  }

  onSelect(event: any) {
    this.selectedFiles = event.currentFiles;
  }

   // Hàm xử lý khi người dùng nhập tháng/năm bằng tay
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
      this.hochieu.get(namefield)?.setValue(formattedDate);
    } else {
      items.get([namefield])?.setValue(formattedDate);
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



  onDateChange(event: any , namefield: string , items: any = null): void {
    if (event) {
      // Định dạng ngày thành MM/yyyy
      const formattedDate = formatDate(event, 'dd/MM/yyyy', 'en-US');
      console.log(formattedDate);

      // Set giá trị vào FormControl 'ap.addr to'
      if(items == null) {
        this.hochieu.get(namefield)?.setValue(formattedDate);
      } else {
        items.get([namefield])?.setValue(formattedDate);
      }
    }
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

  initializeAutocomplete(): void {
    if (!this.autocompleteInput) {
      console.error('Autocomplete input không được tìm thấy.');
      return;
    }

    const autocompleteOptions = {
      types: ['geocode']
    };

    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.nativeElement, autocompleteOptions);

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete.getPlace();
        if (place.geometry) {
          console.log('Địa điểm đã chọn:', place.formatted_address);
          this.hochieu.get(['Location']).setValue(place.formatted_address);
          // Lấy ra thành phần địa chỉ
          const addressComponents = place.address_components;
          let country = '';

          // Tìm quốc gia trong các thành phần địa chỉ
          for (const component of addressComponents) {
            if (component.types.includes('country')) {
              country = component.long_name; // Quốc gia (tên đầy đủ)
              break;
            }
          }
        } else {
          console.log('Không có thông tin địa điểm hợp lệ');
        }
      });
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
    if (this.hochieu.valid) {
      var fullname : any ;
      fullname = this.hochieu.value.Business

      const date = new Date(Date.now()) ;

      this.hochieu.value.date_ngay_now = date.getDate().toString() ;
      this.hochieu.value.date_nam_now = date.getFullYear().toString() ;
      this.hochieu.value.date_thang_now = (date.getMonth() + 1).toString() ;

    const formattedValues = { ...this.hochieu.value };

    const arraycontent = [];
    arraycontent.push(formattedValues);

        const data = new FormData() ;
        data.append('name' , fullname) ;
        data.append('title' , 'THÔNG TIN DOANH NGHIỆP') ;
        data.append('content' , JSON.stringify(arraycontent));
        data.append('posision' , "thongtinkhachhang");
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
      this.hochieu.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.hochieu.reset();
  }
}
