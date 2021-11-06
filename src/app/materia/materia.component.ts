
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { MateriaService } from '../services/materia.service';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  materia: Observable<Materia>;
  materiaId: number;

  constructor(private materiaServicio: MateriaService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.materiaId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoMateria();
  }

  objetoMateria(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}