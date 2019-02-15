import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'hb-authentication',
    templateUrl: './authentication.component.html'
})
export class AuthenticationComponent implements OnInit{
constructor(private router: Router){}

ngOnInit(){
    this.router.navigate(['/login']);
}
}