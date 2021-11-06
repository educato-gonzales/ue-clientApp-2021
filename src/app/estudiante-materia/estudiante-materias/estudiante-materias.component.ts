import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EstudianteMateriaService} from '../../services/estudiante-materia.service';
import { EstudianteMateria } from '../../models/estudianteMateria';
import { Response } from '../../models/response';

@Component({
  selector: 'app-estudiante-materias',
  templateUrl: './estudiante-materias.component.html',
  styleUrls: ['./estudiante-materias.component.css']
})
export class EstudianteMateriasComponent implements OnInit {

  public estudianteMateriasLista: any[];
  constructor(private estudianteMateriaService: EstudianteMateriaService){}

  ngOnInit(): void {
    this.ListaEstudianteMaterias();
  }

  ListaEstudianteMaterias(){
    this.estudianteMateriaService.getEstudianteMaterias().subscribe(response =>
      {
        this.estudianteMateriasLista = response.data;
      });
  }

  delete(estudianteMateriaId){
    const res = confirm('Quiere eliminar el Estudiante Materia con Id: ' + estudianteMateriaId);
    if(res){
      this.estudianteMateriaService.deleteEstudianteMateria(estudianteMateriaId).subscribe((data) => {
        this.ListaEstudianteMaterias();
      });
    }
  }

}
