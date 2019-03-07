import { EventsService } from './../shared/services/events.service';
import { CategoriesServise } from './../shared/services/categories.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Category } from '../shared/models/category.model';
import { HBEvent } from './../shared/models/event.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'hb-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(private categoriesServise:CategoriesServise,
              private eventsService: EventsService) { }
    isLoaded = false;

    categories: Category[] = [];
    events: HBEvent[] = [];
    subscription: Subscription;

    chartData = [];

  ngOnInit() {
      this.subscription = Observable.combineLatest(
          this.categoriesServise.getCategories(),
          this.eventsService.getEvents()
      ).subscribe((data: [Category[], HBEvent[]]) =>{
          this.categories = data[0];
          this.events = data[1];
          this.calculateChartData();
          this.isLoaded = true;
      });
  }
  
  calculateChartData(): void{
    this.chartData = [];

    this.categories.forEach((cat) =>{
      const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total; 
        }, 0)
      });
    });
  }

ngOnDestroy(){
  if (this.subscription)
    this.subscription.unsubscribe();
}
}
