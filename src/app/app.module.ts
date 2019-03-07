import { AuthenticationModule } from './authentication/authentication.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxChartsModule } from '@swimlane/ngx-charts'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersService } from './shared/services/users.service';
import { AuthentificationService } from './shared/services/authentification.service';
import { SystemModule } from './system/system.module';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent
    // ,
    // BillPageComponent,
    // HistoryPageComponent,
    // PlanningPageComponent,
    // RecordsPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    AppRoutingModule,
    SystemModule,
    BrowserAnimationsModule
    
    // , 
    // AppRoutingModule
  ],
  providers: [UsersService, AuthentificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
