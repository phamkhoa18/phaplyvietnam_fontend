import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { Tooltip } from 'primeng/tooltip';
import { Form80serviceService } from 'src/app/services/form80service.service';

@Component({
  selector: 'app-form80b',
  templateUrl: './form80b.component.html',
  styleUrls: ['./form80b.component.scss'],
  providers: [MessageService]
})
export class Form80bComponent {
  @Output() next: EventEmitter<void> = new EventEmitter();
  @Output() back: EventEmitter<void> = new EventEmitter();
  form80: any ;
  date: Date[] | undefined;

  placeholder: String = 'Nhập dữ liệu';
  sectionGroupContainer: any = 'sectionB'
  countries: any[] | undefined;
  constructor(
    public form80service: Form80serviceService,
    private mess: MessageService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form80 = this.form80service.getForm80() ;
    this.countries = this.form80service.countries ;
  }

  onDateChange(event: any , namefield: string , items: any = null): void {
    if (event) {
      // Định dạng ngày thành MM/yyyy
      const formattedDate = formatDate(event, 'dd/MM/yyyy', 'en-US');
      console.log(formattedDate);

      // Set giá trị vào FormControl 'ap.addr to'
      if(items == null) {
        this.form80.get([this.sectionGroupContainer,namefield])?.setValue(formattedDate);
      } else {
        items.get([namefield])?.setValue(formattedDate);
      }
    }
  }

  goToNext(): void {
    this.next.emit();
  }

  goBack(): void {
    this.back.emit();
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

  showWarn() {
    this.mess.add({ severity: 'error', summary: 'Error' , detail: 'Không đủ thông tin, vui lòng kiểm tra lại' , key: 'br', life: 3000 });
  }

  showSuccess() {
    this.mess.add({ severity: 'error', summary: 'Error' , detail: 'Không đủ thông tin, vui lòng kiểm tra lại' , key: 'br', life: 3000 });
  }

  backStep() {
    this.goBack()
  }

  nextStep(section: string) {
    const sectionGroup = this.form80.get(section) as FormGroup;
    if (sectionGroup && sectionGroup.valid) {
      // Sau đó gọi emit để chuyển sang bước tiếp theo
      this.form80service.setForm80(this.form80) ;
      this.goToNext();
      console.log('Event nextCallback emitted');
    } else {
      this.showWarn() ;
      this.form80service.markSectionAsTouched(sectionGroup);
    }
  }
}
