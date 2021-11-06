import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Representante } from '../models/representante';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/representante/';
   }

   getRepresentante(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getRepresentantes(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveRepresentante(representante): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(representante), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateRepresentante(representanteId: number, representante): Observable<Representante>{
    return this.http.put<Representante>(this.myAppUrl + this.myApiUrl + representanteId, JSON.stringify(representante), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteRepresentante(representanteId: number): Observable<Representante>{
    return this.http.delete<Representante>(this.myAppUrl + this.myApiUrl + representanteId)
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

  //Buscar datos para RUDE
  getRepresentanteBuscar(Id: number, idBuscar: number): Observable<Response>{
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id + '/' + idBuscar );
  }

  //Buscar representante por CI
  getBuscar(cedulaIdentidad: string): Observable<Response>{
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl + cedulaIdentidad );
  }

}
