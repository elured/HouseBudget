import { Component,  Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'hb-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent{

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [
    { type: 'd', label: 'Tag' },
    { type: 'w', label: 'Woche' }, 
    { type: 'M', label: 'Monat' }
  ];

  types = [
    { type: 'income', label: 'Einkommen' },
    { type: 'outcome', label: 'Ausgaben'}
  ];

  closeFilter(){
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.onFilterCancel.emit();
  }
  applyFilter(){
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }
  private calculateInputParams(field: string, checked: boolean, value: string){
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }

  handleChangeType({checked, value}){
    this.calculateInputParams('selectedTypes', checked, value);
    // debugger;
  }

  handleChangeCategory({ checked, value }) {
    this.calculateInputParams('selectedCategories', checked, value);
  }
}
