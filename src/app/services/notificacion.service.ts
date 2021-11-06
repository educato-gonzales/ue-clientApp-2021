import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Notificacion } from '../models/notificacion';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/notificacion/';
   }

   getNotificacion(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getNotificaciones(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveNotificacion(notificacion): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(notificacion), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateNotificacion(notificacionId: number, notificacion): Observable<Notificacion>{
    return this.http.put<Notificacion>(this.myAppUrl + this.myApiUrl + notificacionId, JSON.stringify(notificacion), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteNotificacion(notificacionId: number): Observable<Notificacion>{
    return this.http.delete<Notificacion>(this.myAppUrl + this.myApiUrl + notificacionId)
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

