import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EstudianteService} from '../../services/estudiante.service';
import { Estudiante } from '../../models/estudiante';
import { Response } from '../../models/response';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  public estudiantesLista: any[];
  constructor(private estudianteService: EstudianteService){}

  ngOnInit(): void {
    this.ListaEstudiantes();
  }

  ListaEstudiantes(){
    this.estudianteService.getEstudiantes().subscribe(response =>
      {
        this.estudiantesLista = response.data;
      });
  }

  delete(estudianteId){
    const res = confirm('Quiere eliminar la estudiante con Id: ' + estudianteId);
    if(res){
      this.estudianteService.deleteEstudiante(estudianteId).subscribe((data) => {
        this.ListaEstudiantes();
      });
    }
  }

}
