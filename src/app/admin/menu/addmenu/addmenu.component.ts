import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.scss']
})
export class AddmenuComponent {
  menu = new FormGroup({
    name : new FormControl('' , Validators.required ) ,
    href : new FormControl('' ) ,
    slug : new FormControl('' ),
    parentmenu : new FormControl(null) ,
    category : new FormControl(null)
  });
  listselectdanhmuc : any = [] ;
  listselectmenu : any = [] ;
  isLoading : Boolean = true  ;



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getSelect() ;
    this.getSelectMenu() ;
  }

  constructor(private api : ApiService , private data : DataService) {}






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

  async getSelectMenu(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listmenu')).subscribe(
        (v: any) => {
          this.listselectmenu = v;
          this.isLoading = false;
          this.listselectmenu.push({
            _id: null,
            title: 'TẠO DANH MỤC MỚI HOÀN TOÀN',
            parent_id: null,
          });
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  }


  async submit() {
    if (this.menu.valid) {

      console.log(this.menu.value);


      const object = {
        title : this.menu.value.name,
        link : this.menu.value.href ,
        slug : this.menu.value.slug ,
        category_id : this.menu.value.category ,
        parent_id : this.menu.value.parentmenu
      };

      // if(object.category_id == '') {
      //   object.category_id == null ;
      // }


      console.log(object);


      (await this.api.post('/addmenu' , object)).subscribe((v : any ) => {
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
