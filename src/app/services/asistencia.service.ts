import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Asistencia } from '../models/asistencia';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/asistencia/';
   }

   getAsistencia(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
   }
   
   getAsistencias(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
   }

   saveAsistencia(asistencia): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(asistencia), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
    }

  updateAsistencia(asistenciaId: number, asistencia): Observable<Asistencia>{
    return this.http.put<Asistencia>(this.myAppUrl + this.myApiUrl + asistenciaId, JSON.stringify(asistencia), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteAsistencia(asistenciaId: number): Observable<Asistencia>{
    return this.http.delete<Asistencia>(this.myAppUrl + this.myApiUrl + asistenciaId)
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
