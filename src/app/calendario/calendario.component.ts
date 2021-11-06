
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { CalendarioService } from '../services/calendario.service';
import { Calendario } from '../models/calendario';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  calendario: Observable<Calendario>;
  calendarioId: number;

  constructor(private calendarioServicio: CalendarioService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.calendarioId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoCalendario();
  }

  objetoCalendario(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
