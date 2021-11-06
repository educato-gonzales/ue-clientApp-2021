import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluacionProfesorService} from '../../services/evaluacion-profesor.service';
import { EvaluacionProfesor } from '../../models/evaluacionProfesor';
import { Response } from '../../models/response';

@Component({
  selector: 'app-evaluacion-profesores',
  templateUrl: './evaluacion-profesores.component.html',
  styleUrls: ['./evaluacion-profesores.component.css']
})
export class EvaluacionProfesoresComponent implements OnInit {

  public evaluacionProfesoresLista: any[];
  constructor(private evaluacionProfesorService: EvaluacionProfesorService){}

  ngOnInit(): void {
    this.ListaEvaluacionProfesores();
  }

  ListaEvaluacionProfesores(){
    this.evaluacionProfesorService.getEvaluacionProfesores().subscribe(response =>
      {
        this.evaluacionProfesoresLista = response.data;
      });
  }

  delete(evaluacionProfesorId){
    const res = confirm('Quiere eliminar la evaluacion profesor con Id: ' + evaluacionProfesorId);
    if(res){
      this.evaluacionProfesorService.deleteEvaluacionProfesor(evaluacionProfesorId).subscribe((data) => {
        this.ListaEvaluacionProfesores();
      });
    }
  }

}
