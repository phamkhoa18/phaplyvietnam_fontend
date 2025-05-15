import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-addslider',
  templateUrl: './addslider.component.html',
  styleUrls: ['./addslider.component.scss']
})
export class AddsliderComponent {
  slider = new FormGroup({
    name : new FormControl('' , Validators.required ),
    content : new FormControl(''),
    image : new FormControl(''),
    link : new FormControl('')
  });
  listselectdanhmuc : any = [] ;
  listselectmenu : any = [] ;
  isLoading : Boolean = false  ;
  selectedFile : File | undefined ;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  constructor(private api : ApiService , private data : DataService) {}

  async submit() {
    if (this.slider.valid) {

      const formData = new FormData();
      formData.append('image', this.selectedFile ?? '');
      // formData.append('_id', this.slider._id);
      formData.append('title', this.slider.value.name ?? '' );
      formData.append('description', this.slider.value.content ?? '');
      formData.append('link' , this.slider.value.link ?? '');

      (await this.api.post('/addslider' , formData)).subscribe((v : any ) => {
        if(v.status == 200) {
          this.data.notification('Thêm Slider thành công' , 'Thêm Slider thành công','success');
          this.resetForm() ;
        } else {
          this.data.notification('Thêm Slider thất bại' , 'Thêm Slider thất bại' , 'error');
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
