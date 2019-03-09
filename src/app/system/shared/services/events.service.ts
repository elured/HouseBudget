import { BaseApi } from 'src/app/shared/core/base-api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HBEvent } from '../models/event.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventsService extends BaseApi{
    constructor(httpClient: HttpClient){
        super(httpClient);
    }

    addEvent(event:HBEvent): Observable<HBEvent>{
        return this.post("events", event);
    }

    getEvents(): Observable<HBEvent[]> {
        return this.get('events');
  }
    getEventById(id: string): Observable<HBEvent>{
        return this.get(`events/${id}`);
    }
}