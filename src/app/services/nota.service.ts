import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Nota } from '../models/nota';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/nota/';
   }

   getNota(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getNotas(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveNota(nota): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(nota), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateNota(notaId: number, nota): Observable<Nota>{
    return this.http.put<Nota>(this.myAppUrl + this.myApiUrl + notaId, JSON.stringify(nota), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteNota(notaId: number): Observable<Nota>{
    return this.http.delete<Nota>(this.myAppUrl + this.myApiUrl + notaId)
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