
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { NotificacionService } from '../services/notificacion.service';
import { Notificacion } from '../models/notificacion';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  notificacion: Observable<Notificacion>;
  notificacionId: number;

  constructor(private notificacionServicio: NotificacionService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.notificacionId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoNotificacion();
  }

  objetoNotificacion(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
