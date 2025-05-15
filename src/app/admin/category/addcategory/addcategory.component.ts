import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent {
  menu = new FormGroup({
    name : new FormControl('' , Validators.required ) ,
    parentcategory : new FormControl('') ,
    image : new FormControl(''),
    filter : new FormControl(true ),
  });
  selectedFile : File | undefined ;
  listselectdanhmuc : any = [] ;
  isLoading : Boolean = false ;

  constructor(private api : ApiService ,private data : DataService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getSelect();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  async getSelect(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listcategory')).subscribe(
        (v: any) => {
          this.listselectdanhmuc = v;
          this.isLoading = false;
          console.log(this.listselectdanhmuc);
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  };


 async  submit() {
    if (this.menu.valid) {
      console.log(this.menu.value);
      console.log(this.selectedFile);
      const formData = new FormData();
      const filterValue = this.menu.value.filter ? 'true' : 'false';
      formData.append('title' , this.menu.value.name ?? '');
      formData.append('parent_id' , this.menu.value.parentcategory ?? '');
      formData.append('background' , this.selectedFile ?? '');
      formData.append('filter' , filterValue );

      (await this.api.post("/addcategory" , formData)).subscribe((v : any ) => {
          if(v.status == 200) {
            this.data.notification('Thêm danh mục thành công' , 'Thêm danh mục thành công','success');
            this.resetForm() ;
          } else {
            this.data.notification('Thêm danh mục thất bại' , 'Thêm danh mục thất bại' , 'error');
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
