import { Component } from '@angular/core';

import Swal from 'sweetalert2'
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-indexmenu',
  templateUrl: './indexmenu.component.html',
  styleUrls: ['./indexmenu.component.scss']
})
export class IndexmenuComponent {
  isLoading : Boolean = true ;
  listmenu : any ;
  constructor(private api : ApiService , private data : DataService) {
    this.getData() ;
  }



  async getData(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/getMenu')).subscribe(
        (v: any) => {
          this.isLoading = false;
          this.listmenu = v ;
          console.log(this.listmenu);
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  save () {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn thay đổi ? ',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chắc chắn'
    }).then( async (result) => {
      this.isLoading = true ;
      if (result.isConfirmed) {
        const menuarraynew = {
          menuarraynew : this.listmenu
        };
        (await this.api.post('/update_index_menu' , menuarraynew)).subscribe((res : any) => {
            this.isLoading = false ;
            if(res.status == 200) {
              this.data.notification('Thay đổi vị trí thành công' , 'Thay đổi thành công' , 'success');
            } else {
              this.data.notification('Thay đổi vị trí thất bại' , 'Thay đổi thất bại' , 'error');
            }
        })
      }
    })
  }
}
