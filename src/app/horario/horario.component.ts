import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { HorarioService } from '../services/horario.service';
import { Horario } from '../models/horario';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  horario: Observable<Horario>;
  horarioId: number;

  constructor(private horarioServicio: HorarioService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.horarioId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoHorario();
  }

  objetoHorario(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}