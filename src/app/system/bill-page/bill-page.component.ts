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
  subscription: Subscription;
  constructor(private billService: BillService) { }

  ngOnInit() {
    // console.log(this.billService.getBill());
    // console.log(this.billService.getCurrency());
    this.subscription = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data:[Bill, any]) =>{
      console.log(data);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
