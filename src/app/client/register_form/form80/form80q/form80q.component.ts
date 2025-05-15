import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Form80serviceService } from 'src/app/services/form80service.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';
import { GooglemapsService } from 'src/app/services/googlemaps.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
declare var google: any;

@Component({
  selector: 'app-form80q',
  templateUrl: './form80q.component.html',
  styleUrls: ['./form80q.component.scss'] ,
  providers: [MessageService , ConfirmationService]
})
export class Form80qComponent {
@Output() next: EventEmitter<void> = new EventEmitter();
@Output() back: EventEmitter<void> = new EventEmitter();
isLoading: boolean = false ;
// view child and input & ouput
inputId: string = `autocomplete-${Math.random().toString(36).substr(2, 9)}`;
@ViewChild('autocomplete', { static: false }) autocompleteInput!: ElementRef;
autocomplete: any;

// variable
form80: any ;
date: Date[] | undefined;
placeholder: String = 'Nhập dữ liệu';
thongtinarray_children:any = [] ;
thongtinarray_parent: any = [] ;
thongtinarray_ae:any = [] ;
thongtinarray_thanhvien:any = [] ;
itemRes: any ;
itemthongtin_children: any = {} ;
itemthongtin_parent: any = {} ;
itemthongtin_ae: any = {} ;
itemthongtin_thanhvien: any = {} ;

itemthongtin2: any = {} ;
sectionGroupContainer: string = 'sectionQ'
countries: any[] | undefined;

arrayvisit:any = [
    {name: "Du lịch / Travel"},
    {name: "Thăm thân nhân / Visit family"},
]

arraysex:any = [
  {name: "Nam / Male" , value: 'M'},
  {name: "Nữ / Female" , value: 'F'},
  {name: "Không xác định / Gender unknown" , value: 'X'},
]

arrayyesno: any = [
  {name: "Có / Yes" , value: '2'},
  {name: "Không / No" , value: '1'},
]

public entries:any = [];
constructor(
  public form80service: Form80serviceService,
  private googleMapservice: GooglemapsService,
  private ngZone: NgZone,
  private mess: MessageService,
  private router: Router,
  private fb: FormBuilder,
  private api : ApiService
) {
}

goToNext(): void {
  this.next.emit();
}

goBack(): void {
  this.back.emit();
}


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  this.form80 = this.form80service.getForm80() ;
  this.itemthongtin_children = this.fb.group({
    'm.rel to you' : new FormControl('' , Validators.required),
    'm.name fam' : new FormControl('' , Validators.required),
    'm.name giv' : new FormControl('' , Validators.required),
    'm.name oth' : new FormControl(''),
    'm.sex' : new FormControl(''),
    'm.dob' : new FormControl(''),
    'm.chinese code' : new FormControl(''),
    'm.birth town' : new FormControl(''),
    'm.birth cntry' : new FormControl(''),
    'm.cit ctry yr grant' : new FormControl(''),
    'm.cor' : new FormControl(''),
    'm.migrating_value' : new FormControl('') ,
    'm.migrating_1' : new FormControl(''),
    'm.migrating_2' : new FormControl('')
  });

  this.itemthongtin_parent = this.fb.group({
    'pt.rel to you' : new FormControl('' , Validators.required),
    'pt.name fam' : new FormControl('' , Validators.required),
    'pt.name giv' : new FormControl('' , Validators.required),
    'pt.name oth' : new FormControl(''),
    'pt.sex' : new FormControl(''),
    'pt.dob' : new FormControl(''),
    'pt.chinese code' : new FormControl(''),
    'pt.birth town' : new FormControl(''),
    'pt.birth cntry' : new FormControl(''),
    'pt.cit ctry yr grant' : new FormControl(''),
    'pt.cor' : new FormControl(''),
    'pt.migrating_value' : new FormControl('') ,
    'pt.migrating_1' : new FormControl(''),
    'pt.migrating_2' : new FormControl('')
  });

  this.itemthongtin_ae = this.fb.group({
    'fm.rel to you' : new FormControl('' , Validators.required),
    'fm.name fam' : new FormControl('' , Validators.required),
    'fm.name giv' : new FormControl('' , Validators.required),
    'fm.name oth' : new FormControl(''),
    'fm.sex' : new FormControl(''),
    'fm.dob' : new FormControl(''),
    'fm.chinese code' : new FormControl(''),
    'fm.birth town' : new FormControl(''),
    'fm.birth cntry' : new FormControl(''),
    'fm.cit ctry yr grant' : new FormControl(''),
    'fm.cor' : new FormControl(''),
    'fm.migrating_value' : new FormControl('') ,
    'fm.migrating_1' : new FormControl(''),
    'fm.migrating_2' : new FormControl('')
  })

  this.itemthongtin_thanhvien = this.fb.group({
    'fmn.reltoyou' : new FormControl('' , Validators.required),
    'fmn.namefam' : new FormControl('' , Validators.required),
    'fmn.namegiv' : new FormControl('' , Validators.required),
    'fmn.nameoth' : new FormControl(''),
    'fmn.sex' : new FormControl(''),
    'fmn.dob' : new FormControl(''),
    'fmn.chinesecode' : new FormControl(''),
    'fmn.birthtown' : new FormControl(''),
    'fmn.birthcntry' : new FormControl(''),
    'fmn.citctryyrgrant' : new FormControl(''),
    'fmn.cor' : new FormControl(''),
  })
  this.countries = this.form80service.countries ;
  this.thongtinarray_children = JSON.parse(sessionStorage.getItem('thongtinarrayq0') || '[]');
  this.thongtinarray_parent = JSON.parse(sessionStorage.getItem('thongtinarrayq1') || '[]');
  this.thongtinarray_ae = JSON.parse(sessionStorage.getItem('thongtinarrayq2') || '[]');
  this.thongtinarray_thanhvien = JSON.parse(sessionStorage.getItem('thongtinarrayq3') || '[]');
  this.googleMapservice.loadGoogleMaps().then(() => {
    this.form80.get([this.sectionGroupContainer, 'ap.contact aus']).valueChanges.subscribe((value: any) => {
      if (value === '2') {
        console.log('sub thành công');
        setTimeout(() => {
          this.initializeAutocomplete('ap.contact add line 1' , this.autocompleteInput , this.autocomplete);
        } , 1000)
      }
    });
  }).catch(error => {
    console.error('Error loading Google Maps script:', error);
  });

  this.getPdfSlug() ;
}

async getPdfSlug() {
  (await this.api.get('/getpdfslug/' + 80)).subscribe((res : any) => {
     this.itemRes = res.message ;
  })
}

onDateChange(event: any , namefield: string , items: any): void {
  if (event) {
    // Định dạng ngày thành MM/yyyy
    const formattedDate = formatDate(event, 'dd/MM/yyyy', 'en-US');
    console.log(formattedDate);

    // Set giá trị vào FormControl 'ap.addr to'
    items.get([namefield])?.setValue(formattedDate);
  }
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
      this.form80.get([this.sectionGroupContainer,namefield])?.setValue(formattedDate);
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

onDateChangeF(event: any , namefield: string): void {
  if (event) {
    // Định dạng ngày thành MM/yyyy
    const formattedDate = formatDate(event, 'dd/MM/yyyy', 'en-US');
    // Set giá trị vào FormControl 'ap.addr to'
    this.form80.get([ this.sectionGroupContainer,namefield])?.setValue(formattedDate);
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

confirm(array: any , thongtin: any , arraydate: any = null) {
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

handleCourses(array: any , valuecheck : any , valuechange: any[]) {
  if(array.length == 0) {
    return ;
  }
  array.forEach((e: any , i: any) => {
      if(e[valuecheck] == '2') {
        // yes
          e[valuechange[0]] = 'on' ;
      }

      if(e[valuecheck] == '1') {
        // no
          e[valuechange[1]] = 'on' ;
      }

  })
}

async nextStep(section: string , fieldArrays: any , fieldArraysLocals: any) {
this.form80service.setisLoading(true) ;
 const sectionGroup = this.form80.get(section) as FormGroup;
 if (sectionGroup && sectionGroup.valid) {
  this.isLoading = true ;
   // Sau đó gọi emit để chuyển sang bước tiếp theo
  //  change các array trước khi thay đổi giá trị
  this.handleCourses(this.thongtinarray_children , 'm.migrating_value' , ['m.migrating_2' , 'm.migrating_1'] ) ;
  this.handleCourses(this.thongtinarray_parent , 'pt.migrating_value' , ['pt.migrating_2' , 'pt.migrating_1'] ) ;
  this.handleCourses(this.thongtinarray_ae , 'fm.migrating_value' , ['fm.migrating_2' , 'fm.migrating_1'] ) ;
   fieldArrays.forEach((v: any , i: any) => {
     // Sau đó gọi emit để chuyển sang bước tiếp theo
     sessionStorage.setItem('thongtinarrayq' + i, JSON.stringify(fieldArraysLocals[i])) ;
     const arraynew = this.handleKeyValue(fieldArraysLocals[i]);
     this.addFieldsToFormArray(arraynew , section , v);
   })
   this.form80service.setForm80(this.form80) ;
   const objectPhang = await this.form80service.mergeObjects(this.form80service.getForm80().value);
   this.submit({ pdfvalue : this.itemRes , data: objectPhang });
   this.goToNext() ;
 } else {
   this.showWarn() ;
   this.form80service.markSectionAsTouched(sectionGroup);
 }
}

next1() {
  Swal.fire({
    icon: "success",
    title: "Chúng tôi đã nhận được thông tin của bạn",
    showConfirmButton: false,
  });
}

async submit(data: any) {
  (await this.api.post('/add_pdf' , data)).subscribe((v : any ) => {
    if(v.status == 200) {
      this.isLoading = false ;
      //  sessionStorage.clear() ;
       Swal.fire({
        icon: "success",
        title: "Chúng tôi đã nhận được thông tin của bạn",
        showConfirmButton: false,
      });
      // this.form80service.form80.reset() ;
  } else {
    this.isLoading = false;
    Swal.fire({
      icon: "error",
      title: "Đã có lỗi xảy ra !!",
      text: "Vui lòng kiểm tra lại đường truyền internet !!!",
    });
  }
  })
}

// Hàm để chèn dữ liệu vào FormArray
addFieldsToFormArray(newArr: any[] , section: string , field: string) {
  const apNatArray = this.form80.get([section, field]) as FormArray;
  if(newArr.length == 0) {
    return ;
  }
  try {
    apNatArray.clear();
  } catch (error) {
    console.log(error);

  }
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

initializeAutocomplete(field: any = '' , autocompleteInput: any , autocomplete: any): void {

  if(field == '') {
    return ;
  }

  if (!autocompleteInput) {
    console.error('Autocomplete input không được tìm thấy.');
    return;
  }

  const autocompleteOptions = {
    types: ['geocode']
  };

  autocomplete = new google.maps.places.Autocomplete(autocompleteInput.nativeElement, autocompleteOptions);

  autocomplete.addListener('place_changed', () => {
    this.ngZone.run(() => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        console.log('Địa điểm đã chọn:', place.formatted_address);
        this.form80.get([this.sectionGroupContainer,field]).setValue(place.formatted_address);
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


