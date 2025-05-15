import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent {

  listtheloai: any  = [];
  isLoading : Boolean = true ;
  // dòng chảy
  private _listdanhmucSuject : BehaviorSubject<[]> = new BehaviorSubject([]);
  // nơi phân phát
  listdanhmuc$ : Observable<[]> = this._listdanhmucSuject.asObservable() ;

  constructor (public api : ApiService , private data : DataService , private router : Router) {}


  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  setlistdanhmuc(data : any) {
    this._listdanhmucSuject.next(data);
  }

  async getData() {
    (await this.api.get('/listtypes')).subscribe((v : any ) => {
        this.listtheloai = v ;
        this.setlistdanhmuc(this.listtheloai);
        this.listdanhmuc$.subscribe(v => this.listtheloai = v );
        this.isLoading = false ;
    })
  }


  remove(item: any ) {
    Swal.fire({
      title: 'Bạn có muốn xóa danh mục này không ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( async (result) => {

      if (result.isConfirmed) {
        (await this.api.get('/deltypes/' + item._id)).subscribe((v : any ) => {
            if(v.status == 200) {
              this.data.notification('Xóa thể loại thành công ' , 'Xóa thể loại thành công' , 'success')
              this.getData();
            } else {
              this.data.notification('Xóa thể loại không thành công' , 'Xóa thể loại không thành công' , 'error')
              this.getData();
            }
        });
      }

    })
  }

}
