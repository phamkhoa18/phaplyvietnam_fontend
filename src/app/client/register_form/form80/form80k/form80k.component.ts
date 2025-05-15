import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Form80serviceService } from 'src/app/services/form80service.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GooglemapsService } from 'src/app/services/googlemaps.service';
import { formatDate } from '@angular/common';
declare var google: any;

@Component({
  selector: 'app-form80k',
  templateUrl: './form80k.component.html',
  styleUrls: ['./form80k.component.scss'],
  providers: [MessageService , ConfirmationService]
})
export class Form80kComponent {
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
 sectionGroupContainer: string = 'sectionK'
 countries: any[] | undefined;
 arrayvisit:any = [
     {name: "Du lịch / Travel"},
     {name: "Thăm thân nhân / Visit family"},
 ]

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
   this.countries = this.form80service.countries ;

 }

 onDateChange(event: any , namefield: string , items: any): void {
  if (event) {
    // Định dạng ngày thành MM/yyyy
    const formattedDate = formatDate(event, 'dd/MM/yyyy', 'en-US');
    // Set giá trị vào FormControl 'ap.addr to'
    items.get([namefield])?.setValue(formattedDate);
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



}
