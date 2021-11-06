
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { InstitucionService } from '../services/institucion.service';
import { Institucion } from '../models/institucion';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit {

  institucion: Observable<Institucion>;
  institucionId: number;

  constructor(private institucionServicio: InstitucionService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.institucionId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoInstitucion();
  }

  objetoInstitucion(){
  }

}