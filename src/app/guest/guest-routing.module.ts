import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuardService } from './login-guard.service';

const routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    canActivate: [LoginGuardService],
    canActivateChild: [LoginGuardService],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GuestRoutingModule { }
