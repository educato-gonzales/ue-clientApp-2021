import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Autoevaluacion } from '../models/autoevaluacion';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AutoevaluacionService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/autoevaluacion/';
   }

   getAutoevaluacion(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getAutoevaluaciones(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveAutoevaluacion(autoevaluacion): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(autoevaluacion), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateAutoevaluacion(autoevaluacionId: number, autoevaluacion): Observable<Autoevaluacion>{
    return this.http.put<Autoevaluacion>(this.myAppUrl + this.myApiUrl + autoevaluacionId, JSON.stringify(autoevaluacion), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteAutoevaluacion(autoevaluacionId: number): Observable<Autoevaluacion>{
    return this.http.delete<Autoevaluacion>(this.myAppUrl + this.myApiUrl + autoevaluacionId)
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
  //Buscador 
  getBuscar(cedulaIdentidad: string): Observable<Response>{
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl + cedulaIdentidad );
   }

}

