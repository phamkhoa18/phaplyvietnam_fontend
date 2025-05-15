import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

ApiService
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  timkiem :any = '' ;
  listtype : any = [] ;
  isLoading : Boolean = true ;
  listnewfeed : any = [] ;

  constructor(public api : ApiService , private router : Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData() ;
    this.getNewFeed();
  }


  async getData() {
    (await this.api.get('/listtypes')).subscribe((v) => {
        this.listtype = v ;
        this.isLoading = false ;
    })
  }

  async getNewFeed() {
    (await this.api.get('/newfeed')).subscribe((v) => {
        this.listnewfeed = v ;
        this.listnewfeed.forEach((e : any) => {
          const date = new Date(e.updated_at);
          e.date = date ;
        });

        this.isLoading = false ;

    })
  }

  search() {
    this.router.navigate(['/tim-kiem/' + this.timkiem]);
    this.timkiem = '' ;
  }


}
