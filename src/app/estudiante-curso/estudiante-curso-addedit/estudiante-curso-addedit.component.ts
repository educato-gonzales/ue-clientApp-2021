import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteCursoService } from '../../services/estudiante-curso.service';
import { EstudianteCurso } from '../../models/estudianteCurso';
import { Observable } from 'rxjs';
import { EstudianteService } from '../../services/estudiante.service';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-estudiante-curso-addedit',
  templateUrl: './estudiante-curso-addedit.component.html',
  styleUrls: ['./estudiante-curso-addedit.component.css']
})
export class EstudianteCursoAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formIdEstudiante;
  formIdCurso;
  estudianteCursoId: number;
  errorMessage: any;
  estudianteCurso: [];
  public listaSelectEstudiante: any[];
  public listaSelectCurso: any[];

  constructor( private estudianteCursoService: EstudianteCursoService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router, 
    private serviceEstudiante: EstudianteService,
    private serviceCurso: CursoService) { 


    const idParam = 'id';
    this.actionType = 'Add';
    this.formIdCurso = 'idCurso';
    this.formIdEstudiante = 'idEstudiante';
    
    if (this.avRoute.snapshot.params[idParam]){
      this.estudianteCursoId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        estudianteCursoId: 0,
        idCurso: ['', [Validators.required]],
        idEstudiante: ['', [Validators.required]],
        
      }
    )

  }

  ngOnInit(): void {
    if (this.estudianteCursoId > 0){
      this.actionType = 'Edit';
      this.estudianteCursoService.getEstudianteCurso(this.estudianteCursoId)
      .subscribe(response => (
        this.estudianteCurso = response.data,
        this.form.controls[this.formIdCurso].setValue(this.estudianteCurso['idCurso']),
        this.form.controls[this.formIdEstudiante].setValue(this.estudianteCurso['idEstudiante'])
        ));
    }
    this.ListaSelectEstudiante();
    this.ListaSelectCurso();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const estudianteCurso: EstudianteCurso = {
        idCurso: Number(this.form.get(this.formIdCurso).value),
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        estadoSql: 1
      };
      
      this.estudianteCursoService.saveEstudianteCurso(estudianteCurso)
      .subscribe((data) => {
        this.router.navigate(['/estudianteCurso']);
      });
    }
    if(this.actionType === 'Edit'){
      const estudianteCurso: EstudianteCurso = {
        id: this.estudianteCurso['id'],
        idCurso: Number(this.form.get(this.formIdCurso).value),
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        estadoSql: this.estudianteCurso['estadoSql']
      };
      this.estudianteCursoService.updateEstudianteCurso(estudianteCurso.id, estudianteCurso)
        .subscribe((data) => {
          this.router.navigate(['/estudianteCurso']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/estudianteCurso']);
  }

  get idEstudiante(){ return this.form.get(this.formIdEstudiante); }
  get idCurso(){ return this.form.get(this.formIdCurso); }

  ListaSelectCurso(){
      this.serviceCurso.getCursos().subscribe(response=>{
        this.listaSelectCurso=response.data;
      });
    }
  ListaSelectEstudiante(){
      this.serviceEstudiante.getEstudiantes().subscribe(response=>{
        this.listaSelectEstudiante=response.data;
      });
    }
}
