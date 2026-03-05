import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Form80serviceService } from 'src/app/services/form80service.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';
declare var google: any;

@Component({
  selector: 'app-form80d',
  templateUrl: './form80d.component.html',
  styleUrls: ['./form80d.component.scss'],
  providers: [MessageService , ConfirmationService]
})
export class Form80dComponent {

  @Output() next: EventEmitter<void> = new EventEmitter();
  @Output() back: EventEmitter<void> = new EventEmitter();
  inputId: string = `autocomplete-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('autocomplete', { static: false }) autocompleteInput!: ElementRef;
  autocomplete: any;

  // variable
  form80: any ;
  date: Date[] | undefined;
  placeholder: String = 'Nhập dữ liệu';
  thongtinarray:any = [] ;
  itemthongtin: any = {} ;
  sectionGroupContainer: string = 'sectionD'
  countries: any[] | undefined;

  public entries:any = [];
  constructor(
    public form80service: Form80serviceService,
    private ngZone: NgZone,
    private mess: MessageService,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.form80 = this.form80service.getForm80() ;
    this.itemthongtin = this.fb.group({
      'ap.addr fr' : new FormControl(''),
      'ap.addr to' : new FormControl(''),
      'ap.address live' : new FormControl('' , Validators.required),
      'ap.cntry lived' : new FormControl(''),
    });
    this.countries = this.form80service.countries ;
    this.thongtinarray = JSON.parse(sessionStorage.getItem('thongtinarrayd') || '[]');

  }

  onDateChange(event: any , namefield: string): void {
    if (event) {
      // Định dạng ngày thành MM/yyyy
      const formattedDate = formatDate(event, 'MM/yyyy', 'en-US');

      // Set giá trị vào FormControl 'ap.addr to'
      this.itemthongtin.get([namefield])?.setValue(formattedDate);
    }
  }

  goToNext(): void {
    this.next.emit();
  }

  goBack(): void {
    this.back.emit();
  }

 // Hàm xử lý khi người dùng nhập tháng/năm bằng tay
onInputChange(event: any, namefield: string, items: any = null) {
  const inputValue = event.target.value;

  // Kiểm tra xem giá trị nhập có đúng định dạng tháng/năm hay không
  if (this.isValidMonthYear(inputValue)) {
    const parsedDate = this.parseMonthYear(inputValue); // Chuyển chuỗi thành đối tượng Date
    const formattedDate = formatDate(parsedDate, 'MM/yyyy', 'en-US');
    console.log('Tháng/Năm đã nhập: ', formattedDate);

    if (items == null) {
      this.form80.get([this.sectionGroupContainer, namefield])?.setValue(formattedDate);
      console.log('set thanh công');

    } else {
      items.get([namefield])?.setValue(formattedDate);
    }
  } else {
    console.log('Tháng/Năm không hợp lệ');
  }
}

  // Kiểm tra xem chuỗi có phải là tháng/năm hợp lệ hay không
  isValidMonthYear(dateString: string): boolean {
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/; // MM/yyyy
    return regex.test(dateString);
  }

  // Chuyển chuỗi tháng/năm thành đối tượng Date
  parseMonthYear(dateString: string): Date {
    const [month, year] = dateString.split('/');
    return new Date(+year, +month - 1); // Đặt ngày là 1 và tháng bắt đầu từ 0
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

  get addDynamicRow() {
    return this.thongtinarray as FormArray;
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

  remove(index: any, value: any) {
    this.thongtinarray.splice(index , 1)
    this.showDelele();
  }


  nextStep(section: string , fieldarray: string) {
    const sectionGroup = this.form80.get(section) as FormGroup;
    if (sectionGroup && sectionGroup.valid) {
      // Sau đó gọi emit để chuyển sang bước tiếp theo
      sessionStorage.setItem('thongtinarrayd', JSON.stringify(this.thongtinarray)) ;
      const arraynew = this.handleKeyValue(this.thongtinarray);
      this.addFieldsToFormArray(arraynew , section , fieldarray);
      this.form80service.setForm80(this.form80) ;
      this.goToNext() ;
    } else {
      this.showWarn() ;
      this.form80service.markSectionAsTouched(sectionGroup);
    }
  }

  // Hàm để chèn dữ liệu vào FormArray
  addFieldsToFormArray(newArr: any[] , section: string , field: string) {
    const apNatArray = this.form80.get([section, field]) as FormArray;
    apNatArray.clear();
    // Duyệt qua từng phần tử của mảng newArr và thêm vào FormArray
    newArr.forEach((item) => {
      // Tạo một FormGroup cho mỗi đối tượng trong newArr
      const group = this.fb.group({});
      Object.keys(item).forEach((key) => {
        // Thêm mỗi trường (key) và giá trị vào FormGroup
        group.addControl(key, this.fb.control(item[key]));
      });
      // Đẩy FormGroup vào FormArray
      apNatArray.push(group);
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
          this.itemthongtin.get(['ap.address live']).setValue(place.formatted_address);
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

          if (country) {
            console.log('Quốc gia:', country);
            this.itemthongtin.get(['ap.cntry lived']).setValue(country);
          } else {
            console.log('Không tìm thấy quốc gia.');
          }
        } else {
          console.log('Không có thông tin địa điểm hợp lệ');
        }
      });
    });
  }

  handleKeyValue(array: any) {
    const newArr = array.map((item: any, index: number) => {
      let newItem: { [key: string]: any } = {}; // Khai báo kiểu newItem là object với các khóa dạng string
      Object.keys(item).forEach((key) => {
        newItem[key + ' ' + (index + 1).toString()] = item[key];
      });
      return newItem;
    });

    return newArr ;
  }


}

