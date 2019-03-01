import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesServise } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'hb-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent{

  @Output() onCtegoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesServise) { }

  onSubmit(form:NgForm){
  const {name, capacity} = form.value;
  if(capacity < 0) capacity * -1;

  let category = new Category(name, capacity);  

  this.categoriesService.addCategory(category).subscribe((category: Category) => {
    form.reset();
    form.form.patchValue({capacity: 1});
    this.onCtegoryAdd.emit(category);
  });
}
}