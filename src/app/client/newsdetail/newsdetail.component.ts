import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ViewportScroller } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.scss']
})
export class NewsdetailComponent {

  @ViewChild('elementRef', { static: true }) elementRef!: ElementRef;
  public Editor = DecoupledEditor;
  oneItem: any;
  isLoading: boolean = true;
  desthuan : any = '' ;
  myId : any
  contentformatsafe : any ;

  constructor(
    private route: ActivatedRoute,
    public api: ApiService,
    public sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private el: ElementRef,
    private viewportScroller : ViewportScroller,
    private router :Router,
    private titleService : Title
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe(params => {
      this.myId = params.get('name');
      // Do something with this.id
      this.getDetail(this.myId);
    });
  }


  async getDetail(id: any) {
    (await this.api.get('/listnew/' + id)).subscribe((v : any) => {
      this.oneItem = v;
      console.log(this.oneItem);

      this.titleService.setTitle(this.oneItem.title);
      this.contentformatsafe = this.sanitizer.bypassSecurityTrustHtml(this.processContent(this.oneItem.description)) ;
      this.viewportScroller.scrollToPosition([0, 0]);
      this.isLoading = false ;
    });
  }



  processContent(content: string): string {
    // Sử dụng DOM parser để phân tích nội dung HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');


    // Xử lý in đậm cho các chuỗi **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    const elementsWithBoldText = doc.evaluate('//text()[contains(., "**")]', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (let i = 0; i < elementsWithBoldText.snapshotLength; i++) {
        const node:any = elementsWithBoldText.snapshotItem(i);
        const parent = node.parentNode;

        if (parent && parent.nodeName !== 'STRONG') {
            const text = node.nodeValue || '';
            const parts = text.split('**');

            for (let j = 0; j < parts.length; j++) {
                if (j % 2 === 1) {
                    const strong = doc.createElement('strong');
                    strong.textContent = parts[j];
                    parent.insertBefore(strong, node);
                } else {
                    parent.insertBefore(doc.createTextNode(parts[j]), node);
                }
            }

            parent.removeChild(node);
        }
    }

    // Xóa các thẻ có class là "title" và "author"
    const titleElements = doc.querySelectorAll('.title');
    titleElements.forEach(titleElement => titleElement.remove());

    const authorElements = doc.querySelectorAll('.author');
    authorElements.forEach(authorElement => authorElement.remove());

    // Lấy tất cả các thẻ hình ảnh trong nội dung
    const images = doc.querySelectorAll('img');

    const allElements = doc.querySelectorAll('*');

    // Duyệt qua từng phần tử và thiết lập font-family là Tahoma
    allElements.forEach((element : any) => {
        element.style.fontFamily = 'Inter';
    });

    // Lấy tất cả các thẻ h2, h3, h4, h5 trong nội dung HTML
    const headings = doc.querySelectorAll('h2, h3, h4, h5');

    // Duyệt qua từng thẻ heading và thiết lập thuộc tính font-weight là bolder
    headings.forEach((heading : any) => {
        heading.style.fontWeight = 'bolder';
    });



    // Duyệt qua từng thẻ hình ảnh và thêm thuộc tính vào
    images.forEach(img => {
        img.setAttribute('style', 'width:100%; height:auto; border-radius:20px;');
    });

    // Chuyển đổi nội dung HTML đã được chỉnh sửa thành chuỗi và trả về
    return doc.documentElement.innerHTML;
  }




}
