import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { NotasService } from '../services/notas.service';
import { Notas } from '../models/notas';

@Component({
  selector: 'app-reg-notas',
  templateUrl: './reg-notas.component.html',
  styleUrls: ['./reg-notas.component.css']
})
export class RegNotasComponent implements OnInit {
  notas: Observable<Notas>;
  notasId: number;

  constructor(private notasService: NotasService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.notasId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoNotas();
  }

  objetoNotas(){
  }

}