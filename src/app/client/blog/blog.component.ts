
import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, Pipe } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  p : any = 1 ;
  public Editor = DecoupledEditor;
  oneItem: any;
  isLoading: boolean = true;
  isdanhmuc : any ;
  listnew : any = [] ;
  extractedPart: string = '';
  myName : any ;

  constructor(public api : ApiService , private route: ActivatedRoute,private viewportScroller : ViewportScroller , private titleService : Title) {}


  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe((params: Params) => {
      const myId = params['get']('name');
      this.getDetail(myId);
      this.myName = myId ;
    });
  }

  async getDetail(id: any) {
    (await this.api.get('/findmenu/' + id)).subscribe((v : any) => {

      this.isdanhmuc = v.category_id ;
      this.oneItem = v ;
      this.titleService.setTitle(this.oneItem.category_id.title + " - Trợ giúp pháp lý Việt Nam");
      this.isLoading = false ;
      this.getList(this.isdanhmuc._id);
    });
  }

  async getList(iddanhmuc : any ) {
      (await this.api.get('/findnewcategory/' + iddanhmuc)).subscribe((v : any ) => {
          this.listnew = v ;
          this.listnew.forEach((e : any) => {
            const date = new Date(e.updated_at);
            e.date = date ;
          });
      })
  }

  extractDescriptionPart(description: string): string {
    const regex = /<[^>]+>/g; // Regular expression để loại bỏ các thẻ HTML
      return  description.replace(regex, '');
  }

}
