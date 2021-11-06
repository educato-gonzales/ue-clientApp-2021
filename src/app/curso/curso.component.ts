
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { CursoService } from '../services/curso.service';
import { Curso } from '../models/curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  curso: Observable<Curso>;
  cursoId: number;

  constructor(private cursoServicio: CursoService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.cursoId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoCurso();
  }

  objetoCurso(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
