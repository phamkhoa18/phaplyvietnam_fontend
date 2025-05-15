import { Component ,HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Form80serviceService } from 'src/app/services/form80service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
declare var $ : any  ;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isShow : Boolean = false ;
  permanent : Boolean = false ;
  lang: any = 'vi' ;
  listmenu : any  = [] ;
  logo : any ;
  constructor(
    public api : ApiService ,
    private data : DataService,
    private translate: TranslateService,
    private form80service: Form80serviceService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

 async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData();
    window.addEventListener('scroll' , () => {
        this.Scroll() ;
    })
    this.logo = await this.data.getSettings('logo');

    this.form80service.currentLanguage.subscribe((value) => {
      console.log(this.lang);

      this.translate.use(value);
      this.lang = value ;
      console.log(this.lang);

  })
  }
  onLanguageToggle(lang: any) {
    this.form80service.changeLanguage(lang) ;
  }

  async getData() {
    console.log(1);
    (await this.api.get('/getMenu')).subscribe((v) => {
        this.listmenu = v ;
    })
  }

  Scroll (){
    if(window.pageYOffset >= 30) {
      this.permanent = true ;
    }else {
      this.permanent = false ;
    }

  }

  show() {
      this.isShow =! this.isShow ;
  }

  isExternalLink(link: string): boolean {
    return link.startsWith('http://') || link.startsWith('https://');
  }

  // Gọi khi load component PDF
  onPdfComponentLoad(): void {
    this.data.setHeaderBlock(true);
  }

  // Gọi khi load các component khác
  onOtherComponentLoad(): void {
    this.data.setHeaderBlock(false);
  }


}
