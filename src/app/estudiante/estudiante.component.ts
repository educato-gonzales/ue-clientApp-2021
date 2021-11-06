import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { EstudianteService } from '../services/estudiante.service';
import { Estudiante } from '../models/estudiante';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  estudiante: Observable<Estudiante>;
  estudianteId: number;

  constructor(private estudianteServicio: EstudianteService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.estudianteId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoEstudiante();
  }

  objetoEstudiante(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
