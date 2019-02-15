import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
    declarations:
        [
            LoginComponent,
            RegistrationComponent,
            AuthenticationComponent
        ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule
    ]
})
export class AuthenticationModule{}