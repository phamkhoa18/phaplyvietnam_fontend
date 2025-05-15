import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Form80serviceService } from 'src/app/services/form80service.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';
import { GooglemapsService } from 'src/app/services/googlemaps.service';

declare var google: any;

@Component({
  selector: 'app-form80i',
  templateUrl: './form80i.component.html',
  styleUrls: ['./form80i.component.scss'],
  providers: [MessageService , ConfirmationService]
})
export class Form80iComponent {
// view child and input & ouput
@Output() next: EventEmitter<void> = new EventEmitter();
@Output() back: EventEmitter<void> = new EventEmitter();
inputId: string = `autocomplete-${Math.random().toString(36).substr(2, 9)}`;
@ViewChild('autocomplete', { static: false }) autocompleteInput!: ElementRef;
@ViewChild('autocomplete2', { static: false }) autocompleteInput2!: ElementRef;
autocomplete: any;
autocomplete2: any;

// variable
form80: any ;
date: Date[] | undefined;
placeholder: String = 'Nhập dữ liệu';
thongtinarray:any = [] ;
itemthongtin: any = {} ;
sectionGroupContainer: string = 'sectionI'
public entries:any = [];
constructor(
  public form80service: Form80serviceService,
  private googleMapservice: GooglemapsService,
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

  this.googleMapservice.loadGoogleMaps().then(() => {
    this.initializeAutocomplete('',this.autocompleteInput , this.autocomplete);
  }).catch(error => {
    console.error('Error loading Google Maps script:', error);
  });

  this.form80.get([this.sectionGroupContainer, 'ap.in aus add']).valueChanges.subscribe((value: any) => {
    if (value === '2') {
      console.log('sub thành công');
      setTimeout(() => {
        this.initializeAutocomplete('ap.in aus add line 1' , this.autocompleteInput , this.autocomplete);
      } , 1000)
    }
  });

  this.form80.get([this.sectionGroupContainer, 'ap.cur in aus add']).valueChanges.subscribe((value: any) => {
    if (value === '2') {
      console.log('sub thành công');
      setTimeout(() => {
        this.initializeAutocomplete('ap.cur in aus add line 1' , this.autocompleteInput2 , this.autocomplete2);
      } , 1000)
    }
  });
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

remove(index: any, value: any) {
  this.thongtinarray.splice(index , 1)
  this.showDelele();
}

nextStep(section: string) {
  const sectionGroup = this.form80.get(section) as FormGroup;
  if (sectionGroup && sectionGroup.valid) {
    // Sau đó gọi emit để chuyển sang bước tiếp theo
    this.form80service.setForm80(this.form80) ;
    this.goToNext() ;
  } else {
    this.showWarn() ;
    this.form80service.markSectionAsTouched(sectionGroup);
  }
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
}
