import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { HBEvent } from '../../shared/models/event.model';
import * as moment from 'moment';



@Component({
  selector: 'hb-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  types = [
    {type:"income", label: "Einnahmen"},
    {type:"outcome", label: "Ausgaben"}
  ]

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    // console.log(form.value);
    let {amount, description,category, type} = form.value;
    if(amount < 0) amount *= -1;

    const event = new HBEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'),description);
  }

}
