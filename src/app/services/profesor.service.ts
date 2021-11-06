import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Profesor } from '../models/profesor';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/profesor/';
   }

   getProfesor(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getProfesores(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveProfesor(profesor): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(profesor), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateProfesor(profesorId: number, profesor): Observable<Profesor>{
    return this.http.put<Profesor>(this.myAppUrl + this.myApiUrl + profesorId, JSON.stringify(profesor), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteProfesor(profesorId: number): Observable<Profesor>{
    return this.http.delete<Profesor>(this.myAppUrl + this.myApiUrl + profesorId)
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
  
  //Buscar profesor por CI
  getBuscar(cedulaIdentidad: string): Observable<Response>{
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl + cedulaIdentidad );
   }

}