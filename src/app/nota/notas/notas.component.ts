import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaService} from '../../services/nota.service';
import { Nota } from '../../models/nota';
import { Response } from '../../models/response';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  public notasLista: any[];
  constructor(private notaService: NotaService){}

  ngOnInit(): void {
    this.ListaNotas();
  }

  ListaNotas(){
    this.notaService.getNotas().subscribe(response =>
      {
        this.notasLista = response.data;
      });
  }

  delete(notaId){
    const res = confirm('Quiere eliminar la Nota con Id: ' + notaId);
    if(res){
      this.notaService.deleteNota(notaId).subscribe((data) => {
        this.ListaNotas();
      });
    }
  }

}
