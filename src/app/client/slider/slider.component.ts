import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
ApiService
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  isLoading : Boolean = true ;
  listslider : any = [];

  constructor(public api : ApiService) {}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData() ;
  }

  async getData() {
      (await this.api.get('/listslider')).subscribe((v : any ) => {
          this.listslider = v ;
          this.isLoading = false ;
          console.log(this.listslider);

      })
  }




}
