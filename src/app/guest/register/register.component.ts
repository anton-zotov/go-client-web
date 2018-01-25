import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public loginServise: LoginService) { }

  ngOnInit() {
  }

  onSubmit(e) {
    e.preventDefault();
    // if (this.loginServise.login && this.loginServise.password)
    //   this.server.login(this.loginServise.login, this.loginServise.password)
    //   .then(console.log);
    return false;
  }
}
