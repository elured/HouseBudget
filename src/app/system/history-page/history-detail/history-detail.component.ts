import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import { CategoriesServise } from '../../shared/services/categories.service';
import { HBEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hb-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
event: HBEvent;
category: Category;
isLoaded;
subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private categoriesService: CategoriesServise) { }

  ngOnInit() {
    this.subscription = this.route.params.
        mergeMap((params: Params ) => this.eventsService.getEventById(params['id'])).
        mergeMap((event: HBEvent) => {
          this.event = event;
          return this.categoriesService.getCategoryById(event.category);
        }).
        subscribe((category: Category) => {
          this.category = category;
          this.isLoaded = true;
        });
  }
ngOnDestroy(){
  if(this.subscription)
  this.subscription.unsubscribe();
}
}
