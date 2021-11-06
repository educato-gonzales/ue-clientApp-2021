import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import {EstudianteCursoService} from '../services/estudiante-curso.service';
import {EstudianteCurso} from '../models/estudianteCurso';

@Component({
  selector: 'app-estudiante-curso',
  templateUrl: './estudiante-curso.component.html',
  styleUrls: ['./estudiante-curso.component.css']
})
export class EstudianteCursoComponent implements OnInit {
  
  estudianteCurso: Observable<EstudianteCurso>;
  estudianteCursoId: number;

  constructor(private estudianteCursoServicio: EstudianteCursoService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.estudianteCursoId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoEstudianteCurso();
  }

  objetoEstudianteCurso(){
  }

}
