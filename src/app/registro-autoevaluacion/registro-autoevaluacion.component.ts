import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { AutoevaluacionService } from '../services/autoevaluacion.service';
import { Autoevaluacion } from '../models/autoevaluacion';

@Component({
  selector: 'app-registro-autoevaluacion',
  templateUrl: './registro-autoevaluacion.component.html',
  styleUrls: ['./registro-autoevaluacion.component.css']
})
export class RegistroAutoevaluacionComponent implements OnInit {

  autoevaluacion: Observable<Autoevaluacion>;
  autoevaluacionId: number;

  constructor(private autoevaluacionServicio: AutoevaluacionService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.autoevaluacionId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoAutoevaluacion();
  }

  objetoAutoevaluacion(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}