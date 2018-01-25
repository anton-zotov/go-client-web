import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './login.service';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { GuestRoutingModule } from './guest-routing.module';
import { LoginGuardService } from './login-guard.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GuestRoutingModule
  ],
  exports: [],
  providers: [
    LoginService,
    LoginGuardService
  ]
})
export class GuestModule { }
