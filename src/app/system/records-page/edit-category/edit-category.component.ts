import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesServise } from '../../shared/services/categories.service';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'hb-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  subscription: Subscription;
  currentCategoryId = 1;
  currentCategory: Category;
  message:Message;

  constructor(private categoriesService: CategoriesServise) { }

  ngOnInit() {
    this.message =new Message('success', '');
    this.onCategoryChange();
  }

  onCategoryChange(){
    this.currentCategory = this.categories[this.currentCategoryId - 1];//.find(i => i.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm){
    let {capacity, name} = form.value;
    if(capacity < 0) capacity *= -1;

    const category = new Category(name, capacity, +this.currentCategoryId);
    this.subscription = this.categoriesService.updateCategory(category)
        .subscribe((newCategory: Category) => {
          this.onCategoryEdit.emit(newCategory);
          this.message.text = 'Kategorie wurde erfolgreich editiert'; 
          window.setTimeout(() => this.message.text = '', 5000);
        });
  }
  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe()
  }
}
