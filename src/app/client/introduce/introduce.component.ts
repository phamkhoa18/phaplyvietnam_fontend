import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss']
})
export class IntroduceComponent {

  logo: any ;
  item : any ;
  isLoading = true ;

  constructor(public data : DataService , public api : ApiService) {}

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.item = await this.data.getSettings('introduce');
    this.logo = await this.data.getSettings('logo');
  }
}
