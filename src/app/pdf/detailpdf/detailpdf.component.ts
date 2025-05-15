import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
declare const pdfjsLib: any;
import html2canvas from 'html2canvas';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detailpdf',
  templateUrl: './detailpdf.component.html',
  styleUrls: ['./detailpdf.component.scss']
})
export class DetailpdfComponent {
  @ViewChild(PdfViewerComponent) private pdfComponent: any = PdfViewerComponent;
  @ViewChild('pdfViewer') pdfViewer: any;
  @ViewChild('pdfContent') pdfContent!: ElementRef;

  constructor(private data : DataService ,private api : ApiService , private route : ActivatedRoute) {

  }
  isLoadingPdf : boolean = true ;
  isLoading : boolean = false ;
  itemRes : any ;
  src = '';
  zoomLevel: number = 1;
  isShow : boolean = false ;
  page: number = 1;
  totalPages: number = 0;
  pages: any[] = [];
  currentScrollPage: number = 1;
  showPdfViewer: boolean = true; // Flag to show/hide the PDF viewer
  isLoaded: boolean = false;
  thumbnails: string[] = []; // Array to store the paths of thumbnail images
  enteredTextData: string = '';
  pdfData:any = Uint8Array;
  hidden : boolean = false ;

  dataclient : any = [] ;

  ngOnInit(): void {
    // Gọi hàm xử lý sự kiện cuộn khi component được khởi tạo
    const myName = this.route.snapshot.paramMap.get('name');
    this.getPdfSlug(myName);
  }

  // GET API '/getpdfslug/:name' (RES => ITEM{ STATUS , MESSAGE })
  async getPdfSlug(name : any) {
     (await this.api.get('/getpdfslug/' + name)).subscribe((res : any) => {
        this.itemRes = res.message ;
        this.handlePdfArray(res.message.fileNamePdf)
     })
  }

  // HANDLE AND ADD RES IN SRC AND VIEW SHOW
  handlePdfArray (arrayPdf : any) {
      arrayPdf.forEach((e : any ) => {
          if(e.fieldname == 'pdfvi') {
              this.src = this.api.URL + "/" + e.path ;
          }
      })

      setInterval(() => {
        this.isLoadingPdf = false ;
      } , 2000 )
  }

  // Thêm sự kiện scroll và phương thức xử lý nó
  onPdfChange(event: any): void {
    console.log('Current Page:', event.currentPage);
  }


  async onPageChange(event: any) {
    // Lấy trang mới và cập nhật giá trị cho biến page
    this.page = event;
    await this.getValueHtml() ;
  }

  async getValueHtml() {
    const html: HTMLElement = this.pdfViewer.pdfViewerContainer.nativeElement;
    const inputElements = html.querySelectorAll('input[type="text"], input[type="checkbox"], textarea');

    await inputElements.forEach((input: any) => {
      if (input.type === 'text' || input.type === 'textarea') {
         // Kiểm tra xem giá trị của input đã rỗng hay không
        if (input.value !== '') {
          // Kiểm tra xem dữ liệu đã tồn tại trong mảng chưa
          const existingDataIndex = this.dataclient.findIndex((item : any) => item.nameField === input.name);
          if (existingDataIndex !== -1) {
              // Nếu đã tồn tại, cập nhật giá trị mới
              this.dataclient[existingDataIndex].valueField = this.xoaDauChuVaChuyenHoa(input.value);
          } else {
              // Nếu chưa tồn tại, thêm mới vào mảng
              this.dataclient.push({ nameField: input.name, valueField: this.xoaDauChuVaChuyenHoa(input.value) });
          }
      } else {
          // Nếu giá trị của input rỗng, xóa nameField khỏi mảng
          const indexToRemove = this.dataclient.findIndex((item : any) => item.nameField === input.name);
          if (indexToRemove !== -1) {
              this.dataclient.splice(indexToRemove, 1);
          }
      }
      } else if (input.type === 'checkbox') {
        // Kiểm tra xem checkbox có được chọn hay không
        if (input.checked) {
            // Kiểm tra xem dữ liệu đã tồn tại trong mảng chưa
            const existingDataIndex = this.dataclient.findIndex((item : any) => item.nameField === input.name);
            if (existingDataIndex !== -1) {
                // Nếu đã tồn tại, cập nhật giá trị mới
                this.dataclient[existingDataIndex].valueField = input.value;
            } else {
                // Nếu chưa tồn tại, thêm mới vào mảng
                this.dataclient.push({ nameField: input.name, valueField: input.value });
            }
        } else {
            // Nếu checkbox không được chọn và đã có nameField trong mảng, loại bỏ bản ghi đó
            const existingDataIndex = this.dataclient.findIndex((item : any) => item.nameField === input.name);
            if (existingDataIndex !== -1) {
                this.dataclient.splice(existingDataIndex, 1);
            }
        }
    }
  });
  }

  goToPage(pageNumber: number): void {
    // Implement logic to navigate to the selected page
    this.page = pageNumber;
  }

  setHidden() {
    if(this.hidden) {
      this.hidden = false ;
    } else {
      this.hidden = true ;
    }
  }

  handleShow () {
    if(this.isShow == false ) {
      this.isShow = true ;
    } else {
      this.isShow = false ;
    }
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;

    // Tạo danh sách các thumbnail
    this.generateThumbnails(pdfData);
  }

  isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  zoomOnWheel(event: WheelEvent | TouchEvent): void {
    const isMobile = this.isMobileDevice();
     // Lưu lại trang hiện tại trước khi thực hiện zoom
  const currentPage = this.page;

    if (
      (event instanceof WheelEvent && event.ctrlKey && !isMobile) ||
      (event instanceof TouchEvent && event.touches && event.touches.length === 2)
    ) {
      if (event instanceof WheelEvent && event.deltaY > 0) {
        this.zoomOut();
      } else if (event instanceof WheelEvent) {
        this.zoomIn();
      }

      // Đặt lại trang hiện tại sau khi zoom đã hoàn thành
      this.page = currentPage;
      event.preventDefault();
    }
  }

  zoomIn(): void {
    this.zoomLevel += 0.1;
  }

  zoomOut(): void {
    this.zoomLevel -= 0.1;
  }

  async generateThumbnails(pdfData: any): Promise<void> {
    const numThumbnails = pdfData.numPages;
    this.thumbnails = [];

    // Duyệt qua từng trang để tạo thumbnail
    for (let i = 1; i <= numThumbnails; i++) {
      const page = await pdfData.getPage(i);
      const viewport = page.getViewport({ scale: 0.5 });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context!,
        viewport: viewport
      };

      await page.render(renderContext).promise;
      this.thumbnails.push(canvas.toDataURL());
    }
  }

  xoaDauChuVaChuyenHoa(s: string): string {
    // Xóa dấu
    let chuoiKhongDau = s .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
    // Chuyển tất cả chữ cái thành chữ in hoa
    chuoiKhongDau = chuoiKhongDau.toUpperCase();
    return chuoiKhongDau;
  }

  async savePdfAs4(): Promise<void> {
    this.isLoading = true ;
    const html: HTMLElement = this.pdfViewer.pdfViewerContainer.nativeElement;
    const inputElements = html.querySelectorAll('input[type="text"], input[type="checkbox"], textarea');

    await inputElements.forEach((input: any) => {
      if (input.type === 'text' || input.type === 'textarea') {
         // Kiểm tra xem giá trị của input đã rỗng hay không
        if (input.value !== '') {
          // Kiểm tra xem dữ liệu đã tồn tại trong mảng chưa
          const existingDataIndex = this.dataclient.findIndex((item : any) => item.nameField === input.name);
          if (existingDataIndex !== -1) {
              // Nếu đã tồn tại, cập nhật giá trị mới
              this.dataclient[existingDataIndex].valueField = this.xoaDauChuVaChuyenHoa(input.value);
          } else {
              // Nếu chưa tồn tại, thêm mới vào mảng
              this.dataclient.push({ nameField: input.name, valueField: this.xoaDauChuVaChuyenHoa(input.value) });
          }
      } else {
          // Nếu giá trị của input rỗng, xóa nameField khỏi mảng
          const indexToRemove = this.dataclient.findIndex((item : any) => item.nameField === input.name);
          if (indexToRemove !== -1) {
              this.dataclient.splice(indexToRemove, 1);
          }
      }

      } else if (input.type === 'checkbox') {
        // Kiểm tra xem checkbox có được chọn hay không
        if (input.checked) {
            // Kiểm tra xem dữ liệu đã tồn tại trong mảng chưa
            const existingDataIndex = this.dataclient.findIndex((item : any) => item.nameField === input.name);
            if (existingDataIndex !== -1) {
                // Nếu đã tồn tại, cập nhật giá trị mới
                this.dataclient[existingDataIndex].valueField = input.value;
            } else {
                // Nếu chưa tồn tại, thêm mới vào mảng
                this.dataclient.push({ nameField: input.name, valueField: input.value });
            }
        } else {
            // Nếu checkbox không được chọn và đã có nameField trong mảng, loại bỏ bản ghi đó
            const existingDataIndex = this.dataclient.findIndex((item : any) => item.nameField === input.name);
            if (existingDataIndex !== -1) {
                this.dataclient.splice(existingDataIndex, 1);
            }
        }
      }
  });
    console.log(this.itemRes);
    this.submit({ pdfvalue : this.itemRes , data: this.dataclient });
}

async savePdfAs4Test(): Promise<void> {
  this.isLoading = true ;
  const html: HTMLElement = this.pdfViewer.pdfViewerContainer.nativeElement;
  const inputElements = html.querySelectorAll('input[type="text"], input[type="checkbox"], textarea');

  await inputElements.forEach((input: any) => {
      if (input.type === 'text' || input.type === 'textarea') {
        // Kiểm tra xem giá trị của input đã rỗng hay không
        if (input.value == '') {
          // Kiểm tra xem dữ liệu đã tồn tại trong mảng chưa
          const existingDataIndex = this.dataclient.findIndex((item : any) => item.nameField === input.name);
          if (existingDataIndex !== -1) {
              // Nếu đã tồn tại, cập nhật giá trị mới
              this.dataclient[existingDataIndex].valueField = this.xoaDauChuVaChuyenHoa(input.value);
          } else {
              // Nếu chưa tồn tại, thêm mới vào mảng
              this.dataclient.push({ nameField: input.name, valueField: this.xoaDauChuVaChuyenHoa(input.value) });
          }
      }

      } else if (input.type === 'checkbox') {
        // Kiểm tra xem checkbox có được chọn hay không
        if (input.checked) {
            // Kiểm tra xem dữ liệu đã tồn tại trong mảng chưa
            const existingDataIndex = this.dataclient.findIndex((item : any) => item.nameField === input.name);
            if (existingDataIndex !== -1) {
                // Nếu đã tồn tại, cập nhật giá trị mới
                this.dataclient[existingDataIndex].valueField = input.value;
            } else {
                // Nếu chưa tồn tại, thêm mới vào mảng
                this.dataclient.push({ nameField: input.name, valueField: input.value });
            }
        }
      }
  });
  console.log(this.dataclient);
  this.submit({ pdfvalue : this.itemRes , data: this.dataclient });
}




  async submit(data: any) {
    this.isLoading = false ;
    console.log(data);

    // (await this.api.post('/add_pdf' , data)).subscribe((v : any ) => {
    //   if(v.status == 200) {
    //     this.isLoading = false ;
    //     this.data.notification('Thông tin gửi lên đã thành công' , 'Cảm ơn bạn , chúng tôi sẽ hỗ trợ bạn nhanh nhất !' , 'success' , v.filename , 'output_pdf');
    // } else {
    //     this.isLoading = false ;
    //     this.data.notification('Thông tin gửi lên đã thất bại' , 'Bạn hãy kiểm tra lại xem mạng có ổn định chưa !' , 'error' , '' , '');
    // }
    // })
  }

}
