import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-editslider',
  templateUrl: './editslider.component.html',
  styleUrls: ['./editslider.component.scss']
})
export class EditsliderComponent {


  oneItem : any ;

  slider = new FormGroup({
    _id : new FormControl('') ,
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


  constructor(public api : ApiService , private route : ActivatedRoute , private data : DataService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const myId = this.route.snapshot.paramMap.get('id');
    this.getData(myId) ;
  }

 async getData(id : any ) {
    (await this.api.get('/listslider/' + id)).subscribe((v : any ) => {
        this.oneItem = v ;
        console.log(this.oneItem.link);

        this.slider.patchValue({
          _id : this.oneItem._id ,
          name : this.oneItem.title ,
          content : this.oneItem.description ,
          link : this.oneItem.link,
          image : this.oneItem.image ,
        })
        this.isLoading = false ;
    })
  }

  async submit() {
    if (this.slider.valid) {

      if(this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile ?? '');
        formData.append('_id', this.slider.value._id ?? "");
        formData.append('title', this.slider.value.name ?? '' );
        formData.append('description', this.slider.value.content ?? '');
        formData.append('link' , this.slider.value.link ?? '');

        (await this.api.post('/editsliderimage' , formData)).subscribe((v : any ) => {
          if(v.status == 200) {
            this.data.notification('Thay đổi Slider thành công' , 'Thay đổi Slider thành công','success');
          } else {
            this.data.notification('Thay đổi Slider thất bại' , 'Thay đổi Slider thất bại' , 'error');
          }
        })
      } else {
           // 1 là không thay đổi hình
        const edit_category = {
          _id : this.slider.value._id ,
          title : this.slider.value.name ,
          description : this.slider.value.content ,
          link : this.slider.value.link ,
          image : this.slider.value.image
        };
        (await this.api.post('/editslider',edit_category)).subscribe((v : any) => {
          if(v.status == 200) {
            this.data.notification('Thay đổi Slider thành công' , 'Thay đổi Slider thành công','success');
          } else {
            this.data.notification('Thay đổi Slider thất bại' , 'Thay đổi Slider thất bại' , 'error');
          }
        })
      }

    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.slider.markAllAsTouched();
    }
  }


}
