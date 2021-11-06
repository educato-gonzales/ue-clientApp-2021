
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { MateriaDictadaService } from '../services/materia-dictada.service';
import { MateriaDictada } from '../models/materiaDictada';

@Component({
  selector: 'app-materia-dictada',
  templateUrl: './materia-dictada.component.html',
  styleUrls: ['./materia-dictada.component.css']
})
export class MateriaDictadaComponent implements OnInit {

  materiaDictada: Observable<MateriaDictada>;
  materiaDictadaId: number;

  constructor(private materiaDictadaServicio: MateriaDictadaService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.materiaDictadaId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoMateriaDictada();
  }

  objetoMateriaDictada(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
