
import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, Pipe } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public Editor = DecoupledEditor;
  myId : any ;
  listdata : any ;
  isLoading : Boolean = true ;
  isHien : Boolean = false ;
  private _listbaivietSubject : BehaviorSubject<[]> = new BehaviorSubject([]);
  listbaiviet$ : Observable<[]> = this._listbaivietSubject.asObservable() ;

  constructor(public api : ApiService , private route: ActivatedRoute,private viewportScroller : ViewportScroller) {}


  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe(params => {
      this.myId = params.get('name');
      this.getData(this.myId) ;
    });
  }

  setlistbaiviet(array_new : any) {
    this._listbaivietSubject.next(array_new);
}

  async getData (tim : any ) {
    const body = {
        timkiem : tim
    };
      (await this.api.post('/tim-kiem' , body)).subscribe((v: any) => {
          this.listdata = v.data ;
          this.setlistbaiviet(this.listdata) ;
          this.listbaiviet$.subscribe((v) => this.listdata = v );
          if(this.listdata == 0) {
              this.isHien = true ;
          } else {
            this.isHien = false;
          }
          this.isLoading = false ;
      })
  }

  extractDescriptionPart(description: string): string {
    const regex = /<[^>]+>/g; // Regular expression để loại bỏ các thẻ HTML
      return  description.replace(regex, '');
  }
}
