import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
ApiService
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isLoading = true ;
  slbv : any ;
  slcxly : any ;

  constructor(private api : ApiService) {
      this.getData() ;
  }


  async getData(){
    (await this.api.get('/soluongbaiviet')).subscribe((v) => {
        this.slbv = v ;
    });

    (await this.api.get('/soluongcanxuly')).subscribe((v) => {
        this.slcxly = v ;
    })

    this.isLoading = false ;
  }

}
