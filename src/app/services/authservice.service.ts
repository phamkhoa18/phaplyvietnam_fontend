import { Injectable } from '@angular/core';
import * as md5 from 'md5';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor() { }

  generateNonce(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  getCurrentStime(): number {
    return Date.now();
  }

  createSignature(nonce: string, stime: number, key: string): string {
    const message = `${nonce}${stime}${key}`;
    return md5(message) ;
  }
}
