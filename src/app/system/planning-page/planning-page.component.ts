import { HBEvent } from './../shared/models/event.model';
import { Bill } from './../shared/models/bill.model';
import { BillService } from './../shared/services/bill.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesServise } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Observable } from 'rxjs/Observable';
import { Category } from '../shared/models/category.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'hb-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: HBEvent[] = [];
  subscription1: Subscription;


  constructor(private billService: BillService,
              private categoriesService: CategoriesServise,
              private eventsService: EventsService) { }

  ngOnInit() {
    this.subscription1 = Observable.combineLatest(
          this.billService.getBill(),
          this.categoriesService.getCategories(),
          this.eventsService.getEvents())
          .subscribe((data: [ Bill, Category[], HBEvent[] ]) => {
             this.bill = data[0];
             this.categories = data[1];
             this.events = data[2];

            this.isLoaded = true;
      });
  }

  getCategoryCost(cat:Category): number{
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return  catEvents.reduce((total, e) => {
        total += e.amount;
        return total;
    }, 0);
  }

  private getPercent(cat: Category): number{
    const  percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string{
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string{
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

ngOnDestroy()  {
  if (this.subscription1)
  this.subscription1.unsubscribe();
}

}
