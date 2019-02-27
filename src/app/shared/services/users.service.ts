import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApi } from '../core/base-api';

@Injectable()   
export class UsersService extends BaseApi{
    baseUsersUrl:string = "http://localhost:3000/users";
    constructor(public http: HttpClient ){
        super(http);
    }

    // getUserByEmail(email:string): Observable<User>{
    //     return this.http.get<User[]>(this.baseUsersUrl + '?email=' + email)
    //             .map((user: User[]) => user[0] ? user[0] : undefined);
    // }
    getUserByEmail(email:string): Observable<User>{
        return this.get(`users?email=${email}`).map((user: User[]) => user[0] ? user[0] : undefined);
    }

    createNewUser(user: User): Observable<User>{
        return this.http.post<User>(this.baseUsersUrl, user);
    }

    // createNewUser(user: User): Observable<User>{
    //     console.log(user);
    //     return this.post('users', user);
    // }
}