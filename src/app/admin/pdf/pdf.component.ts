import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {


  items : any = [] ;
  isValid: Boolean = false;
  listslider: any  = [];
  isLoading : Boolean = true ;
  // dòng chảy
  private _listsliderSuject : BehaviorSubject<[]> = new BehaviorSubject([]);
  private _itemsSuject : BehaviorSubject<[]> = new BehaviorSubject([]);
  // nơi phân phát
  listslider$ : Observable<[]> = this._listsliderSuject.asObservable() ;
  items$ : Observable<[]> = this._itemsSuject.asObservable() ;

  constructor (public api : ApiService , private data : DataService , private router : Router) {}


  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  setlistslider(data : any) {
    this._listsliderSuject.next(data);
  }

  setlistitems(data : any ) {
    this._itemsSuject.next(data);
  }

  async getData(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listpdf')).subscribe(
        (v: any) => {
          this.isLoading = false;
          this.listslider = v ;
          this.setlistslider(this.listslider);
          this.listslider$.subscribe(v => this.listslider = v );
          console.log(v);
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
        (await this.api.get('/delpdf/' + item._id)).subscribe((v : any ) => {
            if(v.status == 200) {
              this.data.notification('Xóa menu thành công ' , 'Xóa menu thành công' , 'success')
              this.getData();
            } else {
              this.data.notification('Xóa menu không thành công' , 'Xóa menu không thành công' , 'error')
              this.getData();
            }
        });
      }

    })
  }

}
