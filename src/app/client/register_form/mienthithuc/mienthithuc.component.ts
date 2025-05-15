import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-mienthithuc',
  templateUrl: './mienthithuc.component.html',
  styleUrls: ['./mienthithuc.component.scss']
})
export class MienthithucComponent {

  hochieu!: FormGroup;
  checkdongy : Boolean = false  ;

  listcheckbox_MTT : any = [
      {id : 1 , title : 'Giấy tờ chứng nhận có quốc tịch Việt Nam / Documents certifying Vietnamese citizenship'},
      {id : 2 , title : ' Bản sao hoặc bản trích lục Quyết định cho trở lại quốc tịch Việt Nam / A copy or excerpt of the Decision for Recovery of Vietnamese citizenship'},
      {id : 3 , title : 'Bản sao hoặc bản trích lục Quyết định cho thôi quốc tịch Việt Nam / A copy or excerpt of the Decision for Renunciation of Vietnamese citizenship'},
      {id : 4 , title : " Giấy xác nhận mất quốc tịch Việt Nam / Certificate of loss of Vietnamese citizenship"},
      {id : 5 , title : " Hộ chiếu Việt Nam (còn hoặc đã hết giá trị) / A Vietnamese passport (valid or invalid)"},
      {id : 6 , title : " Giấy chứng minh nhân dân (còn hoặc đã hết giá trị) / An Identity Card (valid or invalid)"},
      {id : 7 , title : "Giấy khai sinh / A Birth Certificate"},
      {id : 8 , title : " Thẻ cử tri mới nhất / The latest voter’s card"},
      {id : 9 , title : "Sổ hộ khẩu / A Family Register Book"},
      {id : 10 , title : " Sổ thông hành cấp trước 1975 / A travel document issued before 1975"},
      {id : 11 , title : " Thẻ căn cước cấp trước 1975 / An Identity Card issued before 1975"},
      {id : 12 , title : "Trích lục Bộ giấy khai sinh cấp trước 1975 / An Excerpt from Birth Register issued before 1975"},
      {id : 13 , title : " Giấy tờ do cơ quan có thẩm quyền của nước ngoài cấp nếu trong đó có ghi người được cấp giấy tờ đó có quốc tịch gốc hoặc gốc Việt Nam / Documents issued by competent foreign authorities if they can prove that the person in question has original Vietnamese citizenship or of Vietnamese origin."},
      {id : 14 , title : "Giấy tờ khác / Other"}
  ];

  listcheckbox_nc_ngoai : any = [
    {id : 1 , title : 'Giấy đăng ký kết hôn / Certificate of Marriage'},
    {id : 2 , title : "Giấy khai sinh / Certificate of Birth"},
    {id : 3 , title : " Giấy xác nhận quan hệ cha, mẹ, con / A Certificate of relationship with farther, mother, children"},
    {id : 4 , title : "Các giấy tờ khác có giá trị theo quy định của pháp luật Việt Nam / Other valid documents as regulated by the Vietnamese Law"},
    {id  :5 , title : " Quyết định nuôi con nuôi / Decision of Adoption"},
    {id : 6 , title : " Giấy tờ khác / Other"}
  ];

  listlydo : any = [
      {id : 1 , title : ' Bị mất / Lost'},
      {id : 2 , title : "Bị hỏng / Damaged"},
      {id : 3 , title : "Hết hạn / Expired"},
      {id : 4 , title : " Có nhu cầu điều chỉnh nội dung (ghi rõ nội dung cần điều chỉnh kèm khung miêu tả) / Admend content(s) in the visa exemption certificate (specify admendment details)"}
  ];

  listnation : any = [];


  constructor(private data : DataService , public api : ApiService , private fb : FormBuilder , private titleService : Title) {

    this.titleService.setTitle(' Thông tin tờ khai đăng kí miễn thị thực');

  this.hochieu = fb.group({
    firstname_foreign : new FormControl('' , Validators.required ) ,
    lastname_foreign : new FormControl('' ) ,
    firstname_vn : new FormControl(''  ) ,
    lastname_vn : new FormControl(''  ) ,
    gender : new FormControl('Nam') ,
    date : new FormControl('' , Validators.required) ,
    date_address : new FormControl('' , Validators.required),
    national_original  : new FormControl('' , Validators.required) ,
    national_now  : new FormControl('' , Validators.required) ,
    passport : new FormControl('' , Validators.required),
    day_passport : new FormControl(''),
    address_passport : new FormControl(''),
    job : new FormControl('', Validators.required),
    address_foreign : new FormControl('',Validators.required),
    phone : new FormControl(''  , [Validators.required]) ,
    address_vn : new FormControl('',Validators.required),
    address_before_foreign : new FormControl('') ,
    name_children_go_small_14 : new FormControl(''),
    gender_children_go_small_14 : new FormControl('') ,
    date_children_go_small_14 : new FormControl(null) ,
    checkmtt : new FormArray([]),
    check_people_foreign : new FormArray([]),
    Gmtt : new FormControl('') ,
    day_gmtt : new FormControl(null),
    ly_do : new FormArray([]) ,
    de_nghi : new FormControl(''),
    address_single : new FormControl('' ),
    check : new FormControl(false)
  });
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getdatanation();

  }

  onCheckboxChange(event: any , namecontrol : any ) {
    const selectedCountries = (this.hochieu.controls[namecontrol] as FormArray);
    if (event.target.checked) {
      selectedCountries.push(new FormControl(event.target.value));
    } else {
      const index = selectedCountries.controls
      .findIndex(x => x.value === event.target.value);
      selectedCountries.removeAt(index);
    }
  }


 async getdatanation() {
    (await this.api.get('/api_nation')).subscribe((v) => {
        this.listnation = v ;
    })
  }


async  submit() {
    if (this.hochieu.valid) {
      if(this.hochieu.value.check) {

        var arraycontent = [] ;
        var fullname : any ;

        if (this.hochieu.value.firstname_foreign && this.hochieu.value.lastname_foreign) {
          fullname = this.hochieu.value.firstname_foreign.concat(this.hochieu.value.lastname_foreign);
          // Use the fullname variable as needed
        } else {
          fullname = this.hochieu.value.firstname_foreign ;
        }

        const date = new Date(Date.now()) ;

        this.hochieu.value.date_nam_now = date.getDate().toString() ;
        this.hochieu.value.date_nam_now = date.getFullYear().toString()  ;
        this.hochieu.value.date_thang_now = (date.getMonth() + 1).toString()  ;

        arraycontent.push(this.hochieu.value);

        const data = new FormData() ;
        data.append('name' , fullname) ;
        data.append('title' , 'Đăng ký miễn thị thực') ;
        data.append('content' , JSON.stringify(arraycontent));
        data.append('posision' , "mien_thi_thuc");


      (await this.api.post('/addform' , data)).subscribe((v : any ) => {
        if(v.status == 200) {
          this.data.notification('Thông tin gửi lên đã thành công' , 'Cảm ơn bạn , chúng tôi sẽ hỗ trợ bạn nhanh nhất !' , 'success' , v.filename , 'output_docx');
          console.log(v.filename);
          this.resetForm();
        } else {
            this.data.notification('Thông tin gửi lên đã thất bại' , 'Bạn hãy kiểm tra lại xem mạng có ổn định chưa !' , 'error' , '' , '');
        }
      })


      } else {
            this.data.notification('Thông tin gửi lên đã thất bại' , 'Bạn hãy kiểm tra lại xem mạng có ổn định chưa !' , 'error' , '' , '');
      }
    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.hochieu.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.hochieu.reset();
  }
}
