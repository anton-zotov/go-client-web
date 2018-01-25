import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-lobby',
	templateUrl: './lobby.component.html',
	styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

	invite_code: string;
	fieldSizes = [9, 13, 19];
	fieldSize = this.fieldSizes[2];
	active_games_shown: boolean = true;ы

	constructor(private server: ServerService,
		private router: Router, private route: ActivatedRoute,
		private location: Location) { }

	ngOnInit() {
		this.active_games_shown = this.route.snapshot.params['history'] ? false : true;
	}

	newGame() {
		this.server.newGame(this.fieldSize)
		.subscribe( res => {
			if (res.success === true && res.id_game)
				this.router.navigate(['game', res.id_game]);
		});
	}

	joinGame() {
		this.server.joinGame(this.invite_code)
		.subscribe( res => {
			if (res.success === true && res.id_game)
				this.router.navigate(['game', res.id_game]);
		});
	}

	showActiveGames(show: boolean) {
		this.active_games_shown = show;
		let params = this.active_games_shown ? '' : '/history';
		this.location.go(`/lobby${params}`)
	}
}
