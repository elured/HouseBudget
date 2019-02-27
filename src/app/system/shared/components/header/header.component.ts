import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/shared/models/user.model';
import { AuthentificationService } from 'src/app/shared/services/authentification.service';

@Component({
  selector: 'hb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  constructor(private authentificationsService: AuthentificationService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogout(){
    this.authentificationsService.logout();
    this.router.navigate(['/login'])
}
}
