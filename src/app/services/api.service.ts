import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthserviceService } from './authservice.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  URL : any = 'https://bieumau.xyz/api' ;
  // URL : any = 'http://localhost:4000' ;


  constructor(private http : HttpClient , private authservice : AuthserviceService) { }



  async post(path: any, body: any) {
    const nonce = this.authservice.generateNonce();
    const stime = this.authservice.getCurrentStime();
    const key = 'phaplyvietnam'; // Thay thế bằng khóa bí mật thực tế
    const signature = this.authservice.createSignature(nonce , stime  , key) ;
    const headers = new HttpHeaders({
      'X-Nonce': nonce,
      'X-Stime': stime.toString(),
      'X-Signature': signature.toString()
    });
    return await this.http.post(`${this.URL}${path}`,body ,{ headers});
  }

  async get(path : any) {
    const nonce = this.authservice.generateNonce();
    const stime = this.authservice.getCurrentStime();
    const key = 'phaplyvietnam'; // Thay thế bằng khóa bí mật thực tế
    const signature = this.authservice.createSignature(nonce , stime  , key) ;
    const headers = new HttpHeaders({
      'X-Nonce': nonce,
      'X-Stime': stime.toString(),
      'X-Signature': signature.toString()
    });

    return await this.http.get(`${this.URL}${path}` , { headers });
  }

  async getdown(path: any) {
    const nonce = this.authservice.generateNonce();
    const stime = this.authservice.getCurrentStime();
    const key = 'phaplyvietnam'; // Thay thế bằng khóa bí mật thực tế
    const signature = this.authservice.createSignature(nonce , stime  , key);

    const headers = new HttpHeaders({
      'X-Nonce': nonce,
      'X-Stime': stime.toString(),
      'X-Signature': signature.toString()
    });

    return await this.http.get(`${this.URL}${path}`, { headers, responseType: 'blob' });
  }


}

