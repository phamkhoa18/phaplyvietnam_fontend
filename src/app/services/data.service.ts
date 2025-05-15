import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  init : any ;
  emailForm: FormGroup;
  item : any ;
  isTitle : any ;

  private isHeaderBlockSubject = new BehaviorSubject<boolean>(false);
  isHeaderBlock$ = this.isHeaderBlockSubject.asObservable();

  setHeaderBlock(isBlock: boolean): void {
    this.isHeaderBlockSubject.next(isBlock);
  }

  private pdfDocument:any = PDFDocument;

  async loadPdfFromSrc(src: string): Promise<void> {
    const response = await fetch(src);
    const pdfBytes = await response.arrayBuffer();
    this.pdfDocument = await PDFDocument.load(pdfBytes);
  }

  async savePdf(): Promise<Uint8Array> {
    return await this.pdfDocument.save();
  }

  constructor(private api : ApiService , private fb : FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
   }

  notification(title: any, body: any, status: any, filename: any = null, outdir: any = null) {
    const downloadLink = {
        html : '<b>Cảm ơn bạn đã nhập thông tin</b>' ,
    };

    if (filename > 0 && outdir) {
      downloadLink.html = `<b>Bạn có muốn nhận file copy về máy không ?</b>`;
    }
      Swal.fire({
        icon: status,
        title: title,
        text: body,
        html: downloadLink.html ,
        input: 'email',
        inputPlaceholder: 'Nhập địa chỉ email của bạn',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        showLoaderOnConfirm: true,
        cancelButtonText: 'Hủy',
        preConfirm: async (email) => {
          return new Promise<void>(async (resolve) => {
            if (!Validators.email(new FormControl(email))) {
              try {
                const EmailUrl = `
                  ${this.api.URL}/submitemail`;
                  const data = {
                    email : email ,
                    link : filename ,
                    outdir : outdir
                  }
                  this.init = {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                      "Content-Type": "application/json",
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(data),
                  }
                const response = await fetch(EmailUrl , this.init );
                if (response.status !== 200) {
                  Swal.showValidationMessage(`Email của quý khách có vấn đề, xin vui lòng thử lại`);
                  resolve(); // Resolve promise to close the Swal modal
                } else {
                  const responseData = await response.json();
                  resolve(responseData); // Resolve promise to close the Swal modal
                }
              } catch (error) {
                Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
              }
            } else {
              resolve(email);
            }
          });
        },allowOutsideClick: () => !Swal.isLoading()
    }).then((result : any ) => {
      if (result && result.value) {
        // Check the result.value or perform any desired actions
        if (result.value.status === 200) {
          // If the status is 200 (or any other success condition)
          Swal.fire('Success', 'Email sent successfully!', 'success');
        } else {
          // Handle other cases or show an error Swal
          Swal.fire('Error', 'Failed to send email!', 'error');
        }
      }
    });

  }

  setItem(item : any ) {
      this.item = item ;
  }

  async getSettings(posision : any ){
    return (await this.api.get('/getsettings/' + posision)).toPromise();
  }



  private isLoginSource = new BehaviorSubject<boolean>(false);
  isLoginChanged = this.isLoginSource.asObservable();

  set isLogin(value: boolean) {
    this.isLoginSource.next(value);
  }

  get isLogin() {
    return this.isLoginSource.value;
  }

  getUser() {
    return sessionStorage.getItem('user');
  }

  async partner() {
      return (await this.api.get('/listpartner')).toPromise();
  }

}
