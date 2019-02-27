// import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { BaseApi } from 'src/app/shared/core/base-api';
import { Injectable } from '@angular/core';

@Injectable()
export class BillService extends BaseApi{
    baseBillUrl:string = "http://localhost:3000/bill";
    constructor(public httpClient: HttpClient){
        super(httpClient);
    }

    freeCurrencyBaseUrl: string;
    apiKey: string;
    freeCurrencyUrl: string;
bill: Bill;
ngOnInit(){
    
    this.apiKey= "fbfe8034ae0a2ee69544";
    this.freeCurrencyUrl = `https://free.currencyconverterapi.com/api/v6/convert?apiKey=${this.apiKey}`;//&q=EUR_USD&compact=ultra";
}

    // getBill(){
    //     return this.httpClient.get(this.baseBillUrl);
    //     }

  getBill(): Observable<Bill>{
      return this.get("bill");
  }

    getCurrency(currency:string = 'USD'){
        let argument = `${this.freeCurrencyUrl}&q=EUR_USD&compact=ultra`;
        console.log();
        return this.httpClient.get("https://free.currencyconverterapi.com/api/v6/convert?apiKey=fbfe8034ae0a2ee69544&q=EUR_USD&compact=ultra");
    }
}