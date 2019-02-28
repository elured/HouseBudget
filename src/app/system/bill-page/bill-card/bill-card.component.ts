import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'hb-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;
  euro: number;
  rubel: number;

  constructor() { }

  ngOnInit() {
    // console.log(this.currency);
    const { rates } = this.currency;
    
    // console.log(rates);
    this.dollar = rates['USD']* this.bill.value;
    // console.log(this.dollar);
    this.euro = rates['EUR'] * this.bill.value;
    // console.log(this.euro);
    this.rubel = rates['RUB'];
    // console.log(this.rubel);
    
    
  }

}
