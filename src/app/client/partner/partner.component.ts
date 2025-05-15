import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
declare var $:any ;

ApiService
@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent {

  listpartner : any = [] ;
  isLoading : Boolean = true ;
  constructor(public api : ApiService , private data : DataService) {

  }

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listpartner = await this.data.partner() ;
    $(document).ready(function(){
      $('.center').slick({
        slidesToShow: 4,
        autoplay : true ,
        dots : true ,
        responsive: [
          {
            breakpoint: 1100,
            settings: {
              arrows: false,
              slidesToShow: 3
            }
          },
          {
            breakpoint: 800,
            settings: {
              arrows: false,
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              slidesToShow: 2
            }
          }
        ]
      });
    })
    this.isLoading = false ;
  }

  ngAfterViewInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    $(document).ready(function(){
      $('.center').slick({
        slidesToShow: 4,
        autoplay : true ,
        dots : true ,
        responsive: [
          {
            breakpoint: 1100,
            settings: {
              arrows: false,
              slidesToShow: 3
            }
          },
          {
            breakpoint: 800,
            settings: {
              arrows: false,
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              slidesToShow: 2
            }
          }
        ]
      });
    })
  }



}
