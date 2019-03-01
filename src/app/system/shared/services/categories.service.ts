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
}