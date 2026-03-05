import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Form80serviceService } from 'src/app/services/form80service.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';
declare var google: any;

@Component({
  selector: 'app-form80g',
  templateUrl: './form80g.component.html',
  styleUrls: ['./form80g.component.scss'],
  providers: [MessageService , ConfirmationService]
})
export class Form80gComponent {
  @Output() next: EventEmitter<void> = new EventEmitter();
  @Output() back: EventEmitter<void> = new EventEmitter();
  // view child and input & ouput
  inputId: string = `autocomplete-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('autocomplete', { static: false }) autocompleteInput!: ElementRef;
  autocomplete: any;

  // variable
  form80: any ;
  date: Date[] | undefined;
  placeholder: String = 'Nhập dữ liệu';
  thongtinarray:any = [] ;
  itemthongtin: any = {} ;
  sectionGroupContainer: string = 'sectionG'
  countries: any[] | undefined;
  useCourses: any[] = [
      {name: 'Đã tốt nghiệp/ completed'},
      {name: 'Đã huỷ khoá học/ withdrew'},
      {name: 'Hiện tại đang học/ currently enrolled'},
  ]

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
      'ap.qual fr' : new FormControl(''),
      'ap.qual to' : new FormControl(''),
      'ap.qual name' : new FormControl('' , Validators.required),
      'ap.qual course' : new FormControl('', Validators.required),
      // 3 giá trị checkbox
      'ap.qualc' : new FormControl(''),
      'ap.qualp' : new FormControl(''),
      'ap.quale' : new FormControl(''),
      // tình trạng
      'ap.qualvalue' : new FormControl('') ,
      'ap.qual campus add' : new FormControl('' , Validators.required),
      'ap.qual country' : new FormControl(''),
    });
    this.countries = this.form80service.countries ;
    this.thongtinarray = JSON.parse(sessionStorage.getItem('thongtinarrayg') || '[]');
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
      sessionStorage.setItem('thongtinarrayg', JSON.stringify(this.thongtinarray)) ;
      this.handleCourses(this.thongtinarray);
      const arraynew = this.handleKeyValue(this.thongtinarray);
      this.addFieldsToFormArray(arraynew , section , fieldarray);
      this.form80service.setForm80(this.form80) ;
      this.goToNext();
    } else {
      this.showWarn() ;
      this.form80service.markSectionAsTouched(sectionGroup);
    }
  }

  handleCourses(array: any) {
      array.forEach((e: any , i: any) => {
          if(e['ap.qualvalue'] == 'Đã tốt nghiệp/ completed') {
              e['ap.qualc'] = 'on' ;
          }

          if(e['ap.qualvalue'] == 'Đã huỷ khoá học/ withdrew') {
              e['ap.qualp'] = 'on' ;
          }

          if(e['ap.qualvalue'] == 'Hiện tại đang học/ currently enrolled') {
              e['ap.quale'] = 'on' ;
          }
      })
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
          this.itemthongtin.get(['ap.qual campus add']).setValue(place.formatted_address);
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
            this.itemthongtin.get(['ap.qual country']).setValue(country);
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
