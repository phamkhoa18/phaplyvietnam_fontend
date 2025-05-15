import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-addtypes',
  templateUrl: './addtypes.component.html',
  styleUrls: ['./addtypes.component.scss']
})
export class AddtypesComponent {
  menu = new FormGroup({
    name : new FormControl('' , Validators.required )
  });
  listselectdanhmuc : any = [] ;
  listselectmenu : any = [] ;
  isLoading : Boolean = false  ;



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  constructor(private api : ApiService , private data : DataService) {}

  async submit() {
    if (this.menu.valid) {

      console.log(this.menu.value);


      const object = {
        title : this.menu.value.name
      };
      console.log(object);
      (await this.api.post('/addtypes' , object)).subscribe((v : any ) => {
        if(v.status == 200) {
          this.data.notification('Thêm menu thành công' , 'Thêm menu thành công','success');
          this.resetForm() ;
        } else {
          this.data.notification('Thêm menu thất bại' , 'Thêm menu thất bại' , 'error');
          this.resetForm() ;
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
  }
}
