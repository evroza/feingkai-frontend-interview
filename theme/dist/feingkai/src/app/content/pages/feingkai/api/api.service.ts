import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Currencies} from "../interfaces/currencies-interface";
import { Market} from "../components/markets/markets.component";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseAPI: string = 'https://peatio-dev.feingkai.com/api/v2/';

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<Currencies[]>{
    return this.http.get<Currencies[]>(this.baseAPI + "currencies")
                .pipe(
                  catchError(this.handleError)
                );
  }

  getMarkets(): Observable<Market[]>{
    return this.http.get<Market[]>(this.baseAPI + 'markets')
        .pipe(
            catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
