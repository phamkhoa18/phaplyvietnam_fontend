import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent {

  listtype : any = [] ;
  isLoading : Boolean = true ;
  listnewfeed : any = [] ;

  constructor(public api : ApiService) {}

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

}
