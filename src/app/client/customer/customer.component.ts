import { Component } from '@angular/core';
declare var $:any ;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {



  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    $(document).ready(function(){
      $('.customer_slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1100,
            settings: {
              arrows: false,
              centerMode: true,
              slidesToShow: 2
            }
          },
          {
            breakpoint: 800,
            settings: {
              arrows: false,
              centerMode: true,
              slidesToShow: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              slidesToShow: 1
            }
          }
        ]
      });
    }
      )} ;
}




