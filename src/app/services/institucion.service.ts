import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Institucion } from '../models/institucion';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/institucion/';
   }

   getInstitucion(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getInstituciones(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveInstitucion(institucion): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(institucion), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateInstitucion(institucionId: number, institucion): Observable<Institucion>{
    return this.http.put<Institucion>(this.myAppUrl + this.myApiUrl + institucionId, JSON.stringify(institucion), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteInstitucion(institucionId: number): Observable<Institucion>{
    return this.http.delete<Institucion>(this.myAppUrl + this.myApiUrl + institucionId)
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