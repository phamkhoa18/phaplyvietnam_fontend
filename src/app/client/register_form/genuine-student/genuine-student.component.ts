import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-genuine-student',
  templateUrl: './genuine-student.component.html',
  styleUrls: ['./genuine-student.component.scss']
})
export class GenuineStudentComponent {
  @Input() name: string | undefined;
  @ViewChild('sigPad', { static: true }) sigPad!: ElementRef<HTMLCanvasElement>; // Sử dụng khai báo "!" để cho TypeScript biết sigPad đã được khởi tạo
  sigPadElement!: HTMLCanvasElement; // Sử dụng khai báo "!" để cho TypeScript biết sigPadElement đã được khởi tạo
  context!: CanvasRenderingContext2D; // Sử dụng khai báo "!" để cho TypeScript biết context đã được khởi tạo
  isDrawing = false;
  img: any;
  checkdongy: Boolean = false;
  public detrong : String = 'Không được để trống'
  public thongtinplace : any = 'Nhập thông tin'
  public hochieu : any ;


  constructor(private data : DataService , public api : ApiService , private titleService : Title , private fb : FormBuilder) {
    this.titleService.setTitle('Thông tin tờ khai đăng kí làm hộ chiếu');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.hochieu = this.fb.group({
      ten : new FormControl('' , Validators.required ) ,
      ngay : new FormControl('' , Validators.required ) ,
      bomenghe : new FormControl('') ,
      taisanbome : new FormControl('') ,
      vochong : new FormControl('') ,
      hoctruong : new FormControl('') ,
      array : new FormControl('') ,
      lop : new FormControl('') ,
      nganh : new FormControl('') ,
      motanganh : new FormControl('') ,
      lamnghegi : new FormControl('') ,
      lamcvbaolau : new FormControl('') ,
      cvyeuthich : new FormControl('') ,
      luong : new FormControl('') ,
      thunhapkhac : new FormControl('') ,
      truonguc : new FormControl('') ,
      lydohoc : new FormControl('') ,
      nganhmuontheo : new FormControl('') ,
      lydohocuc : new FormControl('') ,
      tungduhocuc : new FormControl('') ,
      tieubang : new FormControl('' , Validators.required),
      date : new FormControl('')
    });

  }


  hientai : any = [
    {title : 'Sinh viên học sinh hoặc đã tốt nghiệp' , value : false},
    {title : 'Đi làm' , value : false},
    {title : 'Đang đi học và đi làm' , value : false},
  ]


  tieubang : any = [
    {title : "New South Wales" , value : "New South Wales"},
    {title : "Victoria" , value : "Victoria"},
    {title : "Queensland" , value : "Queensland"},
    {title : "Western Australia" , value : "Western Australia"},
    {title : "South Australia" , value : "South Australia"},
    {title : "Tasmania" , value : "Tasmania"},
    {title : "Australian Capital Territory" , value : "Australian Capital Territory"},
    {title : "Northern Territory" , value : "Northern Territory"},
  ]


  onChange(event: any, item: any) {
    item.value = event.target.checked;
    // You can add any additional logic here based on the checkbox state
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

    if (totalSize > 6 * 1024 * 1024) {
      this.fileError = "Tổng kích thước tệp vượt quá 6MB.";
      alert(this.fileError);
      return;
    }
  }
}

toDateFormat(value : String) {
  const valuenew = value.split('-');
  return `${valuenew[2]}/${valuenew[1]}/${valuenew[0]}`
}





  async submit() {
    if (this.hochieu.valid) {
            var fullname : any ;
            var array : any = [] ;
            fullname = this.hochieu.value.ten

            const date = new Date(Date.now()) ;
            this.hochieu.value.date = date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString()  ;

            this.hientai.forEach((e : any) => {
                if(e.value == true) {
                    array.push(e.title) ;
                }
            });


            this.hochieu.value.array = JSON.stringify(array);

            const validDates = [
              'ngay'
          ];

          const formattedValues = { ...this.hochieu.value };

          for (const field of validDates) {
            if (formattedValues[field]) {
                formattedValues[field] = this.toDateFormat(formattedValues[field]);
            }
          }

          const arraycontent = [];


          arraycontent.push(formattedValues);

            const data = new FormData() ;
            data.append('name' , fullname) ;
            data.append('title' , 'GENUINE STUDENT') ;
            data.append('content' , JSON.stringify(arraycontent));
            data.append('posision' , "genuinestudent");
            for (const image of this.selectedFiles) {
              data.append('images', image);
            };

            // Chuyển dữ liệu từ canvas thành định dạng hình ảnh

          (await this.api.post('/addform' , data)).subscribe((v : any ) => {
            if(v.status == 200) {
              console.log(v);
              this.data.notification('Thông tin gửi lên đã thành công' , 'Cảm ơn bạn , chúng tôi sẽ hỗ trợ bạn nhanh nhất !' , 'success' , v.filename , 'output_docx');
              console.log(v);
              this.resetForm();
            } else {
                this.data.notification('Thông tin gửi lên đã thất bại' , 'Bạn hãy kiểm tra lại xem mạng có ổn định chưa !' , 'error' , '' , '');
            }
          })
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
