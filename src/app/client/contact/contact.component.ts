
import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {




  constructor(public api : ApiService , private route: ActivatedRoute,private viewportScroller : ViewportScroller , private titleService : Title) {
    this.titleService.setTitle('LIÊN HỆ - Trợ giúp pháp lý Việt Nam');
  }


  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }





}
