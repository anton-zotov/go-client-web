import { Injectable } from '@angular/core';
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild } from '@angular/router';
import { ServerService } from './server.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private server: ServerService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.server.isLoggedIn())
      return true;

    this.router.navigate(['/login']);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
