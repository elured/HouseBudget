import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from './authentification.service';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthentificationGuard implements CanActivate, CanActivateChild{
    constructor(private athentificationServise: AuthentificationService, private router: Router){ }
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;
    
    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{
        if(this.athentificationServise.isLoggedIn()){
            return true;
        }else{
            this.router.navigate(['/login'], {
                queryParams:{
                    accessDenied: true
                }
            });
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return this.canActivateChild(childRoute, state);
    }

    
}