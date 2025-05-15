import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edittypes',
  templateUrl: './edittypes.component.html',
  styleUrls: ['./edittypes.component.scss']
})
export class EdittypesComponent {

  menu = new FormGroup({
    _id : new FormControl('') ,
    name : new FormControl('' , Validators.required )
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
    this.getItem(myId) ;
  }

  async getItem(_id : any ) {
    (await this.api.get('/listtypes/' + _id)).subscribe((v) => {
        this.item = v ;

        this.menu.patchValue({
          _id : this.item._id ,
          name : this.item.title ,
        })
        this.isLoading = false ;
    })
  }






 async  submit() {
    if (this.menu.valid) {
      console.log(this.menu.value);

      const object = {
        _id : this.menu.value._id ,
        title : this.menu.value.name ,
      };

      (await this.api.post("/edittypes" , object)).subscribe((v : any ) => {
          if(v.status == 200) {
            this.data.notification('Sửa thể loại thành công' , 'Sửa thể loại thành công','success');

          } else {
            this.data.notification('Sửa thể loại thất bại' , 'Sửa thể loại thất bại' , 'error');
          }
      })
    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.menu.markAllAsTouched();
    }
  }
}
