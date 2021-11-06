import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Parametro } from '../models/parametro';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/parametro/';
   }

   getParametro(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getParametros(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveParametro(parametro): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(parametro), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateParametro(parametroId: number, parametro): Observable<Parametro>{
    return this.http.put<Parametro>(this.myAppUrl + this.myApiUrl + parametroId, JSON.stringify(parametro), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteParametro(parametroId: number): Observable<Parametro>{
    return this.http.delete<Parametro>(this.myAppUrl + this.myApiUrl + parametroId)
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