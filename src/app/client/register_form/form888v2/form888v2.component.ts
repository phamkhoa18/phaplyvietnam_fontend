import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { Title } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { AutoSaveService, AutoSaveStatus } from 'src/app/services/auto-save.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form888v2',
  templateUrl: './form888v2.component.html',
  styleUrls: ['./form888v2.component.scss'],
  providers: [MessageService]
})
export class Form888v2Component implements OnInit, OnDestroy {
  date: Date[] | undefined;
  placeholder: String = 'Nhập dữ liệu';
  placeholder2: String = 'Ghi rõ các thông tin tại đây (Fill in the information here)';

  selectedFiles: File[] = [];
  fileError: string | undefined;
  public form888: FormGroup;
  uploadedFiles: any[] = [];
  selectedCountries: any;

  // Auto-save properties
  private readonly FORM_NAME = 'form888v2';
  private destroy$ = new Subject<void>();
  autoSaveStatus: AutoSaveStatus = { status: 'idle', lastSaved: null, message: '' };
  showRestorePrompt: boolean = false;
  hasSavedData: boolean = false;
  lastSavedTime: string = '';

  // list di trú
  listditru : any = [
    {name : 'PERMANENT RESIDENT (THƯỜNG TRÚ NHÂN ÚC)' } ,
    {name : 'AUSTRALIAN CITIZEN (CÔNG DÂN ÚC)'},
    {name : 'OTHER ( KHÁC)'}
  ]

  // list thời hạn
  listthoihan : any = [
    {name : 'VALID AUS PASSPORT (HỘ CHIẾU ÚC CÒN HẠN)'},
    {name : 'EXPIRED AUS PASSPORT (HỘ CHIẾU ÚC HẾT HẠN)'},
    {name : 'VALID VIET PASSPORT (HỘ CHIẾU VIỆT NAM CÒN HẠN)'},
    {name : 'EXPIRED VIET PASSPORT (HỘ CHIẾU VIỆT NAM HẾT HẠN)'},
    {name : 'PERMANENT RESIDENT VISA (GIẤY CẤP THƯỜNG TRÚ)'},
  ]

  constructor(
    private fb: FormBuilder,
    public api: ApiService,
    private mess: MessageService,
    private data: DataService,
    private title: Title,
    private ngZone: NgZone,
    private autoSaveService: AutoSaveService
  ) {
    this.form888 = this.fb.group({
      hoduongdon: new FormControl('', Validators.required),
      duongdon: new FormControl('', Validators.required),
      hobaolanh: new FormControl('', Validators.required),
      baolanh: new FormControl('', Validators.required),
      sonamquenbiet: new FormControl(''),
      sonamquenbietdc: new FormControl(''),
      hc: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      hofullname: new FormControl('', Validators.required),
      fullname: new FormControl('', Validators.required),
      job: new FormControl(''),
      ditru: new FormControl(''),
      thoihan: new FormControl('', Validators.required),
      songchung: new FormControl(''),
      quenbiet: new FormControl('', Validators.required),
      gapgo: new FormControl(''),
      nhanxet: new FormControl(''),
      tinquanhe: new FormControl(''),
      tamsu: new FormControl(''),
      cuxu: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      date_now: new FormControl(Date.now()),
      now: new FormControl(''),
      date_ngay_now: new FormControl(''),
      date_thang_now: new FormControl(''),
      date_nam_now: new FormControl(''),
    });
    this.title.setTitle('Tờ khai câu hỏi về mối quan hệ vợ chồng');
  }

  ngOnInit(): void {
    // Check for saved data
    this.checkForSavedData();

    // Subscribe to auto-save status
    this.autoSaveService.saveStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        this.autoSaveStatus = status;
      });

    // Setup auto-save on form changes (exclude files)
    this.form888.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(formValue => {
        if (this.form888.dirty) {
          this.autoSaveService.triggerAutoSave(this.FORM_NAME, formValue);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Check if there's saved data and show restore prompt
   */
  private checkForSavedData(): void {
    this.hasSavedData = this.autoSaveService.hasSavedData(this.FORM_NAME);
    
    if (this.hasSavedData) {
      const lastSaved = this.autoSaveService.getLastSavedTime(this.FORM_NAME);
      if (lastSaved) {
        this.lastSavedTime = this.autoSaveService.getTimeSince(lastSaved);
        this.showRestorePrompt = true;
      }
    }
  }

  /**
   * Restore saved form data
   */
  restoreSavedData(): void {
    const savedData = this.autoSaveService.restoreFormData(this.FORM_NAME);
    
    if (savedData) {
      this.form888.patchValue(savedData, { emitEvent: false });
      this.showRestorePrompt = false;
      this.mess.add({ 
        severity: 'success', 
        summary: 'Đã khôi phục', 
        detail: 'Dữ liệu đã được khôi phục thành công', 
        key: 'br', 
        life: 3000 
      });
    }
  }

  /**
   * Dismiss restore prompt and clear saved data
   */
  dismissRestorePrompt(): void {
    this.showRestorePrompt = false;
    this.autoSaveService.clearFormData(this.FORM_NAME);
  }

  /**
   * Get auto-save status icon
   */
  getAutoSaveIcon(): string {
    switch (this.autoSaveStatus.status) {
      case 'saving': return 'pi pi-spin pi-spinner';
      case 'saved': return 'pi pi-check-circle';
      case 'error': return 'pi pi-exclamation-circle';
      default: return 'pi pi-cloud';
    }
  }

  /**
   * Get auto-save status color
   */
  getAutoSaveColor(): string {
    switch (this.autoSaveStatus.status) {
      case 'saving': return 'text-blue-500';
      case 'saved': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-400';
    }
  }



  onSelect(event: any): void {
    this.selectedFiles = event.currentFiles;
  }

  onUpload(event: any): void {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.mess.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  markSectionAsTouched(sectionGroup: FormGroup): void {
    Object.keys(sectionGroup.controls).forEach(controlName => {
      const control = sectionGroup.get([controlName]);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markSectionAsTouched(control);
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.form888.get(controlName);
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

  toDateFormat(value: any): string {
    // Xử lý cả Date object và string
    let date: Date;
    if (value instanceof Date) {
      date = value;
    } else {
      date = new Date(value.toString());
    }
    
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  showWarn(): void {
    this.mess.add({ severity: 'error', summary: 'Error', detail: 'Kiểm tra lại thông tin', key: 'br', life: 3000 });
  }

  showSuccess(): void {
    this.mess.add({ severity: 'success', summary: 'Success', detail: 'Thêm dữ liệu thành công', key: 'br', life: 3000 });
  }

  xoaDauChu(s: string): string {
    return s.replace(/đ/g, "d").replace(/Đ/g, "D");
  }

  async submit(): Promise<void> {
    if (this.form888.valid) {
      const date = new Date(Date.now());
      const formattedValues = { ...this.form888.value };

      // Thêm thông tin ngày hiện tại
      formattedValues.date_ngay_now = date.getDate();
      formattedValues.date_nam_now = date.getFullYear();
      formattedValues.date_thang_now = date.getMonth() + 1;
      formattedValues.now = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

      // Format date fields
      const validDates = ['date'];
      for (const field of validDates) {
        if (formattedValues[field]) {
          formattedValues[field] = this.toDateFormat(formattedValues[field]);
        }
      }

      // Xóa dấu tiếng Việt
      for (const key in formattedValues) {
        if (formattedValues.hasOwnProperty(key) && typeof formattedValues[key] === 'string') {
          formattedValues[key] = this.xoaDauChu(formattedValues[key]);
        }
      }

      const arraycontent = [];
      arraycontent.push(formattedValues);

      const data = new FormData();
      data.append('name', formattedValues.fullname?.toString() ?? '');
      data.append('title', 'TỜ KHAI 888');
      data.append('content', JSON.stringify(arraycontent));
      data.append('posision', 'form888');
      
      for (const image of this.selectedFiles) {
        data.append('images', image);
      }

      (await this.api.post('/addform', data)).subscribe((v: any) => {
        if (v.status == 200) {
          this.data.notification('Thông tin gửi lên đã thành công', 'Cảm ơn bạn, chúng tôi sẽ hỗ trợ bạn nhanh nhất!', 'success', v.filename, 'output_docx');
          this.selectedFiles = [];
          // Clear auto-saved data after successful submit
          this.autoSaveService.clearFormData(this.FORM_NAME);
          this.hasSavedData = false;
        } else {
          this.showWarn();
        }
      });
    } else {
      this.showWarn();
      this.form888.markAllAsTouched();
      
      // Debug: Hiển thị các field bị lỗi
      this.logInvalidFields();
    }
  }

  // Method để debug và hiển thị các field invalid
  logInvalidFields(): void {
    const invalidFields: { [key: string]: string } = {
      'hoduongdon': 'Họ đương đơn',
      'duongdon': 'Tên đương đơn',
      'hobaolanh': 'Họ bảo lãnh',
      'baolanh': 'Tên bảo lãnh',
      'hofullname': 'Họ người làm tờ khai',
      'fullname': 'Tên người làm tờ khai',
      'gender': 'Giới tính',
      'date': 'Ngày sinh',
      'thoihan': 'Loại giấy tờ tùy thân (câu 14)',
      'quenbiet': 'Câu 16 - Mối quan hệ',
      'cuxu': 'Câu 18 - Cư xử'
    };

    const errors: string[] = [];
    Object.keys(this.form888.controls).forEach(key => {
      const control = this.form888.get(key);
      if (control && control.invalid) {
        const fieldName = invalidFields[key] || key;
        errors.push(fieldName);
      }
    });
    
    if (errors.length > 0) {
      const errorMessage = errors.length <= 3
        ? `Vui lòng kiểm tra: ${errors.join(', ')}`
        : `Vui lòng kiểm tra ${errors.length} trường còn thiếu thông tin`;

      this.mess.add({
        severity: 'warn',
        summary: 'Thông tin chưa đầy đủ',
        detail: errorMessage,
        key: 'br',
        life: 6000
      });

      // Scroll to first invalid field
      setTimeout(() => {
        const firstInvalidControl = document.querySelector('.valid');
        if (firstInvalidControl) {
          firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }

  resetForm(): void {
    this.form888.reset();
  }
}
