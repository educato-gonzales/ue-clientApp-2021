
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { ParaleloService } from '../services/paralelo.service';
import { Paralelo } from '../models/paralelo';

@Component({
  selector: 'app-paralelo',
  templateUrl: './paralelo.component.html',
  styleUrls: ['./paralelo.component.css']
})
export class ParaleloComponent implements OnInit {

  paralelo: Observable<Paralelo>;
  paraleloId: number;

  constructor(private paraleloServicio: ParaleloService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.paraleloId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoParalelo();
  }

  objetoParalelo(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
