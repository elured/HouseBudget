import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()   
export class UsersService{
    baseUsersUrl:string = "http://localhost:3000/users";
    constructor(private http: HttpClient ){}

    getUserByEmail(email:string): Observable<User>{
        return this.http.get<User[]>(this.baseUsersUrl + '?email=' + email)
                .map((user: User[]) => user[0] ? user[0] : undefined);//.map((response: Response) => response.json());//.map((user: User) => ;
    }
    createNewUser(user: User): Observable<User>{
        return this.http.post<User>(this.baseUsersUrl, user);
                //.map((response: Response) => response.json());
    }
}