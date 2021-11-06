import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Materia } from '../models/materia';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/materia/';
   }

   getMateria(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getMaterias(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveMateria(materia): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(materia), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateMateria(materiaId: number, materia): Observable<Materia>{
    return this.http.put<Materia>(this.myAppUrl + this.myApiUrl + materiaId, JSON.stringify(materia), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteMateria(materiaId: number): Observable<Materia>{
    return this.http.delete<Materia>(this.myAppUrl + this.myApiUrl + materiaId)
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