import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';

@Injectable()
export class BillService{
    baseBillUrl:string = "http://localhost:3000/bill";
    constructor(private httpClient: HttpClient){}
    // freeCurrencyBaseUrl: string = "https://free.currencyconverterapi.com/api/v6/";
    freeCurrencyBaseUrl: string;//"https://free.currencyconverterapi.com/api/v6/convert?apiKey=sample-api-key&q=EUR_USD&compact=ultra"
    apiKey: string;
    freeCurrencyUrl: string;
bill: Bill;
ngOnInit(){
    
    this.apiKey= "fbfe8034ae0a2ee69544";
    this.freeCurrencyUrl = `https://free.currencyconverterapi.com/api/v6/convert?apiKey=${this.apiKey}`;//&q=EUR_USD&compact=ultra";
}

    // getBill(): Observable<Bill>{
    //     return this.httpClient.get<Bill[]>(this.baseBillUrl)
    //             .map((bill: Bill[]) => bill[0] ? bill[0] : undefined);//(response: Response) => response.json());
    // }
    getBill(){
        return this.httpClient.get(this.baseBillUrl);
                // .subscribe((bill: Bill) => {
                //     this.bill = bill;
                //     console.log(bill);
                // });
    }

    // getCurrency(){
    //     return this.httpClient.get('http://api.fixer.io/latest');
    // }

    getCurrency(currency:string = 'USD'){
        let argument = `${this.freeCurrencyUrl}&q=EUR_USD&compact=ultra`;
        console.log();
        return this.httpClient.get("https://free.currencyconverterapi.com/api/v6/convert?apiKey=fbfe8034ae0a2ee69544&q=EUR_USD&compact=ultra");
    }
}