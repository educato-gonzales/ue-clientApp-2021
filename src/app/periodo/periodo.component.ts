
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { PeriodoService } from '../services/periodo.service';
import { Periodo } from '../models/periodo';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {

  periodo: Observable<Periodo>;
  periodoId: number;

  constructor(private periodoServicio: PeriodoService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.periodoId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoPeriodo();
  }

  objetoPeriodo(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
