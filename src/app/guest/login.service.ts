import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ServerService } from '../server.service';

@Injectable()
export class LoginService {

	login: string;	
	password: string;
	message: string;

	constructor(private server: ServerService,
		private router: Router) { }

	doLogin() {
		this.server.login(this.login, this.password)
		.subscribe(data => {
			console.log( data );
			if (data.success === true) {
				this.router.navigate(['lobby']);
			}
			this.message = data.message;
		});
	}
}
