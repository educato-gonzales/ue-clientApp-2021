import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/categoria/';
   }

   getCategoria(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getCategorias(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveCategoria(categoria): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(categoria), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateCategoria(categoriaId: number, categoria): Observable<Categoria>{
    return this.http.put<Categoria>(this.myAppUrl + this.myApiUrl + categoriaId, JSON.stringify(categoria), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteCategoria(categoriaId: number): Observable<Categoria>{
    return this.http.delete<Categoria>(this.myAppUrl + this.myApiUrl + categoriaId)
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

