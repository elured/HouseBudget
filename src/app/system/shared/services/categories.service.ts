import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApi } from 'src/app/shared/core/base-api';
import { Category } from '../models/category.model';
import { post } from 'selenium-webdriver/http';

@Injectable()
export class CategoriesServise extends BaseApi{
    constructor(public httpClient: HttpClient){
        super(httpClient);
    }

    addCategory(category: Category):Observable<Category>{
        return this.post('categories', category);
    }

    getCategories(): Observable<Category[]>{
        return this.get('categories')
    }

    updateCategory(category: Category): Observable<Category>{
        return this.put(`categories/${category.id}`, category);
    }

    getCategoryById(id: number): Observable<Category>{
        return this.get(`categories/${id}`);
    }
}