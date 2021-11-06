import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Fotos } from '../models/fotos';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/fotos/';
   }

   getFoto(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getFotos(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveFoto(foto): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(foto), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateFoto(fotoId: number, foto): Observable<Fotos>{
    return this.http.put<Fotos>(this.myAppUrl + this.myApiUrl + fotoId, JSON.stringify(foto), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deletFoto(fotoId: number): Observable<Fotos>{
    return this.http.delete<Fotos>(this.myAppUrl + this.myApiUrl + fotoId)
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