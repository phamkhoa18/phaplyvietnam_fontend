# 📝 Hướng Dẫn Implement Auto-Save cho Forms

## 🎯 Tổng Quan

Hệ thống auto-save đã được implement với các tính năng:
- ✅ Tự động lưu dữ liệu form sau 2 giây khi có thay đổi
- ✅ Lưu trữ dữ liệu trong localStorage
- ✅ Khôi phục dữ liệu khi quay lại trang
- ✅ Hiển thị trạng thái lưu (saving/saved/error)
- ✅ Tự động xóa dữ liệu sau 7 ngày
- ✅ UI/UX đẹp với Tailwind CSS

## 📦 Files Đã Tạo

### 1. **AutoSaveService** 
`src/app/services/auto-save.service.ts`

Service chính quản lý toàn bộ chức năng auto-save.

## 🚀 Cách Implement cho Form Mới

### Bước 1: Import Dependencies trong Component

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoSaveService, AutoSaveStatus } from 'src/app/services/auto-save.service';
import { Subject, takeUntil } from 'rxjs';
```

### Bước 2: Thêm Properties vào Component Class

```typescript
export class YourFormComponent implements OnInit, OnDestroy {
  // Form group
  yourForm: FormGroup;

  // Auto-save properties
  private readonly FORM_NAME = 'your_unique_form_name'; // ⚠️ Phải unique!
  private destroy$ = new Subject<void>();
  autoSaveStatus: AutoSaveStatus = { status: 'idle', lastSaved: null, message: '' };
  showRestorePrompt: boolean = false;
  hasSavedData: boolean = false;
  lastSavedTime: string = '';

  constructor(
    private fb: FormBuilder,
    private autoSaveService: AutoSaveService,
    // ... other services
  ) {
    // Initialize form
    this.yourForm = this.fb.group({
      // your form controls
    });
  }
}
```

### Bước 3: Implement ngOnInit & ngOnDestroy

```typescript
ngOnInit(): void {
  // Check for saved data
  this.checkForSavedData();

  // Subscribe to auto-save status
  this.autoSaveService.saveStatus$
    .pipe(takeUntil(this.destroy$))
    .subscribe(status => {
      this.autoSaveStatus = status;
    });

  // Setup auto-save on form changes
  this.yourForm.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(formValue => {
      if (this.yourForm.dirty) {
        this.autoSaveService.triggerAutoSave(this.FORM_NAME, formValue);
      }
    });
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
```

### Bước 4: Thêm Helper Methods

```typescript
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
    this.yourForm.patchValue(savedData, { emitEvent: false });
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
```

### Bước 5: Clear Auto-Save Data After Submit

```typescript
async submit(): Promise<void> {
  if (this.yourForm.valid) {
    // ... submit logic ...
    
    // ⚠️ IMPORTANT: Clear auto-saved data after successful submit
    this.autoSaveService.clearFormData(this.FORM_NAME);
    this.hasSavedData = false;
  }
}
```

### Bước 6: Thêm UI Components vào Template

#### A. Auto-Save Status Indicator (Fixed Top-Right)

```html
<!-- Auto-save Status Indicator -->
<div class="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 transition-all duration-300"
     *ngIf="autoSaveStatus.status !== 'idle'"
     [ngClass]="{
       'border-l-4 border-blue-500': autoSaveStatus.status === 'saving',
       'border-l-4 border-green-500': autoSaveStatus.status === 'saved',
       'border-l-4 border-red-500': autoSaveStatus.status === 'error'
     }">
  <i [class]="getAutoSaveIcon() + ' text-lg ' + getAutoSaveColor()"></i>
  <div class="flex flex-col">
    <span class="text-sm font-medium text-gray-800">{{ autoSaveStatus.message }}</span>
    <span class="text-xs text-gray-500" *ngIf="autoSaveStatus.lastSaved">
      {{ autoSaveStatus.lastSaved | date: 'HH:mm:ss' }}
    </span>
  </div>
</div>
```

#### B. Restore Data Prompt

```html
<!-- Restore Data Prompt -->
<div class="mx-auto my-4 max-w-3xl" *ngIf="showRestorePrompt">
  <div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
    <div class="flex items-start justify-between">
      <div class="flex items-start gap-3">
        <i class="pi pi-info-circle text-blue-500 text-xl mt-1"></i>
        <div>
          <h3 class="text-base font-semibold text-blue-900 mb-1">Dữ liệu đã lưu</h3>
          <p class="text-sm text-blue-700 mb-3">
            Chúng tôi đã tìm thấy dữ liệu form được lưu tự động {{ lastSavedTime }}. 
            Bạn có muốn khôi phục dữ liệu này không?
          </p>
          <div class="flex gap-2">
            <button type="button" 
                    (click)="restoreSavedData()"
                    class="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2">
              <i class="pi pi-refresh text-xs"></i>
              Khôi phục dữ liệu
            </button>
            <button type="button"
                    (click)="dismissRestorePrompt()"
                    class="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2">
              <i class="pi pi-times text-xs"></i>
              Bỏ qua
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 🎨 Cải Thiện UI với Tailwind CSS

### Submit Button với Gradient & Hover Effects

```html
<div class="flex justify-center gap-4 mt-6">
  <button
      (click)="submit()"
      type="submit"
      class="relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg shadow-md hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95">
    <i class="pi pi-check-circle mr-2"></i>
    Hoàn Thành
  </button>
  
  <button
      type="button"
      (click)="resetForm()"
      class="relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200">
    <i class="pi pi-refresh mr-2"></i>
    Làm mới
  </button>
</div>
```

## ⚙️ Configuration

### AutoSaveService Settings

Có thể thay đổi trong `auto-save.service.ts`:

```typescript
private readonly AUTO_SAVE_DELAY = 2000; // 2 seconds (thời gian debounce)
private readonly MAX_STORAGE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
```

## 📊 API Methods của AutoSaveService

### Trigger Auto-Save
```typescript
this.autoSaveService.triggerAutoSave(formName: string, formData: any): void
```

### Restore Form Data
```typescript
const data = this.autoSaveService.restoreFormData(formName: string): any | null
```

### Clear Saved Data
```typescript
this.autoSaveService.clearFormData(formName: string): void
```

### Check if Has Saved Data
```typescript
const hasSaved = this.autoSaveService.hasSavedData(formName: string): boolean
```

### Get Last Saved Time
```typescript
const time = this.autoSaveService.getLastSavedTime(formName: string): Date | null
```

### Get Time Since Last Save
```typescript
const timeSince = this.autoSaveService.getTimeSince(date: Date): string
```

### Export/Import Data (Backup)
```typescript
const json = this.autoSaveService.exportFormData(formName: string): string | null
const success = this.autoSaveService.importFormData(formName: string, jsonData: string): boolean
```

## ⚠️ Important Notes

1. **Unique Form Names**: Mỗi form PHẢI có tên unique để tránh conflict
2. **Clear on Submit**: Luôn clear saved data sau khi submit thành công
3. **File Uploads**: Auto-save KHÔNG lưu files, chỉ lưu form values
4. **Performance**: Debounce 2 seconds để tránh lưu quá nhiều
5. **Storage Limit**: localStorage có giới hạn ~5-10MB tùy browser

## 🧪 Testing Checklist

- [ ] Form auto-save sau 2 seconds khi nhập liệu
- [ ] Hiển thị "Đang lưu..." khi saving
- [ ] Hiển thị "Đã lưu tự động" khi saved
- [ ] Restore prompt xuất hiện khi reload page
- [ ] Restore data hoạt động đúng
- [ ] Dismiss restore clear data
- [ ] Submit thành công clear auto-save data
- [ ] Data tự động xóa sau 7 ngày
- [ ] Multiple forms không conflict với nhau

## 🎯 Next Steps

Để implement cho form khác:
1. Copy code từ form888v2.component.ts
2. Thay đổi `FORM_NAME` thành tên unique
3. Copy HTML templates
4. Test thoroughly

## 📝 Example: Quick Implementation

```typescript
// your-form.component.ts
export class YourFormComponent implements OnInit, OnDestroy {
  private readonly FORM_NAME = 'your_form_name'; // Change this!
  private destroy$ = new Subject<void>();
  autoSaveStatus: AutoSaveStatus = { status: 'idle', lastSaved: null, message: '' };
  showRestorePrompt = false;
  hasSavedData = false;
  lastSavedTime = '';

  constructor(private autoSaveService: AutoSaveService) {}

  ngOnInit(): void {
    this.checkForSavedData();
    this.autoSaveService.saveStatus$.pipe(takeUntil(this.destroy$)).subscribe(s => this.autoSaveStatus = s);
    this.yourForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
      if (this.yourForm.dirty) this.autoSaveService.triggerAutoSave(this.FORM_NAME, v);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## 🆘 Support

Nếu gặp vấn đề, check:
1. Console logs cho errors
2. localStorage trong DevTools
3. Network tab cho API calls
4. Form validation status

Good luck! 🚀
