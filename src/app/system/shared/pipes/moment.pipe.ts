import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment'
 @Pipe({
     name: 'hbMoment'
 })
 export class MomentPipe implements PipeTransform{
     transform(value: string, formatFrom:string, formatTo:string = 'DD.MM.YY'): string{
         return moment(value, formatFrom).format(formatTo);
     }
 }