import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  newfeed : any = [] ;
  isLoading : Boolean = true ;
  constructor(public api : ApiService) {
    this.getData();
  }


  async getData() {
    (await this.api.get('/newfeed')).subscribe((v) => {
        this.newfeed = v ;
        this.isLoading = false ;
    })
  }

  extractDescriptionPart(description: string): string {
    const regex = /<[^>]+>/g; // Regular expression để loại bỏ các thẻ HTML
      return  description.replace(regex, '');
  }


}
