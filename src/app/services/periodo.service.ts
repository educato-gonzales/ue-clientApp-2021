import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Periodo } from '../models/periodo';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/periodo/';
   }

   getPeriodo(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getPeriodos(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  savePeriodo(periodo): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(periodo), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updatePeriodo(periodoId: number, periodo): Observable<Periodo>{
    return this.http.put<Periodo>(this.myAppUrl + this.myApiUrl + periodoId, JSON.stringify(periodo), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deletePeriodo(periodoId: number): Observable<Periodo>{
    return this.http.delete<Periodo>(this.myAppUrl + this.myApiUrl + periodoId)
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