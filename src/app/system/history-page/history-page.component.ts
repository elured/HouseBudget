import { EventsService } from './../shared/services/events.service';
import { CategoriesServise } from './../shared/services/categories.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Category } from '../shared/models/category.model';
import { HBEvent } from './../shared/models/event.model';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'hb-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(private categoriesServise:CategoriesServise,
              private eventsService: EventsService) { }
    isLoaded = false;
    subscription: Subscription;


    categories: Category[] = [];
    events: HBEvent[] = [];
    filteredEvents: HBEvent[] =[];
    chartData = [];

    isFilterVisible = false;

  ngOnInit() {
      this.subscription = Observable.combineLatest(
          this.categoriesServise.getCategories(),
          this.eventsService.getEvents()
      ).subscribe((data: [Category[], HBEvent[]]) =>{
          this.categories = data[0];
          this.events = data[1];

          this.setOriginalEvents();
          this.calculateChartData();

          this.isLoaded = true;
      });
  }

  private setOriginalEvents(){
    this.filteredEvents = this.events.slice();
  }
  
  calculateChartData(): void{
    this.chartData = [];

    this.categories.forEach((cat) =>{
      const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total; 
        }, 0)
      });
    });
  }

  private toggleFilterVisibility(direction){
    this.isFilterVisible = direction;
  }

  openFilter(){
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    const startPeriod  = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    console.log(filterData);
    this.filteredEvents = this.filteredEvents.filter((e) => {
      return filterData.types.indexOf(e.type) != -1;
    }).filter((e) => {
      return filterData.categories.indexOf(e.category.toString()) !== -1;
    }).filter((e) =>{
      const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
      return momentDate.isBetween(startPeriod, endPeriod); 
      this.calculateChartData(); 
    });
  }

  onFilterCancel(){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

ngOnDestroy(){
  if (this.subscription)
    this.subscription.unsubscribe();
}
}
