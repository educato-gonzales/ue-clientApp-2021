import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/rol/';
   }

   getRol(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
   }
   
   getRoles(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
   }

   saveRol(rol): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(rol), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
    }

  updateRol(rolId: number, rol): Observable<Rol>{
    return this.http.put<Rol>(this.myAppUrl + this.myApiUrl + rolId, JSON.stringify(rol), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteRol(rolId: number): Observable<Rol>{
    return this.http.delete<Rol>(this.myAppUrl + this.myApiUrl + rolId)
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
