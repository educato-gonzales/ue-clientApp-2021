import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { AdministradorService } from '../../services/administrador.service';
import { Administrador } from '../../models/administrador';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  administrador: Observable<Administrador>;
  administradorId: number;

  constructor(private administradorServicio: AdministradorService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.administradorId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoAdministrador();
  }

  objetoAdministrador(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
