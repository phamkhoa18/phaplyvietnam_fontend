import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tokhaiyeucaulylichtuphap',
  templateUrl: './tokhaiyeucaulylichtuphap.component.html',
  styleUrls: ['./tokhaiyeucaulylichtuphap.component.scss']
})
export class TokhaiyeucaulylichtuphapComponent {

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
    this.titleService.setTitle('Tờ khai lý lịch tư pháp');
    this.getdatanation();
    this.getdatavn();

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.lylichtuphap = this.fb.group({
      address_thuong_tru : new FormControl(''),
      index_thuong_tru : new FormControl(''),
      thuong_tru: new FormControl(false),
      tam_tru: new FormControl(false),
      address_tam_tru : new FormControl(''),
      index_tam_tru : new FormControl(''),
      loai_giay_to : new FormControl('CMND / Identity card'),
      number_giay_to : new FormControl('' , Validators.required),
      ngay_cap_giay_to : new FormControl(''),
      noi_cap_giay_to : new FormControl(''),
      email : new FormControl(''),
      phone : new FormControl('', Validators.required),
      datacutru : new FormArray([]),
      to_khai : new FormControl('Cá nhân') ,
      doi_tuong : new FormControl('Công dân Việt Nam'),
      muc_dich_cap_phieu : new FormControl(''),
      so_luong_cap_them : new FormControl(''),
      thong_tin_an_tich : new FormControl(''),
      yeu_cau_cap_ly_lich : new FormControl('Số 1'),
      fullname : new FormControl('' , Validators.required ),
      fullname_new : new FormControl(''),
      nation : new FormControl('') ,
      national : new FormControl('') ,
      gender: new FormControl('Nam'),
      date : new FormControl('' , Validators.required),
      date_address : new FormControl(''),
      name_dad : new FormControl('' ),
      date_dad : new FormControl('' ),
      name_mother : new FormControl('' ),
      date_mother : new FormControl('' ),
      name_chong_vo : new FormControl('' ),
      date_chong_vo : new FormControl('' ),
      date_now : new FormControl(Date.now()) ,
      date_ngay_now : new FormControl(''),
      date_thang_now : new FormControl(''),
      date_nam_now : new FormControl(''),
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

  toDateFormat(value : String) {
      const valuenew = value.split('-');
      return `${valuenew[2]}/${valuenew[1]}/${valuenew[0]}`
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
      tu_ngay: [''],
      den_ngay: [''],
      noi_cu_tru: [''],
      nghe_nghiep:  [''],
      noi_lam:  ['']
    });
  }


 async submit() {
    if (this.lylichtuphap.valid) {
        const date = new Date(Date.now()) ;

        this.lylichtuphap.value.date_ngay_now = date.getDate() ;
        this.lylichtuphap.value.date_nam_now = date.getFullYear() ;
        this.lylichtuphap.value.date_thang_now = date.getMonth() + 1 ;


        const validDates = [
          'date',
          'ngay_cap_giay_to',
          'date_dad',
          'date_mother',
          'date_chong_vo'
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
        data.append('title' , 'ĐĂNG KÝ LÝ LỊCH TƯ PHÁP') ;
        data.append('content' , JSON.stringify(arraycontent));
        data.append('posision' , "ly_lich_tu_phap_cap");
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
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.lylichtuphap.markAllAsTouched();
    }
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
