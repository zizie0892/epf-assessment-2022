import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs'
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Location } from './Location';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private api = 'https://secure.kwsp.gov.my/m2/postBranchLocation';
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getLocation(): Observable<any> {
    return this.http.post(this.api, {"ios":"100", "lan":"EN","ver":"100"}, this.httpOptions)
    .pipe(
      catchError(this.handleError<Location[]>('getLocation', []))
    );
  }

}
