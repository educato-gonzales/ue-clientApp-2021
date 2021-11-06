
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { RepresentanteService } from '../services/representante.service';
import { Representante } from '../models/representante';

@Component({
  selector: 'app-representante',
  templateUrl: './representante.component.html',
  styleUrls: ['./representante.component.css']
})
export class RepresentanteComponent implements OnInit {

  representante: Observable<Representante>;
  representanteId: number;

  constructor(private representanteServicio: RepresentanteService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.representanteId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoRepresentante();
  }

  objetoRepresentante(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
