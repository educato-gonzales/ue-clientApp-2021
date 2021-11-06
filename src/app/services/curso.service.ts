import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso';
import { Response } from '../models/response';  

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/curso/';
   }

   getCurso(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getCursos(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveCurso(curso): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(curso), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateCurso(cursoId: number, curso): Observable<Curso>{
    return this.http.put<Curso>(this.myAppUrl + this.myApiUrl + cursoId, JSON.stringify(curso), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteCurso(cursoId: number): Observable<Curso>{
    return this.http.delete<Curso>(this.myAppUrl + this.myApiUrl + cursoId)
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

