import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-addpartner',
  templateUrl: './addpartner.component.html',
  styleUrls: ['./addpartner.component.scss']
})
export class AddpartnerComponent {
  menu = new FormGroup({
    name : new FormControl('' , Validators.required ) ,
    href : new FormControl(''),
    image : new FormControl('')
  });
  selectedFile : File | undefined ;
  listselectdanhmuc : any = [] ;
  isLoading : Boolean = false ;

  constructor(private api : ApiService ,private data : DataService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }



 async  submit() {
    if (this.menu.valid) {
      console.log(this.menu.value);
      console.log(this.selectedFile);
      const formData = new FormData();
      formData.append('title' , this.menu.value.name ?? '');
      formData.append('link' , this.menu.value.href ?? '');
      formData.append('background' , this.selectedFile ?? '');

      (await this.api.post("/addpartner" , formData)).subscribe((v : any ) => {
          if(v.status == 200) {
            this.data.notification('Thêm đối tác - khách hàng thành công' , 'Thêm đối tác - khách hàng thành công','success');
            this.resetForm() ;
          } else {
            this.data.notification('Thêm đối tác - khách hàng thất bại' , 'Thêm đối tác - khách hàng thất bại' , 'error');
          }
      })
    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.menu.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.menu.reset();
    this.selectedFile = undefined;
  }

}
