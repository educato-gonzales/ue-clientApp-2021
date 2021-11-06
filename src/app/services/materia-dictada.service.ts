import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MateriaDictada } from '../models/materiaDictada';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class MateriaDictadaService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/materiaDictada/';
   }

   getMateriaDictada(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getMateriaDictadas(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveMateriaDictada(materiaDictada): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(materiaDictada), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateMateriaDictada(materiaDictadaId: number, materiaDictada): Observable<MateriaDictada>{
    return this.http.put<MateriaDictada>(this.myAppUrl + this.myApiUrl + materiaDictadaId, JSON.stringify(materiaDictada), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteMateriaDictada(materiaDictadaId: number): Observable<MateriaDictada>{
    return this.http.delete<MateriaDictada>(this.myAppUrl + this.myApiUrl + materiaDictadaId)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  getIdProfesor(encontrado: number, ide: number ): Observable<Response>{
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl +  `${encontrado}/${ide}`);
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

  getBuscar(idProfesor: string): Observable<Response>{
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl + idProfesor );
   }

}