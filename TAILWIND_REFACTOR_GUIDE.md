# 🎨 Tailwind CSS Refactor Guide - Form888v2

## ✅ ĐÃ FIX:

### 1. SCSS File - Cleaned Up
- ❌ Xóa tất cả font-size overrides (làm input nhỏ)
- ❌ Xóa tất cả inline styles conflicts
- ✅ Chỉ giữ PrimeNG essentials
- ✅ Error states với Tailwind

### 2. HTML Refactoring Pattern

## 🎯 PATTERN CHUYỂN ĐỔI:

### ❌ OLD (Bootstrap + Inline Styles):
```html
<div class="col-md-4">
  <div class="d-flex flex-column pb-3" style="height: 100%;">
    <label class="d-block font-weight-bold mb-2 title-input">
      Label <span class="request">*</span>
    </label>
    <input type="text" pInputText
      [formControlName]="'field'"
      [placeholder]="placeholder"
    />
  </div>
</div>
```

### ✅ NEW (Tailwind CSS):
```html
<div class="md:col-span-4">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Label <span class="request">*</span>
  </label>
  <input type="text" pInputText
    formControlName="field"
    [placeholder]="placeholder"
    class="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
  />
  <span class="error-message" *ngIf="getErrorMessage('field') != ''">
    {{ getErrorMessage('field') }}
  </span>
</div>
```

## 📋 REPLACEMENT MAP:

### Layout Classes:
```
Bootstrap → Tailwind
--------------------------
col-md-4 → md:col-span-4
col-md-6 → md:col-span-6
col-md-8 → md:col-span-8
col-md-12 → md:col-span-12 hoặc col-span-full
row → grid grid-cols-1 md:grid-cols-12 gap-4

d-flex → flex
d-block → block
d-inline-block → inline-block
flex-column → flex-col
flex-row → flex-row
align-items-center → items-center
justify-content-center → justify-center
gap-3 → gap-3 (giống nhau!)
```

### Spacing Classes:
```
Bootstrap → Tailwind
--------------------------
pb-3 → pb-3 hoặc pb-4
mb-2 → mb-2
mt-4 → mt-4
px-4 → px-4
py-2 → py-2
```

### Text Classes:
```
Bootstrap → Tailwind
--------------------------
font-weight-bold → font-semibold hoặc font-bold
text-center → text-center
text-left → text-left
font-size: 15px → text-base
font-size: 14px → text-sm
font-size: 12px → text-xs
```

### Colors:
```
CSS → Tailwind
--------------------------
color: #333 → text-gray-800
color: red → text-red-600
background-color: #f5f5f5 → bg-gray-100
background-color: #fff → bg-white
border-color: #1a8b83 → border-teal-600
```

## 🎨 INPUT FIELD PATTERN:

### Standard Text Input:
```html
<input type="text" pInputText
  formControlName="fieldName"
  [ngClass]="{'valid': form888.get('fieldName')?.invalid && (form888.get('fieldName')?.dirty || form888.get('fieldName')?.touched)}"
  [placeholder]="placeholder"
  class="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
/>
```

### Textarea:
```html
<textarea
  rows="6"
  pInputTextarea
  formControlName="fieldName"
  [placeholder]="placeholder2"
  class="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all"
></textarea>
```

### Dropdown:
```html
<p-dropdown
  [options]="listOptions"
  formControlName="fieldName"
  placeholder="Vui lòng chọn"
  [filter]="true"
  filterBy="name"
  [showClear]="true"
  optionLabel="name"
  optionValue="name"
  styleClass="w-full"
>
</p-dropdown>
```

### Calendar:
```html
<p-calendar
  placeholder="dd/mm/yyyy"
  [dateFormat]="'dd/mm/yy'"
  formControlName="date"
  (onSelect)="onDateChange($event, 'date')"
  (onInput)="onInputChange($event, 'date')"
  styleClass="w-full"
>
</p-calendar>
```

### Radio Buttons:
```html
<div class="flex flex-wrap gap-4">
  <div class="flex items-center gap-2">
    <p-radioButton formControlName="gender" value="Nam" />
    <label class="text-sm text-gray-700 cursor-pointer">Nam</label>
  </div>
  <div class="flex items-center gap-2">
    <p-radioButton formControlName="gender" value="Nữ" />
    <label class="text-sm text-gray-700 cursor-pointer">Nữ</label>
  </div>
</div>
```

## 🎯 SECTION HEADER PATTERN:

```html
<!-- Section Header -->
<div class="relative flex items-center mb-6 border-b-2 border-teal-600 pb-3">
  <div class="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
    2
  </div>
  <div class="ml-4">
    <h2 class="text-xl md:text-2xl font-semibold text-teal-700 uppercase">
      {{ 'FORM_888.PHAN_2.TITLE' | translate }}
    </h2>
  </div>
</div>
```

## 📝 STEP-BY-STEP REFACTORING:

### 1. Xóa Inline Styles:
```diff
- <div style="padding: 20px;">
+ <div class="p-5">

- <div style="background-color: #1A8B83;">
+ <div class="bg-teal-600">

- <div style="border-radius: 10px;">
+ <div class="rounded-xl">
```

### 2. Replace Bootstrap Grid:
```diff
- <div class="row">
-   <div class="col-md-4">
+ <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
+   <div class="md:col-span-4">
```

### 3. Replace Bootstrap Utilities:
```diff
- <div class="d-flex align-items-center">
+ <div class="flex items-center">

- <label class="d-block font-weight-bold mb-2">
+ <label class="block font-semibold mb-2">
```

### 4. Add Tailwind to PrimeNG:
```diff
  <input type="text" pInputText
    formControlName="field"
+   class="w-full px-4 py-3 text-base border border-gray-300 rounded-lg"
  />
```

## 🎨 COMMON TAILWIND PATTERNS:

### Container:
```html
<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Card:
```html
<div class="bg-white rounded-xl shadow-sm p-6">
```

### Grid 2 Columns:
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
```

### Grid 3 Columns:
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
```

### Grid 4/8 Split:
```html
<div class="grid grid-cols-1 md:grid-cols-12 gap-4">
  <div class="md:col-span-4">...</div>
  <div class="md:col-span-8">...</div>
</div>
```

### Spacing Between Items:
```html
<div class="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## ⚠️ IMPORTANT NOTES:

1. **Always add `w-full` to inputs**
   ```html
   class="w-full px-4 py-3..."
   ```

2. **Use text-base for normal font size**
   ```html
   class="...text-base..."
   ```

3. **Keep PrimeNG directives**
   ```html
   <input pInputText ... class="...">
   <textarea pInputTextarea ... class="...">
   ```

4. **Remove old class references**
   ```diff
   - [ngClass]="{'valid': ...}"
   + [ngClass]="{'valid': ...}"  // Keep this for error state
   ```

## 🔥 QUICK SEARCH & REPLACE:

Use VS Code Find & Replace (Regex):

1. Replace `col-md-4` with `md:col-span-4`
2. Replace `col-md-6` with `md:col-span-6`
3. Replace `col-md-8` with `md:col-span-8`
4. Replace `col-md-12` with `col-span-full`
5. Replace `d-flex` with `flex`
6. Replace `d-block` with `block`
7. Replace `font-weight-bold` with `font-semibold`
8. Replace `mb-2` with `mb-2` (same)
9. Replace `pb-3` with `pb-4`

## ✅ COMPLETED SECTIONS:

- ✅ Header/Title
- ✅ Section 1 (PHAN_1)
- ⏳ Section 2 (PHAN_2) - In progress
- ⏳ Section 3 (PHAN_3)
- ⏳ File Upload Section

## 🎯 TODO:

1. Apply pattern to remaining sections
2. Test all inputs are proper size
3. Test responsive design
4. Verify all PrimeNG components work
5. Remove any remaining inline styles

---

**Note:** Đã fix SCSS file, inputs sẽ có size đúng sau khi apply Tailwind classes!
