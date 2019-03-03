import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';

import { Category } from '../../shared/models/category.model';
import { HBEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from 'src/app/shared/models/message.model';



@Component({
  selector: 'hb-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  types = [
    {type:"income", label: "Einnahmen"},
    {type:"outcome", label: "Ausgaben"}
  ]
  message: Message;
  subscription1:Subscription;
  subscription2:Subscription;

  constructor(private eventsService: EventsService,
              private billService: BillService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string){
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);

  }

  onSubmit(form: NgForm){
    // console.log(form.value);
    let {amount, description,category, type} = form.value;
    if(amount < 0) amount *= -1;

    const hbEvent = new HBEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'),description);

    this.subscription1 = this.billService.getBill()
      .subscribe((bill:Bill) => {
        let value = 0;
        if(type === 'outcome'){
          if(amount > bill.value){
            this.showMessage(`Sie haben nicht genug Geld. Sie brauchen noch ${amount - bill.value}`); 
            return;
          }else{
            value = bill.value - amount;
            console.log("bill.value is " + bill.value + "; amount is: " + amount + "; value is: " + value);
          }
        }else{
          value = bill.value + amount;
        }
        let newBill = new Bill(value, bill.currency);
        this.subscription1 = this.billService.updateBill(newBill)
            .mergeMap(() => this.eventsService.addEvent(hbEvent))
            .subscribe(() => {
              form.setValue({
                  amount: 0,
                  description: ' ',
                  category: 1,
                  type: 'outcome'
              });
            });
        // this.billService.updateBill({value, currency:bill.currency});
      });
    
    // this.eventsService.addEvent(hbEvent);
  }
ngOnDestroy(){
  if(this.subscription1) this.subscription1.unsubscribe();
  if(this.subscription2) this.subscription2.unsubscribe();
}
}
