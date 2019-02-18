import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:
        [
            LoginComponent,
            RegistrationComponent,
            AuthenticationComponent
        ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        SharedModule
    ]
})
export class AuthenticationModule{}