import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thuongtru-tamtru',
  templateUrl: './thuongtru-tamtru.component.html',
  styleUrls: ['./thuongtru-tamtru.component.scss']
})
export class ThuongtruTamtruComponent {
  listnation : any ;
  listtp : any ;
  listgiayto : any = [
    {name : 'CMND / Identity card'},
    {name : 'Hộ chiếu / Passport'},
    {name : 'Thẻ thường trú / Residence card'},
    {name : 'Thẻ Căn cước công dân'}
  ] ;

  listtokhai : any = [
    {name : 'Cá nhân'},
    {name : 'Cơ quan tiến hành tố tụng'},
    {name : 'Cơ quan tổ chức'},
    {name : "Uỷ quyền"}
  ];

  listdoituong : any = [
    {name : 'Không có thông tin'},
    {name : "Công dân Việt Nam"},
    {name : "Cơ quan tiến hành tố tụng"},
    {name : "Cơ quan tổ chức"},
    {name : "Nước ngoài"}
  ]

  public lylichtuphap: any ;

  constructor(private data : DataService , public api : ApiService, private titleService : Title , private fb: FormBuilder, private http: HttpClient) {
    this.titleService.setTitle('Giấy khai sinh cho trẻ em Việt Nam sinh ra tại nước ngoài');
    this.getdatanation();
    this.getdatavn();

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.lylichtuphap = this.fb.group({
      address_thuong_tru : new FormControl(''),
      address_tam_tru : new FormControl(''),
      address_hien_tai : new FormControl(''),
      number_giay_to : new FormControl('' , Validators.required),
      datacutru : new FormArray([]),
      fullname : new FormControl('' , Validators.required ),
      noi_dung : new FormControl('') ,
      fullname_chu_ho : new FormControl(''),
      quan_he_chu_ho : new FormControl(''),
      number_dinh_danh : new FormControl('') ,
      fullname_new : new FormControl(''),
      nation : new FormControl('') ,
      tongiao : new FormControl(''),
      que_quan : new FormControl(''),
      national : new FormControl('' , Validators.required) ,
      gender: new FormControl('Nam'),
      date : new FormControl('' , Validators.required),
      date_ngay_now : new FormControl(''),
      date_thang_now : new FormControl(''),
      date_nam_now : new FormControl(''),
      xac_nhan : new FormControl(false)
    });


  }

  selectedFiles: File[] = [];
  fileError: string | undefined;

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    // Reset the file error message
  this.fileError = undefined;

  if (this.selectedFiles) {
    let totalSize = 0;
    const allowedFormats = ['image/jpeg', 'application/pdf'];

    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];

      if (!allowedFormats.includes(file.type)) {
        alert( `Định dạng tệp ${file.name} không hợp lệ. Chỉ hỗ trợ JPG và PDF.`);
        return;
      }

      totalSize += file.size;
    }

    if (totalSize > 3 * 1024 * 1024) {
      this.fileError = "Tổng kích thước tệp vượt quá 3MB.";
      alert(this.fileError);
      return;
    }
  }
}




  async getdatanation() {
    (await this.api.get('/api_nation')).subscribe((v) => {
        this.listnation = v ;
    })
  }

  toDateFormat(value: any): string {
      if (!value) return '';
      if (value instanceof Date) {
        const d = String(value.getDate()).padStart(2, '0');
        const m = String(value.getMonth() + 1).padStart(2, '0');
        const y = value.getFullYear();
        return `${d}/${m}/${y}`;
      }
      const valuenew = value.toString().split('-');
      return valuenew.length === 3 ? `${valuenew[2]}/${valuenew[1]}/${valuenew[0]}` : '';
  }

  async getdatavn() {
    (await this.api.get('/api_tp_vn')).subscribe((v) => {
      this.listtp = Object.values(v) ;
  })
  }

  addtr() {
    (this.lylichtuphap.get('datacutru') as FormArray).push(this.createItemFormGroup());
  }

  get addDynamicRow() {
    return this.lylichtuphap.get('datacutru') as FormArray;
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      ho_ten: [''],
      ngay: [''],
      gioi_tinh: [''],
      cmnd:  [''],
      quan_he:  ['']
    });
  }


 async submit() {
    if (this.lylichtuphap.valid) {

      if(this.lylichtuphap.value.xac_nhan) {

        const date = new Date(Date.now()) ;

        this.lylichtuphap.value.date_ngay_now = date.getDate() ;
        this.lylichtuphap.value.date_nam_now = date.getFullYear() ;
        this.lylichtuphap.value.date_thang_now = date.getMonth() + 1 ;


        const validDates = [
          'date'
      ];

      const formattedValues = { ...this.lylichtuphap.value };

      for (const field of validDates) {
        if (formattedValues[field]) {
            formattedValues[field] = this.toDateFormat(formattedValues[field]);
        }
      }

        const arraycontent = [];
        arraycontent.push(formattedValues);


        const data = new FormData() ;
        data.append('name' , this.lylichtuphap.value.fullname) ;
        data.append('title' , 'XÁC NHẬN THÔNG TIN VỀ CƯ TRÚ') ;
        data.append('content' , JSON.stringify(arraycontent));
        data.append('posision' , "xac_nhan_thong_tin_cu_tru");
        for (const image of this.selectedFiles) {
          data.append('images', image);
        };

      (await this.api.post('/addform' , data)).subscribe((v : any ) => {
        if(v.status == 200) {
          this.data.notification('Thông tin gửi lên đã thành công' , 'Cảm ơn bạn , chúng tôi sẽ hỗ trợ bạn nhanh nhất !' , 'success' , v.filename , 'output_docx');
          console.log(v.filename);
          this.resetForm();
        } else {
            this.data.notification('Thông tin gửi lên đã thất bại' , 'Bạn hãy kiểm tra lại xem mạng có ổn định chưa !' , 'error' , '' , '');
        }
      })
    }

      else {
            this.data.notification('Thông tin gửi lên đã thất bại' , 'Bạn hãy kiểm tra lại xem mạng có ổn định chưa !' , 'error' , '' , '');
      }

    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.lylichtuphap.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.lylichtuphap.get(controlName);
    if (control && control.touched) {
      if (control.hasError('required')) {
        return 'Vui lòng không để trống';
      }
      if (control.hasError('email')) {
        return 'Vui lòng nhập đúng định dạng email.';
      }
      if (control.hasError('minlength')) {
        const minLength = control.errors?.['minlength'].requiredLength;
        return `Tối thiểu ${minLength} ký tự.`;
      }
      if (control.hasError('maxlength')) {
        const maxLength = control.errors?.['maxlength'].requiredLength;
        return `Tối đa ${maxLength} ký tự.`;
      }
      if (control.hasError('pattern')) {
        return 'Định dạng không hợp lệ.';
      }
    }
    return '';
  }

  resetForm(): void {
    this.lylichtuphap.reset();
  }

  async download() {
    (await this.api.getdown("/download/ly-lich-tu-phap")).subscribe((blob: Blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'ly_lich_tu_phap_file.docx';
      a.click();
      URL.revokeObjectURL(blobUrl);
    });
  }
}
