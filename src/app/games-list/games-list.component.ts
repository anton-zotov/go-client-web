import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  @Input() active: boolean;
  games$;

  constructor(public server: ServerService,
    private router: Router) { }

  ngOnInit() {
    console.log("init games list");
    
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let prop in changes) {
			if (prop === "active") {
				this.games$ = this.server.getGames(this.active);
			}
		}
  }

  openGame(id_game) {
    this.router.navigate(['game', id_game]);
  }
}
