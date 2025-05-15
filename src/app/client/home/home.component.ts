import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
declare var $:any ;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  yourValue: number = 10;
  isLoading : Boolean = true ;
  listservice : any ;
  logo : any ;
  numberToAnimate: number = 0;
  constructor(private viewportScroller : ViewportScroller , public api : ApiService , private titleService: Title
    , private data : DataService
  ){
      this.titleService.setTitle('TRANG CHỦ - Trợ giúp pháp lý Việt Nam');
  }


  async ngOnInit(): Promise<any> {
      this.viewportScroller.scrollToPosition([0, 0]);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getService();
    this.logo = await this.data.getSettings('logo');
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    $(document).ready(function(){
    $('.center').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      autoplay : true ,
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
  }
    )} ;


    async getService() {
       (await this.api.get('/findnewcategorylimit/64b24a11bc10ae120013499b')).subscribe((v) => {
          this.listservice = v ;
          this.isLoading = false ;
       })
    }

    extractDescriptionPart(description: string): string {
      const regex = /<[^>]+>/g; // Regular expression để loại bỏ các thẻ HTML
        return  description.replace(regex, '');
    }


}
