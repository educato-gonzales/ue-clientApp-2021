import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { AsistenciaService } from '../services/asistencia.service';
import { Asistencia } from '../models/asistencia';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  asistencia: Observable<Asistencia>;
  asistenciaId: number;

  constructor(private asistenciaServicio: AsistenciaService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.asistenciaId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoAsistencia();
  }

  objetoAsistencia(){
  }

}