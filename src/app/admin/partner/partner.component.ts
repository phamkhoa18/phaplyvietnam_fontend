import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent {


  items : any = [] ;
  isValid: Boolean = false;
  listdanhmuc: any  = [];
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

  async getData(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listpartner')).subscribe(
        (v: any) => {
          this.isLoading = false;
          this.listdanhmuc = v ;
          this.setlistdanhmuc(this.listdanhmuc);
          this.listdanhmuc$.subscribe(v => this.listdanhmuc = v );
          console.log(this.listdanhmuc);
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
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
        const _id = {
          _id: item._id,
          background : item.background
        };
        (await this.api.post('/del_partner', _id)).subscribe((v : any ) => {
            if(v.status == 200) {
              this.data.notification('Xóa đối tác - khách hàng thành công ' , 'Xóa đối tác - khách hàng thành công' , 'success')
              this.getData();
            } else {
              this.data.notification('Xóa đối tác - khách hàng không thành công' , 'Xóa đối tác - khách hàng không thành công' , 'error')
              this.getData();
            }
        });
      }

    })
  }

}
