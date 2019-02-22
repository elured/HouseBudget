import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/shared/services/authentification.service';
import { Router } from '@angular/router';
import { HttpClient } from  "@angular/common/http";
import { Observable } from  "rxjs/Observable";
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'hb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userObservable: Observable<User>;
  
  form: FormGroup;
  message: Message;

  constructor(
      private usersServer: UsersService, 
      private authentificationService: AuthentificationService,
      private router: Router
  ) { 
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(text: string, type: string = "danger"){
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = ''
    }, 5000);
  }

  onSubmit(){
    const formData = this.form.value;
    // this.userObservable = this.httpClient.get<User[]>("http://localhost:3000/users");
    // this.userObservable = 
    this.usersServer.getUserByEmail(formData.email).subscribe((user: User) => {
      if(user){
        if(user.password === formData.password){
          console.log(user);
          this.message.text = '';
          window.localStorage.setItem('user',JSON.stringify(user));
          this.authentificationService.login();
          // this.router.navigate(['']);
        }else{
          this.showMessage('Passwort ist falsch')
        }
      }else{
        this.showMessage('Es existiert kein Benutzer mit dieser Email');
      }
    });
     //console.log(this.userObservable)
    //this.usersServer.getUserByEmail(formData.email).subscribe();
    // console.log(this.form);
  }
}
