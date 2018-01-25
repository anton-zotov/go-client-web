import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginServise: LoginService) { }

  ngOnInit() {
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.loginServise.login && this.loginServise.password) {
      this.loginServise.doLogin();
    }
    return false;
  }

}
