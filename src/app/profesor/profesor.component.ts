
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfesorService } from '../services/profesor.service';
import { Profesor } from '../models/profesor';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  profesor: Observable<Profesor>;
  profesorId: number;

  constructor(private profesorServicio: ProfesorService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.profesorId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoProfesor();
  }

  objetoProfesor(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
