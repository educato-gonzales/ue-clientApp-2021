import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Horario } from '../models/horario';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/horario/';
  }

  getHorario(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
   }
   
   getHorarios(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
   }

   saveHorario(horario): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(horario), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
    }

  updateHorario(horarioId: number, horario): Observable<Horario>{
    return this.http.put<Horario>(this.myAppUrl + this.myApiUrl + horarioId, JSON.stringify(horario), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteHorario(horarioId: number): Observable<Horario>{
    return this.http.delete<Horario>(this.myAppUrl + this.myApiUrl + horarioId)
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
