
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { EvaluacionProfesorService } from '../services/evaluacion-profesor.service';
import { EvaluacionProfesor } from '../models/evaluacionProfesor';

@Component({
  selector: 'app-evaluacion-profesor',
  templateUrl: './evaluacion-profesor.component.html',
  styleUrls: ['./evaluacion-profesor.component.css']
})
export class EvaluacionProfesorComponent implements OnInit {

  evaluacionProfesor: Observable<EvaluacionProfesor>;
  evaluacionProfesorId: number;

  constructor(private evaluacionProfesorServicio: EvaluacionProfesorService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.evaluacionProfesorId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoEvaluacionProfesor();
  }

  objetoEvaluacionProfesor(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}