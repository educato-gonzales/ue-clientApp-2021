import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Administrador } from '../models/administrador';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/administrador/';
   }

   getAdministrador(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getAdministradores(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveAdministrador(administrador): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(administrador), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateAdministrador(administradorId: number, administrador): Observable<Administrador>{
    return this.http.put<Administrador>(this.myAppUrl + this.myApiUrl + administradorId, JSON.stringify(administrador), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteAdministrador(administradorId: number): Observable<Administrador>{
    return this.http.delete<Administrador>(this.myAppUrl + this.myApiUrl + administradorId)
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

  //Buscar administrador por CI
  getBuscar(cedulaIdentidad: string): Observable<Response>{
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl + cedulaIdentidad );
  }

}