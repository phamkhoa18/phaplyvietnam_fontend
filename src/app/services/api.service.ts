import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthserviceService } from './authservice.service';
import { Observable } from 'rxjs';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCaKbVhcX_22R_pRKDYuNA7vox-PtGaDkI';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  URL : any = 'https://saigon247.au/api' ;
  // URL : any = 'http://localhost:4000' ;
  URLMoney : any = 'https://api.exchangerate-api.com/v6' ;
  private apiUrl = 'https://api.currencyfreaks.com';
  private apikey = '128b053a84bb4405a1f355c0dc278336'

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

  async getmoney(path : any ) {
    return await this.http.get(`${this.URLMoney}${path}`);
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

  getExchangeRates(baseCurrency: string): Observable<any> {
    return this.http.get(`https://open.er-api.com/v6/latest?base=${baseCurrency}`);
  }

  getCountries(): Observable<any> {
    return this.http.get('https://restcountries.com/v3.1/all');
  }

  getConversionRate(from: string, to: string, amount: Number): Observable<any> {
    const url = `${this.apiUrl}/v2.0/convert/lastest?apikey=${this.apikey}from=${from}&to=${to}&amount=${amount}`;
    return this.http.get(url);
  }

}

