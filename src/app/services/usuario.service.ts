import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { Response } from '../models/response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  myAppUrl: string;
  myApiUrl: string;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient, private _router: Router) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/usuario/';
   }

   getUsuario(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getUsuarios(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveUsuario(usuario): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(usuario), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateUsuario(usuarioId: number, usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.myAppUrl + this.myApiUrl + usuarioId, JSON.stringify(usuario), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteUsuario(usuarioId: number): Observable<Usuario>{
    return this.http.delete<Usuario>(this.myAppUrl + this.myApiUrl + usuarioId)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }
  authUsuario(nombre, clave) {
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl + `${nombre}/${clave}`);
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

  loggedIn() {
    return !!localStorage.getItem('Token');
  }
  
  getUserId() {
    return localStorage.getItem('UserId');
  }

  getToken() {
    return localStorage.getItem('Token');
  }

  logoutUser() {
    localStorage.removeItem('UserId');
    localStorage.removeItem('Token');
    localStorage.removeItem('Entidad');
    localStorage.removeItem('IdRef');
    this._router.navigate(['/']);
  }

  //Verificar usuario
  getEntidadEstudiante() {
    return localStorage.getItem('Entidad')=="Estudiante";
  }
  getEntidadAdministrador() {
    return localStorage.getItem('Entidad')=="Administrador";
  }
  getEntidadProfesor() {
    return localStorage.getItem('Entidad')=="Profesor";
  }
  getEntidadRepresentante() {
    return localStorage.getItem('Entidad')=="Representante";
  }

}

