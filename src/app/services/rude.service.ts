import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Rude } from '../models/rude';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class RudeService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/rude/';
   }

   getRude(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getRudes(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveRude(rude): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(rude), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateRude(rudeId: number, rude): Observable<Rude>{
    return this.http.put<Rude>(this.myAppUrl + this.myApiUrl + rudeId, JSON.stringify(rude), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteRude(rudeId: number): Observable<Rude>{
    return this.http.delete<Rude>(this.myAppUrl + this.myApiUrl + rudeId)
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

  getBuscar(codRude: string): Observable<Response>{
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl + codRude );
   }


}
