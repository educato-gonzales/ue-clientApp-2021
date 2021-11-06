import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Calendario } from '../models/calendario';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/calendario/';
  }

  getCalendario(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
   }
   
   getCalendarios(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
   }

   saveCalendario(calendario): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(calendario), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
    }

  updateCalendario(calendarioId: number, calendario): Observable<Calendario>{
    return this.http.put<Calendario>(this.myAppUrl + this.myApiUrl + calendarioId, JSON.stringify(calendario), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteCalendario(calendarioId: number): Observable<Calendario>{
    return this.http.delete<Calendario>(this.myAppUrl + this.myApiUrl + calendarioId)
    .pipe(retry(1),
    catchError(this.errorHandler));
    }

   errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //get error del lado cliente
      errorMessage = error.error.message;
    }else{
      //get error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }



}
