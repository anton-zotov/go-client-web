import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServerService } from './server.service';
import { GuestModule } from './guest/guest.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LobbyComponent } from './lobby/lobby.component';
import { CabinetLayoutComponent } from './cabinet-layout/cabinet-layout.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameComponent } from './game/game.component';
import { AuthGuardService } from './auth-guard.service';
import { ChatComponent } from './chat/chat.component'


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LobbyComponent,
    CabinetLayoutComponent,
    GamesListComponent,
    GameComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GuestModule,
    FormsModule
  ],
  providers: [ServerService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
