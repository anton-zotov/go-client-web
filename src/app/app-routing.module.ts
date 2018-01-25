import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LobbyComponent } from './lobby/lobby.component';
import { CabinetLayoutComponent } from './cabinet-layout/cabinet-layout.component';
import { GameComponent } from './game/game.component';
import { AuthGuardService } from './auth-guard.service';

const routes = [
  { path: '', redirectTo: 'login', 'pathMatch': 'full'},
  { path: '',
    component: CabinetLayoutComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      { path: 'lobby', component: LobbyComponent },
      { path: 'lobby/:history', component: LobbyComponent },
      { path: 'game/:id', component: GameComponent }
    ]
  },
  //{ path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
