import { Component, OnInit, Input } from '@angular/core';
import { HBEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'hb-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: HBEvent[] = [];
  searchValue = "";
  saerchPlaceHolder = 'Summe';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id == e.category).name;  
    });
  }

  getEventClass(e: HBEvent){
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'};
  }

  changeCriteria(field: string){
    const namesMap = {
      amount: 'Summe',
      date: 'Datum',
      category: 'Kategory',
      type: 'Type'
    };
    this.saerchPlaceHolder = namesMap[field];
    this.searchField = field; 
  }
}
