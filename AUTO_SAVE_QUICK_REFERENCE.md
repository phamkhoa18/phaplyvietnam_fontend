# 🚀 Auto-Save Quick Reference Card

## 📦 Import (Component TypeScript)

```typescript
import { AutoSaveService, AutoSaveStatus } from 'src/app/services/auto-save.service';
import { Subject, takeUntil } from 'rxjs';
```

## 🔧 Component Properties

```typescript
private readonly FORM_NAME = 'unique_form_name'; // ⚠️ MUST BE UNIQUE!
private destroy$ = new Subject<void>();
autoSaveStatus: AutoSaveStatus = { status: 'idle', lastSaved: null, message: '' };
showRestorePrompt = false;
hasSavedData = false;
lastSavedTime = '';
```

## 🎯 Constructor Injection

```typescript
constructor(private autoSaveService: AutoSaveService) {}
```

## ⚡ ngOnInit Setup (Copy-Paste Ready)

```typescript
ngOnInit(): void {
  // Check saved data
  this.hasSavedData = this.autoSaveService.hasSavedData(this.FORM_NAME);
  if (this.hasSavedData) {
    const lastSaved = this.autoSaveService.getLastSavedTime(this.FORM_NAME);
    if (lastSaved) {
      this.lastSavedTime = this.autoSaveService.getTimeSince(lastSaved);
      this.showRestorePrompt = true;
    }
  }

  // Subscribe status
  this.autoSaveService.saveStatus$
    .pipe(takeUntil(this.destroy$))
    .subscribe(status => this.autoSaveStatus = status);

  // Auto-save on changes
  this.yourForm.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if (this.yourForm.dirty) {
        this.autoSaveService.triggerAutoSave(this.FORM_NAME, value);
      }
    });
}
```

## 🧹 ngOnDestroy Cleanup

```typescript
ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
```

## 🎨 Helper Methods (Copy All)

```typescript
restoreSavedData(): void {
  const data = this.autoSaveService.restoreFormData(this.FORM_NAME);
  if (data) {
    this.yourForm.patchValue(data, { emitEvent: false });
    this.showRestorePrompt = false;
  }
}

dismissRestorePrompt(): void {
  this.showRestorePrompt = false;
  this.autoSaveService.clearFormData(this.FORM_NAME);
}

getAutoSaveIcon(): string {
  const icons = {
    saving: 'pi pi-spin pi-spinner',
    saved: 'pi pi-check-circle',
    error: 'pi pi-exclamation-circle',
    idle: 'pi pi-cloud'
  };
  return icons[this.autoSaveStatus.status] || icons.idle;
}

getAutoSaveColor(): string {
  const colors = {
    saving: 'text-blue-500',
    saved: 'text-green-500',
    error: 'text-red-500',
    idle: 'text-gray-400'
  };
  return colors[this.autoSaveStatus.status] || colors.idle;
}
```

## ✅ Clear on Submit

```typescript
async submit(): Promise<void> {
  if (this.yourForm.valid) {
    // ... submit logic ...
    
    // ⚠️ IMPORTANT: Clear after success
    this.autoSaveService.clearFormData(this.FORM_NAME);
    this.hasSavedData = false;
  }
}
```

## 🎨 HTML Templates

### Status Indicator (Fixed Top-Right)

```html
<div class="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3"
     *ngIf="autoSaveStatus.status !== 'idle'"
     [ngClass]="{
       'border-l-4 border-blue-500': autoSaveStatus.status === 'saving',
       'border-l-4 border-green-500': autoSaveStatus.status === 'saved',
       'border-l-4 border-red-500': autoSaveStatus.status === 'error'
     }">
  <i [class]="getAutoSaveIcon() + ' ' + getAutoSaveColor()"></i>
  <div>
    <span class="text-sm font-medium">{{ autoSaveStatus.message }}</span>
  </div>
</div>
```

### Restore Prompt

```html
<div class="mx-auto my-4 max-w-3xl" *ngIf="showRestorePrompt">
  <div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
    <div class="flex items-start gap-3">
      <i class="pi pi-info-circle text-blue-500 text-xl"></i>
      <div>
        <h3 class="font-semibold text-blue-900 mb-2">Dữ liệu đã lưu</h3>
        <p class="text-sm text-blue-700 mb-3">
          Tìm thấy dữ liệu lưu {{ lastSavedTime }}. Khôi phục?
        </p>
        <div class="flex gap-2">
          <button (click)="restoreSavedData()"
                  class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Khôi phục
          </button>
          <button (click)="dismissRestorePrompt()"
                  class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Bỏ qua
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 🔥 Common API Methods

```typescript
// Trigger save
this.autoSaveService.triggerAutoSave(formName, data);

// Restore
const data = this.autoSaveService.restoreFormData(formName);

// Clear
this.autoSaveService.clearFormData(formName);

// Check exists
const exists = this.autoSaveService.hasSavedData(formName);

// Get last saved time
const time = this.autoSaveService.getLastSavedTime(formName);

// Time since
const since = this.autoSaveService.getTimeSince(date);
```

## ⚙️ Configuration

In `auto-save.service.ts`:

```typescript
AUTO_SAVE_DELAY = 2000;        // 2s debounce
MAX_STORAGE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
```

## ⚠️ Checklist

- [ ] Unique FORM_NAME
- [ ] Import dependencies
- [ ] Add properties
- [ ] Inject service
- [ ] ngOnInit setup
- [ ] ngOnDestroy cleanup
- [ ] Clear on submit
- [ ] Add HTML templates
- [ ] Test restore
- [ ] Test submit

## 🐛 Debugging

```typescript
// Log saved forms
console.log(this.autoSaveService.getAllSavedForms());

// Export data
const json = this.autoSaveService.exportFormData(formName);
console.log(json);

// Check localStorage
console.log(localStorage.getItem('autosave_' + formName));
```

## 📱 Browser DevTools

1. Open **Application tab**
2. Go to **Local Storage**
3. Look for keys: `autosave_*`
4. View/Edit/Delete data

## 🎯 Performance Tips

1. Use debounce (already built-in)
2. Don't save file uploads
3. Use `emitEvent: false` when restoring
4. Unsubscribe in ngOnDestroy
5. Clear after successful submit

## 🚨 Common Mistakes

❌ **DON'T:**
- Forget to clear on submit
- Use duplicate form names
- Save files to localStorage
- Forget to unsubscribe

✅ **DO:**
- Use unique form names
- Clear on successful submit
- Handle errors gracefully
- Test restore functionality

## 📊 Status Values

```typescript
type Status = 'idle' | 'saving' | 'saved' | 'error';
```

| Status | Icon | Color | Meaning |
|--------|------|-------|---------|
| idle | cloud | gray | No activity |
| saving | spinner | blue | Saving now |
| saved | check | green | Save success |
| error | exclamation | red | Save failed |

## 🎨 Tailwind Classes

```css
/* Container */
fixed top-4 right-4 z-50

/* Colors */
border-blue-500 text-blue-500
border-green-500 text-green-500
border-red-500 text-red-500

/* Spacing */
gap-2 gap-3 gap-4
px-4 py-3 p-4

/* Effects */
rounded-lg shadow-lg
hover:bg-blue-600
transition-all duration-300
```

---

**Need help?** Check `AUTO_SAVE_IMPLEMENTATION_GUIDE.md`
