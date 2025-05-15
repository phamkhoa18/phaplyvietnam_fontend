import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-editpdf',
  templateUrl: './editpdf.component.html',
  styleUrls: ['./editpdf.component.scss']
})
export class EditpdfComponent {

  menu = new FormGroup({
    _id : new FormControl('') ,
    title : new FormControl('' , Validators.required ) ,
    description : new FormControl(''),
    pdfnow : new FormControl([]) ,
    pdfen : new FormControl(''),
    pdfvi : new FormControl(''),
  });
  item : any ;
  selectedFile : File | undefined ;
  listselectdanhmuc : any = [] ;
  isLoading : Boolean = true ;
  pdfvi : any ;
  pdfen : any ;
  arraypdf : any = [] ;

  constructor(public api : ApiService ,private data : DataService , private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const myId = this.route.snapshot.paramMap.get('id');
    this.getItem(myId) ;
  }


  onFileChangevi(event: any) {
    this.pdfvi = event.target.files[0];

  }

  onFileChangeen(event: any) {
    this.pdfen = event.target.files[0];
  }

  async getItem(_id : any ) {
    (await this.api.get('/getpdf/' + _id)).subscribe((v) => {
        this.item = v ;
        console.log(this.item);

        this.menu.patchValue({
          _id : this.item._id ,
          title : this.item.title ,
          description : this.item.description ,
          pdfnow : this.item.fileNamePdf ,
        })

        console.log(this.item.fileNamePdf);


        this.arraypdf = this.item.fileNamePdf;

        this.isLoading = false ;
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

 async  submit() {
    if (this.menu.valid) {
      const formData = new FormData();
      formData.append('id' , this.item._id)
      formData.append('title' , this.menu.value.title ?? '');
      formData.append('description' , this.menu.value.description ?? '');
      formData.append('pdfvi', this.pdfvi ?? '');
      formData.append('pdfen', this.pdfen ?? '');
      formData.append('fileNamePdf_old' , JSON.stringify(this.arraypdf));

      (await this.api.post("/editpdf" , formData)).subscribe((v : any ) => {
          if(v.status == 200) {
            this.data.notification('Sửa pdf thành công' , 'Sửa pdf thành công','success');
          } else {
            this.data.notification('Sửa pdf thất bại' , 'Sửa pdf thất bại' , 'error');
          }
      })
    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.menu.markAllAsTouched();
    }
  }
}
