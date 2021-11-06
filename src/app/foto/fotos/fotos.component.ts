import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FotoService} from '../../services/foto.service';
import { Fotos } from '../../models/fotos';
import { Response } from '../../models/response';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  public fotosLista: any[];
  constructor(private fotoService: FotoService){}

  ngOnInit(): void {
    this.ListaFotos();
  }

  ListaFotos(){
    this.fotoService.getFotos().subscribe(response =>
      {
        this.fotosLista = response.data;
      });
  }

  delete(fotoId){
    const res = confirm('Quiere eliminar la foto con Id: ' + fotoId);
    if(res){
      this.fotoService.deletFoto(fotoId).subscribe((data) => {
        this.ListaFotos();
      });
    }
  }

}
