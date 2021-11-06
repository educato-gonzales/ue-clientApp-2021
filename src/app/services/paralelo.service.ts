import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Paralelo } from '../models/paralelo';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ParaleloService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/paralelo/';
   }

   getParalelo(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getParalelos(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveParalelo(paralelo): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(paralelo), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateParalelo(paraleloId: number, paralelo): Observable<Paralelo>{
    return this.http.put<Paralelo>(this.myAppUrl + this.myApiUrl + paraleloId, JSON.stringify(paralelo), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteParalelo(paraleloId: number): Observable<Paralelo>{
    return this.http.delete<Paralelo>(this.myAppUrl + this.myApiUrl + paraleloId)
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