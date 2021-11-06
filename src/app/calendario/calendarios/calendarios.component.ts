import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarioService} from '../../services/calendario.service';
import { Calendario } from '../../models/calendario';
import { Response } from '../../models/response';

@Component({
  selector: 'app-calendarios',
  templateUrl: './calendarios.component.html',
  styleUrls: ['./calendarios.component.css']
})
export class CalendariosComponent implements OnInit {

  public calendariosLista: any[];
  constructor(private calendarioService: CalendarioService){}

  ngOnInit(): void {
    this.ListaCalendarios();
  }

  ListaCalendarios(){
    this.calendarioService.getCalendarios().subscribe(response =>
      {
        this.calendariosLista = response.data;
      });
  }

  delete(calendarioId){
    const res = confirm('Quiere eliminar el calendario con Id: ' + calendarioId);
    if(res){
      this.calendarioService.deleteCalendario(calendarioId).subscribe((data) => {
        this.ListaCalendarios();
      });
    }
  }

}
