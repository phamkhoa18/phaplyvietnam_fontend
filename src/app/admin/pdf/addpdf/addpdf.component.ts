import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-addpdf',
  templateUrl: './addpdf.component.html',
  styleUrls: ['./addpdf.component.scss']
})
export class AddpdfComponent {
  slider = new FormGroup({
    title : new FormControl('' , Validators.required ),
    description : new FormControl(''),
    pdfvi : new FormControl(''),
    pdfen : new FormControl(''),
    link : new FormControl('')
  });
  listselectdanhmuc : any = [] ;
  listselectmenu : any = [] ;
  isLoading : Boolean = false  ;
  pdfen : File | undefined ;
  pdfvi : File | undefined ;

  onFileChangevi(event: any) {
    this.pdfvi = event.target.files[0];

  }

  onFileChangeen(event: any) {
    this.pdfen = event.target.files[0];
  }




  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  constructor(private api : ApiService , private data : DataService) {}

  async submit() {
    if (this.slider.valid) {

      const formData = new FormData();
      formData.append('pdfvi', this.pdfvi ?? '');
      formData.append('pdfen', this.pdfen ?? '');
      // formData.append('_id', this.slider._id);
      formData.append('title', this.slider.value.title ?? '' );
      formData.append('description', this.slider.value.description ?? '');
      formData.append('link' , this.slider.value.link ?? '');

      console.log(formData);


      (await this.api.post('/addpdf' , formData)).subscribe((v : any ) => {
        if(v.status == 200) {
          this.data.notification('Thêm Pdf thành công' , 'Thêm Pdf thành công','success');
          this.resetForm() ;
        } else {
          this.data.notification('Thêm Pdf thất bại' , 'Thêm Pdf thất bại' , 'error');
          this.resetForm() ;
        }
      })

    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.slider.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.slider.reset();
  }
}
