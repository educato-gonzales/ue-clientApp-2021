
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { NotaService } from '../services/nota.service';
import { Nota } from '../models/nota';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {

  nota: Observable<Nota>;
  notaId: number;

  constructor(private notaServicio: NotaService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.notaId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoNota();
  }

  objetoNota(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
