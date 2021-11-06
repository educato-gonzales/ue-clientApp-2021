import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificacionService} from '../../services/notificacion.service';
import { Notificacion } from '../../models/notificacion';
import { Response } from '../../models/response';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  public notificacionesLista: any[];
  constructor(private notificacionService: NotificacionService){}

  ngOnInit(): void {
    this.Listanotificaciones();
  }

  Listanotificaciones(){
    this.notificacionService.getNotificaciones().subscribe(response =>
      {
        this.notificacionesLista = response.data;
      });
  }

  delete(notificacionId){
    const res = confirm('Quiere eliminar la notificacion con Id: ' + notificacionId);
    if(res){
      this.notificacionService.deleteNotificacion(notificacionId).subscribe((data) => {
        this.Listanotificaciones();
      });
    }
  }

}
