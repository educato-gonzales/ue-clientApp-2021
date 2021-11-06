
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { ParametroService } from '../services/parametro.service';
import { Parametro } from '../models/parametro';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.css']
})
export class ParametroComponent implements OnInit {

  parametro: Observable<Parametro>;
  parametroId: number;

  constructor(private parametroServicio: ParametroService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.parametroId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoParametro();
  }

  objetoParametro(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
