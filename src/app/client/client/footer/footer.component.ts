import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {


  listnewfeed : any = [] ;
  isLoading : any = true ;
  logo : any ;
  constructor(public api : ApiService , private data : DataService) {
    this.getNewFeed();
  }

 async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.logo = await this.data.getSettings('logo');
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
