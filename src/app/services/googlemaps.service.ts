import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {

  private googleMapsLoaded = false;
  private loadPromise: Promise<void> | null = null;

  constructor() { }

  // Tải Google Maps API
  loadGoogleMaps(): Promise<void> {
    if (this.googleMapsLoaded) {
      return Promise.resolve(); // Nếu đã tải, trả về ngay lập tức
    }

    if (this.loadPromise) {
      return this.loadPromise; // Nếu đang tải, trả về promise đang được thực thi
    }

    this.loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.id = 'googleMaps';
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCYZ8bSCXZmVgQURVq9Q-7QUfGD7GJ2LgE&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.googleMapsLoaded = true;
        resolve(); // Thành công khi script được tải
      };
      script.onerror = (error: any) => {
        reject(error); // Lỗi khi tải script
      };
      document.body.appendChild(script);
    });

    return this.loadPromise;
  }

}
