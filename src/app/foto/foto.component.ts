
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { FotoService } from '../services/foto.service';
import { Fotos } from '../models/fotos';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {

  foto: Observable<Fotos>;
  fotoId: number;

  constructor(private fotoServicio: FotoService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.fotoId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoFoto();
  }

  objetoFoto(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}