import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { CalificacionService } from '../services/calificacion.service';
import { Calificacion } from '../models/calificacion';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {
  calificacion: Observable<Calificacion>;
  calificacionId: number;

  constructor(private calificacionServicio: CalificacionService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.calificacionId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoCalificacion();
  }

  objetoCalificacion(){
  }

}