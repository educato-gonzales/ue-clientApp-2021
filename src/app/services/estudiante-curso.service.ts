import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EstudianteCurso } from '../models/estudianteCurso';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class EstudianteCursoService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/estudianteCurso/';
   }

   getEstudianteCurso(Id: number): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id );
    }
   
   getEstudianteCursos(): Observable<Response>{
     return this.http.get<Response>(this.myAppUrl + this.myApiUrl);
    }

  saveEstudianteCurso(estudianteCurso): Observable<Response>{
    return this.http.post<Response>(this.myAppUrl + this.myApiUrl, JSON.stringify(estudianteCurso), this.httpOptions)
      .pipe(retry(1),
      catchError(this.errorHandler));
  }

  updateEstudianteCurso(estudianteCursoId: number, estudianteCurso): Observable<EstudianteCurso>{
    return this.http.put<EstudianteCurso>(this.myAppUrl + this.myApiUrl + estudianteCursoId, JSON.stringify(estudianteCurso), this.httpOptions)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }

  deleteEstudianteCurso(estudianteCursoId: number): Observable<EstudianteCurso>{
    return this.http.delete<EstudianteCurso>(this.myAppUrl + this.myApiUrl + estudianteCursoId)
    .pipe(retry(1),
    catchError(this.errorHandler));
  }
  //Buscar curso
  getIdCurso(encontrado: number, ide: number ): Observable<Response>{
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

  getBuscar(idCurso: string): Observable<Response>{
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl + idCurso );
   }

    //Buscar datos para RUDE
  getEstudianteCursoBuscar(Id: number, idBuscar: number): Observable<Response>{
    return this.http.get<Response>(this.myAppUrl + this.myApiUrl + Id + '/' + idBuscar );
   }

}