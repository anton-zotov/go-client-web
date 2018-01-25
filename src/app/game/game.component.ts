import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

	@ViewChild('fieldLayout') fieldLayout;

	id_game: number;
	field_size: number = 0;
	field: string = "";
	my_turn: boolean = false;
	is_game_over: boolean = false;
	color: string;
	last_update = 0;
	invite;
	layout_size = 0;
	new_message = null;
	turn_number = 0;
	shown_turn_number = 0;
	polling_observable = null;

	constructor(private route: ActivatedRoute,
		private server: ServerService) { }

	ngOnInit() {
		document.querySelector('body').classList.add('game-open');
		this.id_game = +this.route.snapshot.paramMap.get('id');
		this.loadGame();
	}

	ngAfterViewInit() {
		setTimeout( () => this.updateFieldSize(), 0 );
		window.addEventListener('resize', () => this.updateFieldSize());
	}

	ngOnDestroy() {
		if (this.polling_observable) {
			this.polling_observable.unsubscribe();
		}
		document.querySelector('body').classList.remove('game-open');
	}

	updateFieldSize() {
		let width = this.fieldLayout.nativeElement.clientWidth;
		let height = this.fieldLayout.nativeElement.clientHeight;
		this.layout_size = Math.min(width, height);
	}

	loadGame() {
		this.server.loadGame(this.id_game)
		.subscribe( res => {
			console.log("loadGame", res);
			if (res.success === true) {
				this.field_size = res.game_data.field_size;
				this.field = res.game_data.field;
				this.my_turn = res.game_data.your_turn;
				this.color = res.game_data.color;
				this.is_game_over = res.game_data.game_over;
				this.invite = res.game_data.invite;
				this.shown_turn_number = this.turn_number = res.game_data.turn_number;
				this.last_update = res.timestamp;
				this.poll();
			}
		});
	}

	onCellClick(index: number) {
		if (!this.my_turn) return;
		if (this.turn_number != this.shown_turn_number) {
			// Add a notification that user watches history
			this.shown_turn_number = this.turn_number;
			this.getGameField();
			return;
		}
		if (!(['0', 'h', 'l'].includes(this.field[index]))) {
		}

		if (this.field[index] == '0') {
			this.field = this.field.replace(this.color[1], '0');
			this.setCellColor(index, this.color[1]);
			return;
		}

		let [x, y] = this.getCoordsByIndex(index);
		this.server.putStone(this.id_game, x, y)
		.subscribe( res => {
			if (res.success === true) {
				this.my_turn = false;
				this.resetMarkedStone();
				this.setCellColor(index, this.color.toUpperCase());
			}
		})
	}

	resetMarkedStone() {
		this.field = this.field.toLowerCase();
	}

	setCellColor(index, color) {
		this.field = this.field.substr(0, index) + color[0] + this.field.substr(index + 1);
	}

	getCoordsByIndex(index) {
		let x = index % this.field_size;
		let y = Math.floor(index / this.field_size);
		return [x, y]
	}

	getIndexByCoodrs(x, y) {
		return y * this.field_size + x;
	}

	poll() {
		this.polling_observable = 
		this.server.gameUpdate(this.id_game, this.last_update)
		.subscribe( res => {
			if (res.success === true) {
				this.processEvents(res.events);
				this.last_update = res.timestamp;
			}
			console.log(res);
			this.poll();
		}, 
		err => {
			console.log("err", err);
			this.poll();
		})
	}

	processEvents(events: Array<{type, data}>) {
		for (let event of events) {
			if (event.type == 'put') {
				if (this.turn_number == this.shown_turn_number) {
					let [x, y, color] = event['data']
					this.resetMarkedStone();
					this.setCellColor(this.getIndexByCoodrs(x, y), color.toUpperCase());
				}
			}
			if (event.type == 'your_turn') {
				this.my_turn = true;
				this.invite = null;
			}
			if (event.type == 'die') {
				let [x, y] = event['data']
				this.setCellColor(this.getIndexByCoodrs(x, y), '0');
			}
			if (event.type == 'game_over') {
				let [field, scores] = event['data']
				this.field = field
				this.is_game_over = true
			}
			if (event.type == 'message') {
				this.new_message = event.data;
			}
			if (event.type == 'turn_number') {
				if (this.shown_turn_number == this.turn_number)
					this.shown_turn_number = event.data;
				this.turn_number = event.data;
			}
			if (event.type == 'pass') {
				this.resetMarkedStone();
			}
		}
	}

	skipTurn() {
		this.server.skipTurn(this.id_game)
		.subscribe( res=> {
			this.resetMarkedStone();
			this.my_turn = false;
		});
	}

	getBorderClass(index) {
		let [x, y] = this.getCoordsByIndex(index);
		let cellClass = [];
		if (x == 0 || y == 0) 
			return true;
	}

	prevTurn() {
		this.shown_turn_number--;
		this.getGameField();
	}

	nextTurn() {
		this.shown_turn_number++;
		this.getGameField();
	}

	getGameField() {
		this.server.getGameStateByTurn(this.id_game, this.shown_turn_number)
		.subscribe( res => {
			if (res.success) {
				this.field = res.game_data.field;
			}
		});
	}

	gameStarted() {
		return !this.invite;
	}
}
