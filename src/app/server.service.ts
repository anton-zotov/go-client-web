import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs/Rx'

import { Message } from './chat/chat.component';

const server = '127.0.0.1'; //207.154.195.39
const port = '61366';

@Injectable()
export class ServerService {

	private serverUrl = 'http://' + server + ':' + port + '/';
	private token;

	constructor(private http: HttpClient) { 
		this.token = localStorage.getItem("token");
	}

	isLoggedIn() {
		return this.token ? true : false;
	}

	login(login, password) {
		let passwordHash = CryptoJS.SHA1(password).toString();
		return this.http.post<{success, token, message}>(this.serverUrl + 'login', {
			"login": login, "password": passwordHash
		})
		.map( res => {
			this.setToken(res.token);
			return {success: res.success, message: res.message};
		})
		.catch( err => Observable.of( {success: false, message: "Unable to connect to server"} ) );
	}

	setToken(token) {
		this.token = token;
		localStorage.setItem("token", this.token);
	}

	getGames(active: boolean) {
		return this.http.post<{success, games}>(this.serverUrl + 'getgames', {
			"token": this.token, "active": active
		})
		.filter( res => res.success )
		.map( res => res.games )
	}

	newGame(fieldSize: number) {
		return this.http.post<{success, id_game}>(this.serverUrl + 'newgame', {
			token: this.token, field_size: fieldSize
		})
		.catch( err => Observable.of( {success: false, id_game: null} ) );
	}

	joinGame(invite) {
		return this.http.post<{success, id_game}>(this.serverUrl + 'joininvite', {
			token: this.token, invite: invite
		})
		.catch( err => Observable.of( {success: false, id_game: null} ) );
	}

	loadGame(id_game: number) {
		return this.http.post<{success, game_data, timestamp}>(this.serverUrl + 'gamedata', {
			token: this.token, id_game: id_game
		})
		.catch( err => Observable.of( {success: false, game_data: null, timestamp: 0} ) );
	}

	logout() {
		this.setToken("");
	}

	putStone(id_game, x, y) {
		return this.http.post<{success, token, message}>(this.serverUrl + 'putstone', {
			token: this.token, id_game: id_game, x: x, y: y
		})
	}

	gameUpdate(id_game, last_update) {
		console.log("gameUpdate", last_update);
		return this.http.post<{success, events, timestamp}>(this.serverUrl + 'gameupdate', {
			token: this.token, id_game: id_game, last_update: last_update
		});
	}

	skipTurn(id_game) {
		return this.http.post(this.serverUrl + 'pass', {
			token: this.token, id_game: id_game
		});
	}

	sendMessage(id_game, message) {
		return this.http.post<{success, message: Message}>(this.serverUrl + 'message', {
			token: this.token, id_game: id_game, message: message
		});
	}

	getMessage(id_game) {
		return this.http.post<{success, messages: Message[]}>(this.serverUrl + 'getmessages', {
			token: this.token, id_game: id_game
		});
	}

	getGameStateByTurn(id_game, turn) {
		return this.http.post<{success, game_data}>(this.serverUrl + 'gethistory', {
			token: this.token, id_game: id_game, turn: turn
		});
	}
}
