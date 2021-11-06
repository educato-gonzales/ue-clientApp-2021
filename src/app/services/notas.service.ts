import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Notas } from '../models/notas';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/notas/';
   }

   getNotas(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getNotass(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveNotas(notas): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(notas), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateNotas(notasId: number, notas): Observable<Notas>{
    return this.http.put<Notas>(this.myAppUrl + this.myApiUrl + notasId, JSON.stringify(notas), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteNotas(notasId: number): Observable<Notas>{
    return this.http.delete<Notas>(this.myAppUrl + this.myApiUrl + notasId)
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