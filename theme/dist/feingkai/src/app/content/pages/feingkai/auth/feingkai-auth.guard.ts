import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {FeingkaiAuthService} from "./feingkai-auth.service";

@Injectable({
  providedIn: 'root'
})
export class FeingkaiAuthGuard implements CanActivate {
  constructor(private authService: FeingkaiAuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('FeingkaiAuthGuard#canActivate called');
    let url: string = state.url;
    console.log("logged in", this.authService.isLoggedIn);
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/feingkai/login']);
    return false;
  }
}
