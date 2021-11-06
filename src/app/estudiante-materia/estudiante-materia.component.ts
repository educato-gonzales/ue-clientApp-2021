
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { EstudianteMateriaService } from '../services/estudiante-materia.service';
import { EstudianteMateria } from '../models/estudianteMateria';

@Component({
  selector: 'app-estudiante-materia',
  templateUrl: './estudiante-materia.component.html',
  styleUrls: ['./estudiante-materia.component.css']
})
export class EstudianteMateriaComponent implements OnInit {

  estudianteMateria: Observable<EstudianteMateria>;
  estudianteMateriaId: number;

  constructor(private estudianteMateriaServicio: EstudianteMateriaService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.estudianteMateriaId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoEstudianteMateria();
  }

  objetoEstudianteMateria(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
