import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class FeingkaiAuthService {
  isLoggedIn = true;
  apiTokenEndpoint = 'https://auth-dev.feingkai.com/oauth/token';
  clientId = '41d91e3e25141823f5dfdb1f0c7eab30d1b090378376a2477af129a05fda75cb';
  clientSecret = '557abd74218cbf5b83b9a589361dbcba5a4ea134dad61da9899860a48bd5f6a4';
  redirectUri = 'https://dev.feingkai.com/feingkai/login';

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient){

  }

  login(): Observable<boolean> {
    return of(true).pipe(
        delay(1000),
        tap(val => this.isLoggedIn = true)
    );
  }

  getJWT(code: string): Observable<object>{
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('client_id', this.clientId);
    body = body.set('client_secret', this.clientSecret);
    body = body.set('redirect_uri', this.redirectUri);
    body = body.set('grant_type', 'authorization_code');
    body = body.set('code', code);
    return this.http.post(this.apiTokenEndpoint, body, {headers: headers});
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}