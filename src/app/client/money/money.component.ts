import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
ApiService
@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent {

  listbaseCurrency : any = [];
  kq : any  = 0;
  isLoading : Boolean = true ;
  amount: number = 100;
  fromCurrency: string = 'USD';
  toCurrency: string = 'VND';
  isShow1 : Boolean = true ;
  isShow2 : Boolean = true ;


  exchangeRates: any;
  countries: any[] = [];
  baseCurrency = 'USD';

  constructor(public api : ApiService) {
      this.getData() ;
      this.getCurrencyConvertValue() ;
  }

  getData() {
    this.api.getCountries()
      .subscribe((countriesData: any[]) => {
        this.countries = countriesData.map(country => {
          const countryCode = country.cca2;
          // const exchangeRate = this.exchangeRates(countryCode);
          return {
            name: country.name.common,
            flag: country.flags.png,
            cca : country.cca2
            // exchangeRate: exchangeRate || 0 // Nếu không có tỷ giá, sử dụng 0
          };
        });
        // console.log('Combined Data:', this.countries);
      }, error => {
        console.error('Error fetching countries:', error.message);
      });
  }

  // getExchangeRates(countryCode : any) {
  //   this.api.getExchangeRates(countryCode)
  //     .subscribe((exchangeRatesData: any) => {
  //       // console.log(`Exchange rates for ${this.baseCurrency}:`, this.exchangeRates);
  //       // this.getData(); // Gọi lại hàm getData sau khi lấy tỷ giá
  //       return exchangeRatesData.rates ;
  //     }, error => {
  //       console.error('Error fetching exchange rates:', error.message);
  //     });
  // }

  getCurrencyConvertValue() {
      this.api.getConversionRate('USD' , 'PKR' , 5000).subscribe((res : any ) => {

      })
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  clickShow(valueshow : any ) {
    if(valueshow == 1 ) {
      this.isShow1 =! this.isShow1 ;

      if(this.isShow1 == false ) {
          this.isShow2 = true ;
      }

    } else {
      this.isShow2 =! this.isShow2 ;

      if(this.isShow2 == false ) {
        this.isShow1 = true ;
      }
    }
  }



  value(name: any) {
    console.log(name);
    // this.isShow =! this.isShow;
    // console.log(this.isShow);
  }


}
