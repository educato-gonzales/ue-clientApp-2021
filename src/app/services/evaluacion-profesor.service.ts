import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EvaluacionProfesor } from '../models/evaluacionProfesor';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionProfesorService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/evaluacionProfesor/';
   }

   getEvaluacionProfesor(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getEvaluacionProfesores(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveEvaluacionProfesor(evaluacionProfesor): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(evaluacionProfesor), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateEvaluacionProfesor(evaluacionProfesorId: number, evaluacionProfesor): Observable<EvaluacionProfesor>{
    return this.http.put<EvaluacionProfesor>(this.myAppUrl + this.myApiUrl + evaluacionProfesorId, JSON.stringify(evaluacionProfesor), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteEvaluacionProfesor(evaluacionProfesorId: number): Observable<EvaluacionProfesor>{
    return this.http.delete<EvaluacionProfesor>(this.myAppUrl + this.myApiUrl + evaluacionProfesorId)
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

