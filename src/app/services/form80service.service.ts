import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
@Injectable({
  providedIn: 'root',
})
export class Form80serviceService {

  constructor(private fb: FormBuilder) {

  }



  thongtinarray_c : any = [] ;

  giaytos = [
    {name: 'Căn cước công dân / Id' , value : 'Căn cước công dân'},
    {name: 'Giấy khai sinh / Birth certificate' , value : 'Giấy khai sinh'},
  ]

  countries = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Andorra', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Brunei Darussalam', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cabo Verde', code: 'CV' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo', code: 'CG' },
    { name: 'Congo (Democratic Republic of the)', code: 'CD' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Côte d\'Ivoire', code: 'CI' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Eswatini', code: 'SZ' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Greece', code: 'GR' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: 'Laos', code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia (Federated States of)', code: 'FM' },
    { name: 'Moldova', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montenegro', code: 'ME' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'North Korea', code: 'KP' },
    { name: 'North Macedonia', code: 'MK' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestine', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russia', code: 'RU' },
    { name: 'Rwanda', code: 'RW' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Samoa', code: 'WS' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia', code: 'RS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Korea', code: 'KR' },
    { name: 'South Sudan', code: 'SS' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syria', code: 'SY' },
    { name: 'Taiwan', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Timor-Leste', code: 'TL' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Tuvalu', code: 'TV' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Vatican City', code: 'VA' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Vietnam', code: 'VN' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' }
  ];

  form80 = new FormGroup({
    sectionA: this.fb.group({
      'ap.name fam': ['', Validators.required],
      'ap.name giv': ['', Validators.required],
      'ap.sex': ['', Validators.required],
      'ap.dob': ['', Validators.required],
      'ap.birth state' : ['' , Validators.required],
      'ap.birth cntry' : ['' , Validators.required],
      // group check and value
      'ap.known other name' : ['' , Validators.required],
      'ap.name fam other' : [''],
      'ap.name giv other' : [''],
      // group check and value
      'ap.altbirth' : ['' , Validators.required],
      'ap.alt dob' : [''],
      // group check and value 6
      'ap.citizen country' : ['' , Validators.required],
      'ap.gain citizenship' : [''],
      'ap.citgain date' : [''],
      // group check and value 8
      'ap.perm res rights' : ['' , Validators.required],
      'ap.perm res rights cntry' : [''],
    }),

    sectionB: this.fb.group({
      // group check and value 9
      'ap.curr passport': ['', Validators.required],
      'ap.pass no': [''],
      'ap.pass cntry': [''],
      'ap.pass doi': [''],
      'ap.pass doe': [''],
      'ap.pass nationality': [''],
      'ap.pass place 1': [''],
      'ap.pass show' : ['1'] ,
      'ap.pass name fam': [''],
      'ap.pass name giv': [''],
      // group check and value 10
      'ap.oth passport' : ['' , Validators.required],
      'ap.other pass no': [''],
      'ap.other pass cntry': [''],
      'ap.other pass doi': [''],
      'ap.other pass doe': [''],
      'ap.other national': [''],
      'ap.other pass place': [''],
      'ap.other show' : ['1'] ,
      'ap.othe pass name fam': [''],
      'ap.othe pass name giv': [''],
    }),

    sectionC : this.fb.group({
      'ap.nat id num': ['', Validators.required] ,
      'ap.nat array' : this.fb.array([]) ,
    }),

    sectionD : this.fb.group({
      'ap.email': ['2'] ,
      'ap.email primary' : [''] ,
      'ap.contact no' : ['2'] ,
      'ap.mobile num' : ['' , Validators.required] ,
      'ap.address array' : this.fb.array([])  ,
    }),

    sectionE : this.fb.group({
      'ap.visit oth country' : ['' , Validators.required],
      'ap.visit array' : this.fb.array([])
    }),

    sectionF : this.fb.group({
      'ap.emp array' : this.fb.array([])
    }),

    sectionG : this.fb.group({
      'ap.qual array' : this.fb.array([])
    }),

    sectionH : this.fb.group({
      'ap.in aus' : ['' , Validators.required],
      'ap.reason for visit': [''] ,
      // 23
      'ap.travel dte' : [''] ,
      'ap.prop doa' : [''] ,
      'ap.prop flight num' : [''] ,
      'ap.prop town' : [''],
      //25
      'ap.reason for fs' : [''] ,
      'ap.fs cities' : ['']
    }) ,

    sectionI : this.fb.group({
      'ap.inau' : ['' , Validators.required],
      'ap.in aus add' : [''],
      'ap.in aus add line 1' : [''],
      'ap.in aus mob 1' : [''],
      'ap.cur in aus add' : [''],
      'ap.cur in aus add line 1' : [''],
      'ap.in aus mob 2' : [''],
    }) ,

    sectionJ : this.fb.group({
      'ap.inaus' : ['' , Validators.required] ,
      'ap.in aus visa type 1' : [''] ,
      'ap.in aus reason 1' : [''] ,
      'ap.in aus noe 1' : [''] ,
      'ap.in aus poe 1' : [''] ,
      'ap.in aus visa doa 1' : [''] ,
      'ap.prev in aus' : ['' , Validators.required],
      'ap.prev array' : this.fb.array([])
    }),

    sectionK : this.fb.group({
      'ap.ch offence' : ['1'] ,
      'ap.ch crime' : ['1'] ,
      'ap.ch charged dv' : ['1'] ,
      'ap.ch subject dv' : ['1'] ,
      'ap.ch interpol' : ['1'] ,
      'ap.ch sex offence' : ['1'] ,
      'ap.ch sex reg' : ['1'] ,
      'ap.ch acq' : ['1'] ,
      'ap.ch left' : ['1'] ,
      'ap.ch sec' : ['1'] ,
      'ap.ch war' : ['1'] ,
      'ap.ch crim org' : ['1'] ,
      'ap.ch violent org' : ['1'] ,
      'ap.ch mil' : ['1'] ,
      'ap.ch train' : ['1'] ,
      'ap.ch smug' : ['1'] ,
      'ap.ch dep' : ['1'] ,
      'ap.ch overstay' : ['1'] ,
      'ap.ch debt' : ['1'] ,
      'ap.ch dtl' : [''] ,
    }),

    sectionL : this.fb.group({
      'ap.ms' : ['' , Validators.required] ,
      'ap.ms array' : this.fb.array([]) ,
      'ap.intel agent': ['' , Validators.required],
      'ap.intel agent dtl': [''],
      'ap.ref visa': ['', Validators.required],
      'ap.ref visa dtl': [''],
      'ap.deport': ['', Validators.required],
      'ap.deport dtl': [''],
      'ap.ref citizen': ['', Validators.required],
      'ap.ref citizen dtl': [''],
    }),

    sectionQ : this.fb.group({
      'ap.partner' : ['' , Validators.required] ,
      'as.rel to you' : [''] ,
      'as.name fam' : [''] ,
      'as.name giv' : [''] ,
      'as.name oth' : [''] ,
      'as.sex' : [''] ,
      'as.dob' : [''] ,
      'as.chinese code' : [''] ,
      'as.birth town' : [''] ,
      'as.birth state' : [''] ,
      'as.birth cntry' : [''] ,
      'as.cit ctry yr grant' : [''] ,
      'as.cor' : [''] ,
      'as.migrating' : [''] ,
      'ap.children' : ['' , Validators.required] ,
      'ap.children array' : this.fb.array([])  ,
      'ap.parents' : ['' , Validators.required] ,
      'ap.parents array' : this.fb.array([])  ,
      'ap.siblings' : ['' , Validators.required] ,
      'ap.siblings array' : this.fb.array([])  ,
      'ap.familly member' : ['' , Validators.required] ,
      'ap.familly member array' : this.fb.array([]) ,
      'ap.contact aus' : ['' , Validators.required] ,
      'ap.contact aus name fam 1' : [''] ,
      'ap.contact aus name giv 1' : [''] ,
      'ap.contact aus sex' : [''] ,
      'ap.contact relation 1' : [''] ,
      'ap.contact aus dob 1' : [''] ,
      'ap.contact birth town 1' : [''] ,
      'ap.contact birth cntry 1' : [''] ,
      'ap.contact nationality 1' : [''] ,
      'ap.contact add line 1' : [''] ,
      'ap.contact mob 1' : [''] ,
      'ap.contact email 1' : [''] ,
      'ap.oth contact aus' : ['' , Validators.required] ,
      'ap.contact aus name fam 2' : [''] ,
      'ap.contact aus name giv 2' : [''] ,
      'ap.contact aussex' : [''] ,
      'ap.contact relation 2' : [''] ,
      'ap.contact aus dob 2' : [''] ,
      'ap.contact birth town 2' : [''] ,
      'ap.contact birth cntry 2' : [''] ,
      'ap.contact nationality 2' : [''] ,
      'ap.oth contact add line 1' : [''] ,
      'ap.contact mob 2' : [''] ,
      'ap.contact email 2' : [''] ,
      'ap.sponsor' : ['' , Validators.required] ,
      'sp.bus name' : [''] ,
      'ap.bus dtl' : [''] ,
      'sp.add line 1' : [''] ,
      'sp.contact bus name' : [''] ,
      // check
      'sp.oth add' : [''] ,
      'sp.oth add type' : [''] ,
      'sp.oth add line 1' : [''] ,
      // check
      'sp.email' : [''] ,
      'sp.email dtl' : [''] ,
      // check
      'sp.ph no' : [''] ,
      'sp.ph no dtl' : [''] ,
    })
  })

  valuelang: string = 'vi' ;
  private languageSubject = new BehaviorSubject<string>('vi'); // Mặc định là tiếng Việt
  currentLanguage = this.languageSubject.asObservable();

  changeLanguage(language: string) {
    this.languageSubject.next(language);
    this.valuelang = language ;
  }

  private currentStep = new BehaviorSubject<number>(1); // Bước bắt đầu là 1
  isLoading = new BehaviorSubject<boolean>(false) ;

  setisLoading(loading: boolean):void {
    this.isLoading.next(loading) ;
  }

  getisLoading() {
    return this.isLoading.asObservable() ;
  }

  getCurrentStep(): number {
    return this.currentStep.value;
  }

  setCurrentStep(step: number): void {
    this.currentStep.next(step);
  }

  // Kiểm tra nếu bước đã hoàn tất
  isStepCompleted(step: number): boolean {
    return step <= this.currentStep.value;
  }

  addtr() {
    (this.form80.get(['ap.nat array']) as FormArray).push(this.createItemFormGroup());
  }

  get addDynamicRow() {
    return this.form80.get(['ap.nat array']) as FormArray;
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      tu_ngay: [''],
      den_ngay: [''],
      noi_cu_tru: [''],
      nghe_nghiep:  [''],
      noi_lam:  ['']
    });
  }

  private form80FormService = new Subject<any>();
  private LoadingService = new BehaviorSubject<boolean>(false) ;
  form80FormService$ = this.form80FormService.asObservable();
  getForm80() {
      return this.form80;
  }

  setForm80(valueform: any) {
    this.form80 = valueform;  // Cập nhật giá trị form sau 3 giây
  }



  getLoading() {
    return this.LoadingService.asObservable() ;
  }

  // BehaviorSubject lưu trạng thái các bước đã hoàn thành
  private completedStepsSubject = new BehaviorSubject<string[]>(['a']);  // Mặc định bắt đầu từ bước 'a'
  completedSteps$ = this.completedStepsSubject.asObservable();

  // Cập nhật bước mới đã hoàn thành
  completeStep(step: string) {
    const completedSteps = this.completedStepsSubject.getValue();
    if (!completedSteps.includes(step)) {
      this.completedStepsSubject.next([...completedSteps, step]);
    }
  }

  // Lấy danh sách các bước đã hoàn thành
  getCompletedSteps() {
    return this.completedStepsSubject.getValue();
  }

  // Hàm để làm phẳng dữ liệu, xử lý mảng, và xử lý giá trị "1", "2"
  async mergeObjects(obj: any, res: any[] = []): Promise<any[]> {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (Array.isArray(value)) {
          // Nếu là mảng, lặp qua các phần tử và xử lý nếu là object
          value.forEach(item => {
            if (typeof item === 'object' && !Array.isArray(item)) {
              this.mergeObjects(item, res); // Đệ quy xử lý object trong mảng
            }
          });
        } else if (typeof value === 'object' && value !== null) {
          // Nếu là object nhưng không phải mảng, đệ quy tiếp tục để lấy key-value
          this.mergeObjects(value, res);
        } else {
          // Nếu là giá trị cơ bản, kiểm tra giá trị "1" hoặc "2"
          if (value === '1' || value === '2') {
            // Thay đổi key và value dựa trên giá trị
            const newKey = key + value; // Thêm số "1" hoặc "2" vào key
            const newValue = value === '1' ? 'on' : 'on'; // Thay đổi giá trị
            res.push({ nameField: newKey, valueField: this.xoaDauChuVaChuyenHoa(newValue) });
          } else {
            // Nếu không phải "1" hoặc "2", giữ nguyên key-value
            res.push({ nameField: key, valueField: this.xoaDauChuVaChuyenHoa(value) });
          }
        }
      }
    }
    return res;
  }

  xoaDauChuVaChuyenHoa(s: string): string {
    // Xóa dấu
    let chuoiKhongDau = s .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
    // Chuyển tất cả chữ cái thành chữ in hoa
    return chuoiKhongDau;
  }


  getErrorMessage(sectionName: any = null, controlName: string, formControlGroupUpdate: any = null): string {
    var control ;
    if(formControlGroupUpdate == null) {
      control = this.form80.get([sectionName, controlName]);
    } else {
      control = formControlGroupUpdate.get([controlName]) ;
    }

    if(this.valuelang == 'vi') {
      if (control && control.touched) {
        if (control.hasError('required')) {
          return 'Vui lòng không để trống';
        }
        if (control.hasError('pattern')) {
          return 'Invalid format.';
        }
        // Add other error checks as needed
      }
    } else {
      if (control && control.touched) {
        if (control.hasError('required')) {
          return 'This field cannot be empty';
        }
        if (control.hasError('pattern')) {
          return 'Invalid format.';
        }
        // Add other error checks as needed
      }
    }
    return '';
  }

  markSectionAsTouched(sectionGroup: FormGroup) {
    Object.keys(sectionGroup.controls).forEach(controlName => {
      const control = sectionGroup.get( [controlName] );
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markSectionAsTouched(control);
      }
    });
  }

/**
 * Xử lý sự kiện khi có thay đổi trong đầu vào của trường form.
 * Kiểm tra định dạng của ngày hoặc tháng/năm, sau đó định dạng lại giá trị và gán vào form.
 *
 * @param {any} event - Sự kiện thay đổi đầu vào (event).
 * @param {string} namefield - Tên của trường đang được thay đổi.
 * @param {any} [form80=null] - Đối tượng form80 (nếu có).
 * @param {string} [sectionGroupContainer=null] - Nhóm section chứa trường đang thay đổi.
 * @param {any} [formNews=null] - Đối tượng formNews (nếu không dùng form80).
 * @param {string} dateformat - Định dạng của đầu vào ('date' hoặc 'monthyear').
 */

onInputChange(
  event: any, namefield: string,
  form80:any = null,
  sectionGroupContainer: string = null,
  formNews: any = null ,
  dateformat: string
) {
  const inputValue = event.target.value;
  if(dateformat == 'date') {
    // Kiểm tra xem giá trị nhập có đúng định dạng không
    if (this.isValidDate(inputValue)) {
      const parsedDate = this.parseDate(inputValue); // Chuyển chuỗi thành đối tượng Date
      const formattedDate = formatDate(parsedDate, 'dd/MM/yyyy', 'en-US');
      if(formNews == null) {
        form80.get([sectionGroupContainer,namefield])?.setValue(formattedDate);
      } else {
        formNews.get([namefield])?.setValue(formattedDate);
      }
    } else {
      console.log('Ngày không hợp lệ');
    }
  }
  if(dateformat == 'monthyear') {
    // Kiểm tra xem giá trị nhập có đúng định dạng tháng/năm hay không
      if (this.isValidMonthYear(inputValue)) {
        const parsedDate = this.parseMonthYear(inputValue); // Chuyển chuỗi thành đối tượng Date
        const formattedDate = formatDate(parsedDate, 'MM/yyyy', 'en-US');
        if(formNews == null) {
          form80.get([sectionGroupContainer,namefield])?.setValue(formattedDate);
        } else {
          formNews.get([namefield])?.setValue(formattedDate);
        }
      } else {
        console.log('Tháng/Năm không hợp lệ');
      }
  }
}

/**
 * Xử lý sự kiện khi có thay đổi về ngày. Định dạng lại ngày hoặc tháng/năm
 * trước khi gán giá trị vào form control tương ứng.
 *
 * @param {any} event - Sự kiện ngày thay đổi.
 * @param {any} [form80=null] - Đối tượng form80 (nếu có).
 * @param {string} namefield - Tên của trường đang được thay đổi.
 * @param {string} [sectionGroupContainer=null] - Nhóm section chứa trường đang thay đổi.
 * @param {any} [formNews=null] - Đối tượng formNews (nếu không dùng form80).
 * @param {string} dateformat - Định dạng của đầu vào ('date' hoặc 'monthyear').
 * @returns {void}
 */

  onDateChange(
    event: any ,
    form80:any = null,
    namefield: string ,
    sectionGroupContainer: string = null,
    formNews: any = null ,
    dateformat: string
  ): void {
    if (event) {
      var formattedDate ;
      if(dateformat == 'date') {
        // Định dạng ngày thành MM/yyyy
        formattedDate = formatDate(event, 'dd/MM/yyyy', 'en-US');
      }
      if(dateformat == 'monthyear') {
        // Định dạng ngày thành MM/yyyy
        formattedDate = formatDate(event, 'MM/yyyy', 'en-US');
      }
      // Set giá trị vào FormControl 'ap.addr to'
      if(formNews == null) {
        form80.get([sectionGroupContainer,namefield])?.setValue(formattedDate);
      } else {
        formNews.get([namefield])?.setValue(formattedDate);
      }
    }
  }


  // Kiểm tra xem chuỗi có phải là tháng/năm hợp lệ hay không
  isValidMonthYear(dateString: string): boolean {
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/; // MM/yyyy
    return regex.test(dateString);
  }

  // Kiểm tra xem chuỗi có phải là ngày hợp lệ hay không
  isValidDate(dateString: string): boolean {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; // dd/MM/yyyy
    return regex.test(dateString);
  }

  // Chuyển chuỗi tháng/năm thành đối tượng Date
  parseMonthYear(dateString: string): Date {
    const [month, year] = dateString.split('/');
    return new Date(+year, +month - 1); // Đặt ngày là 1 và tháng bắt đầu từ 0
  }

  // Chuyển chuỗi ngày thành đối tượng Date
  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(+year, +month - 1, +day);
  }
}
