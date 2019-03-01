import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CategoriesServise } from '../shared/services/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'hb-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {
 
  categories: any;//ist ein Array
  isLoaded = false;
  constructor(private categoriesService: CategoriesServise) { }

  ngOnInit() {
    this.categoriesService.getCategories()
        .subscribe((categories: Category) => {
          this.categories = categories;
          this.isLoaded = true;
        
        });
  }

  newCtegoryAdded(category: Category){
    this.categories.push(category);
  }

  categoryWasEdited(category: Category){
    // console.log("CategoriesServise");
    // const idx = this.categories[category.id];
                //.findIndex(c => c.id === category.id);
    this.categories[category.id] = category;
    console.log(this.categories[category.id]);
  }
}
