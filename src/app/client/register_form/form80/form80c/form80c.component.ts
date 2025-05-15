import { Component, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Form80serviceService } from 'src/app/services/form80service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form80c',
  templateUrl: './form80c.component.html',
  styleUrls: ['./form80c.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class Form80cComponent {
  @Output() next: EventEmitter<void> = new EventEmitter();
  @Output() back: EventEmitter<void> = new EventEmitter();
  form80: any ;
  date: Date[] | undefined;
  placeholder: String = 'Nhập dữ liệu';
  sectionGroupContainer: any = 'sectionC'
  thongtinarray:any = [] ;
  itemthongtin: any = {

  } ;
  countries: any[] | undefined;
  constructor(
    public form80service: Form80serviceService,
    private mess: MessageService,
    private router: Router,
    private fb: FormBuilder
  ) {
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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form80 = this.form80service.getForm80() ;
    this.itemthongtin = this.fb.group({
      'ap.nat id num type' : new FormControl('' , Validators.required),
      'ap.cntry issue' : new FormControl('' , Validators.required),
      'ap.id num' : new FormControl('' , Validators.required),

    });
    this.thongtinarray = JSON.parse(sessionStorage.getItem('thongtinarray') || '[]');
    this.form80service.thongtinarray_c = this.thongtinarray ;
    this.countries = this.form80service.countries ;
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


  nextStep(section: string) {
    const sectionGroup = this.form80.get(section) as FormGroup;
    if (sectionGroup && sectionGroup.valid) {
      // Sau đó gọi emit để chuyển sang bước tiếp theo
      const arrayhandle = this.thongtinarray ;
      sessionStorage.setItem('thongtinarray', JSON.stringify(arrayhandle)) ;
      const arraynew = this.handleKeyValue(arrayhandle);
      this.addFieldsToFormArray(arraynew , this.sectionGroupContainer);
      this.form80service.setForm80(this.form80) ;
      this.goToNext();
    } else {
      this.form80service.setForm80(this.form80) ;
      this.showWarn() ;
      this.form80service.markSectionAsTouched(sectionGroup);
    }
  }

  // Hàm để chèn dữ liệu vào FormArray
  addFieldsToFormArray(newArr: any[] , section: string) {
    const apNatArray = this.form80.get([section, 'ap.nat array']) as FormArray;
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
