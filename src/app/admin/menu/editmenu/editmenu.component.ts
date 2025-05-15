import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editmenu',
  templateUrl: './editmenu.component.html',
  styleUrls: ['./editmenu.component.scss']
})
export class EditmenuComponent {

  menu = new FormGroup({
    _id : new FormControl('') ,
    name : new FormControl('' , Validators.required ) ,
    href : new FormControl('') ,
    parentcategory : new FormControl(null) ,
    parentmenu : new FormControl(null)
  });
  item : any ;
  selectedFile : File | undefined ;
  listselectdanhmuc : any = [] ;
  isLoading : Boolean = true ;
  listselectmenu : any = [] ;

  constructor(public api : ApiService ,private data : DataService , private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const myId = this.route.snapshot.paramMap.get('id');

    this.getSelect();
    this.getItem(myId) ;
    this.getSelectMenu() ;



  }

  async getItem(_id : any ) {
    (await this.api.get('/findmenuid/' + _id)).subscribe((v) => {
        this.item = v ;

        this.menu.patchValue({
          _id : this.item._id ,
          name : this.item.title ,
          href : this.item.link ,
          parentmenu : this.item.parent_id ,
          parentcategory : this.item.category_id,
        })

        // title : {type : String} ,
        // link  : {type : String} ,
        // category_id : {type : mongoose.Types.ObjectId , ref : "Categories" , default : ''} ,
        // slug : {type : String , default : ''} ,
        // posision : {type : Number , default : 0} ,
        // parent_id : {type : mongoose.Types.ObjectId , ref : "Menus" , default : null}

        this.isLoading = false ;
    })
  }

  async getSelect(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listcategory')).subscribe(
        (v: any) => {
          this.listselectdanhmuc = v;
          this.isLoading = false;
          resolve();
        },
        (error: any) => {
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


 async  submit() {
    if (this.menu.valid) {
      console.log(this.menu.value);

      const object = {
        _id : this.menu.value._id ,
        title : this.menu.value.name ,
        link : this.menu.value.href ,
        parent_id : this.menu.value.parentmenu ,
        category_id : this.menu.value.parentcategory
      };

      (await this.api.post("/editmenu" , object)).subscribe((v : any ) => {
          if(v.status == 200) {
            this.data.notification('Sửa menu thành công' , 'Sửa menu thành công','success');

          } else {
            this.data.notification('Sửa menu thất bại' , 'Sửa menu thất bại' , 'error');
          }
      })
    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.menu.markAllAsTouched();
    }
  }
}
