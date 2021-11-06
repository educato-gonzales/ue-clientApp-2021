import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EstudianteMateria } from '../models/estudianteMateria';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class EstudianteMateriaService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/estudianteMateria/';
   }

   getEstudianteMateria(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getEstudianteMaterias(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveEstudianteMateria(estudianteMateria): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(estudianteMateria), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateEstudianteMateria(estudianteId: number, estudianteMateria): Observable<EstudianteMateria>{
    return this.http.put<EstudianteMateria>(this.myAppUrl + this.myApiUrl + estudianteId, JSON.stringify(estudianteMateria), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteEstudianteMateria(estudianteId: number): Observable<EstudianteMateria>{
    return this.http.delete<EstudianteMateria>(this.myAppUrl + this.myApiUrl + estudianteId)
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

