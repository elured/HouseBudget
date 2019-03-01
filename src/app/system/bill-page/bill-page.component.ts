import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { Subscription, Observable } from 'rxjs';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'hb-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  subscription1: Subscription;
  subscription2: Subscription;
  currency: any;
  bill: Bill;
  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subscription1 = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency("RUB")
    ).subscribe((data:[Bill, any]) =>{
      this.bill = data[0]; 
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  onRefresh(){
    this.isLoaded = false;
    this.subscription2 = this.billService.getCurrency("RUB")
      // .delay(2000)
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
        // console.log(currency.rates);
      });
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
    if(this.subscription2)
    this.subscription2.unsubscribe();
  }

}
