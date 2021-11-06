import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Calificacion } from '../models/calificacion';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/calificacion/';
   }

   getCalificacion(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getCalificaciones(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveCalificacion(calificacion): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(calificacion), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateCalificacion(calificacionId: number, calificacion): Observable<Calificacion>{
    return this.http.put<Calificacion>(this.myAppUrl + this.myApiUrl + calificacionId, JSON.stringify(calificacion), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteCalificacion(calificacionId: number): Observable<Calificacion>{
    return this.http.delete<Calificacion>(this.myAppUrl + this.myApiUrl + calificacionId)
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