import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Form80serviceService } from 'src/app/services/form80service.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';
declare var google: any;

@Component({
  selector: 'app-form80l',
  templateUrl: './form80l.component.html',
  styleUrls: ['./form80l.component.scss'] ,
  providers: [MessageService , ConfirmationService]
})
export class Form80lComponent {
// view child and input & ouput
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
thongtinarray2:any = [] ;
itemthongtin: any = {} ;
itemthongtin2: any = {} ;
sectionGroupContainer: string = 'sectionL'
countries: any[] | undefined;
arrayvisit:any = [
    {name: "Du lịch / Travel"},
    {name: "Thăm thân nhân / Visit family"},
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
    'ap.ms fr' : new FormControl(''),
    'ap.ms to' : new FormControl(''),
    'ap.ms country' : new FormControl(''  , Validators.required),
    'ap.ms name' : new FormControl('' , Validators.required),
    'ap.ms rank' : new FormControl(''  , Validators.required),
    'ap.ms duties' : new FormControl(''  , Validators.required),
    'ap.ms country dev' : new FormControl(''),
  });
  this.thongtinarray = JSON.parse(sessionStorage.getItem('thongtinarrayl') || '[]');
  this.countries = this.form80service.countries ;

}

goToNext(): void {
  this.next.emit();
}

goBack(): void {
  this.back.emit();
}


onDateChange(event: any , namefield: string , items: any): void {
 if (event) {
   // Định dạng ngày thành MM/yyyy
   const formattedDate = formatDate(event, 'dd/MM/yyyy', 'en-US');
   // Set giá trị vào FormControl 'ap.addr to'
   items.get([namefield])?.setValue(formattedDate);
 }
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

confirm(array: any , thongtin: any) {
  if(thongtin.valid) {
   array.push(thongtin.value);
    this.showSuccess() ;
  } else {
    this.showWarn() ;
    thongtin.markAllAsTouched();
  }
}

remove(index: any, value: any , array: any) {
 array.splice(index , 1)
  this.showDelele();
}


nextStep(section: string , fieldArrays: any , fieldArraysLocals: any) {
 const sectionGroup = this.form80.get(section) as FormGroup;
 if (sectionGroup && sectionGroup.valid) {
   // Sau đó gọi emit để chuyển sang bước tiếp theo
   fieldArrays.forEach((v: any , i: any) => {
     // Sau đó gọi emit để chuyển sang bước tiếp theo
     sessionStorage.setItem('thongtinarrayl', JSON.stringify(fieldArraysLocals[i])) ;
     const arraynew = this.handleKeyValue(fieldArraysLocals[i]);
     this.addFieldsToFormArray(arraynew , section , v);
     this.form80service.setForm80(this.form80) ;
   })
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
