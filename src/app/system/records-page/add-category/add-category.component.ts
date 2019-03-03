import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CategoriesServise } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'hb-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy{

  subscription: Subscription;

  @Output() onCtegoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesServise) { }

  onSubmit(form:NgForm){
  let {name, capacity} = form.value;
  if(capacity < 0) capacity *= -1;

  let category = new Category(name, capacity);  

  this.subscription = this.categoriesService.addCategory(category)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCtegoryAdd.emit(category);
      });
  }
  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
  }
}
