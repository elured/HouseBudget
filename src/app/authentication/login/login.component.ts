import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/shared/services/authentification.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
      private router: Router,
      private route: ActivatedRoute
  ) { 
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    
    this.route.queryParams.subscribe((params: Params) => {
                                    if(params['nowCanLoggin']){
                                      this.showMessage({text: "Jetzt können Sie sich anmelden", type: "success"});
                                    }else if( params['accessDenied']){
                                      this.showMessage({
                                        text: 'Sie müssen sich anmelden',
                                        type: 'warning'
                                      });
                                    }
                                  });
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message){
    this.message = message;
    window.setTimeout(() => {
      this.message.text = ''
    }, 5000);
  }

  onSubmit(){
    const formData = this.form.value;
    this.usersServer.getUserByEmail(formData.email).subscribe((user: User) => {
      if(user){
        if(user.password === formData.password){
          this.message.text = '';
          window.localStorage.setItem('user',JSON.stringify(user));
          this.authentificationService.login();
           this.router.navigate(['/system', 'bill']);
        }else{
          this.showMessage({text: 'Passwort ist falsch', type: 'danger'});
        }
      }else{
        this.showMessage({text: 'Es existiert kein Benutzer mit dieser Email', type: 'danger'});
      }
    });
  }
}
