import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Estudiante } from '../models/estudiante';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/estudiante/';
   }

   getEstudiante(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }

   getEstudiantes(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveEstudiante(estudiante): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(estudiante), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateEstudiante(estudianteId: number, estudiante): Observable<Estudiante>{
    return this.http.put<Estudiante>(this.myAppUrl + this.myApiUrl + estudianteId, JSON.stringify(estudiante), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteEstudiante(estudianteId: number): Observable<Estudiante>{
    return this.http.delete<Estudiante>(this.myAppUrl + this.myApiUrl + estudianteId)
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

  getBuscar(cedulaIdentidad: string): Observable<Response>{
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl + cedulaIdentidad );
   }
//Buscar datos para RUDE
   getEstudianteBuscar(Id: number, idBuscar: number): Observable<Response>{
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id + '/' + idBuscar );
   }

   

}

