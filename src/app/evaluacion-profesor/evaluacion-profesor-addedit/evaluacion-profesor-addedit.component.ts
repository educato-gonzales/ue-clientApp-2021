import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluacionProfesorService } from '../../services/evaluacion-profesor.service';
import { EvaluacionProfesor } from '../../models/evaluacionProfesor';
import { Observable } from 'rxjs';
import { NotaService } from '../../services/nota.service';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-evaluacion-profesor-addedit',
  templateUrl: './evaluacion-profesor-addedit.component.html',
  styleUrls: ['./evaluacion-profesor-addedit.component.css']
})
export class EvaluacionProfesorAddeditComponent implements OnInit {
  form: FormGroup;
  actionType;
  formNotaSer;
  formNotaDecidir;
  formIdEvalPoseedor;
  formIdEstudiante;
  evaluacionProfesorId: number;
  errorMessage: any;
  evaluacionProfesor: [];
  //Selects
  public listaSelect: any[];
  public listaSelectEstudiante: any[];

  constructor( private evaluacionProfesorService: EvaluacionProfesorService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private serviceNota: NotaService,
    private estudianteService: EstudianteService) { 
    const idParam = 'id';

    this.actionType = 'Add';
    this.formNotaSer = 'notaSer';
    this.formNotaDecidir = 'notaDecidir';
    this.formIdEvalPoseedor = 'idEvalPoseedor';
    this.formIdEstudiante = 'idEstudiante';

    if (this.avRoute.snapshot.params[idParam]){
      this.evaluacionProfesorId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        evaluacionProfesorId: 0,
        notaSer: ['', [Validators.required]],
        notaDecidir: ['', [Validators.required]],
        idEstudiante: ['', [Validators.required]],
        idEvalPoseedor: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.evaluacionProfesorId > 0){
      this.actionType = 'Edit';
      this.evaluacionProfesorService.getEvaluacionProfesor(this.evaluacionProfesorId)
      .subscribe(response => (
        this.evaluacionProfesor = response.data,
        this.form.controls[this.formNotaSer].setValue(this.evaluacionProfesor['notaSer']),
        this.form.controls[this.formNotaDecidir].setValue(this.evaluacionProfesor['notaDecidir']),
        this.form.controls[this.formIdEstudiante].setValue(this.evaluacionProfesor['idEstudiante']),
        this.form.controls[this.formIdEvalPoseedor].setValue(this.evaluacionProfesor['idEvalPoseedor'])
        ));
    }
    this.ListaSelect();
    this.ListaSelectEstudiante();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const evaluacionProfesor: EvaluacionProfesor = {
        notaSer: this.form.get(this.formNotaSer).value,
        notaDecidir: this.form.get(this.formNotaDecidir).value,
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        idEvalPoseedor: Number(this.form.get(this.formIdEvalPoseedor).value),
        estadoSql: 1
      };
      
      this.evaluacionProfesorService.saveEvaluacionProfesor(evaluacionProfesor)
      .subscribe((data) => {
        this.router.navigate(['/evaluacionProfesor']);
      });
    }
    if(this.actionType === 'Edit'){
      const evaluacionProfesor: EvaluacionProfesor = {
        id: this.evaluacionProfesor['id'],
        notaSer: this.form.get(this.formNotaSer).value,
        notaDecidir: this.form.get(this.formNotaDecidir).value,
        idEstudiante: this.form.get(this.formIdEstudiante).value,
        idEvalPoseedor: this.form.get(this.formIdEvalPoseedor).value,
        estadoSql: this.evaluacionProfesor['estadoSql']
      };
      this.evaluacionProfesorService.updateEvaluacionProfesor(evaluacionProfesor.id, evaluacionProfesor)
        .subscribe((data) => {
          this.router.navigate(['/evaluacionProfesor']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/evaluacionProfesor']);
  }
  get notaSer(){ return this.form.get(this.formNotaSer); }
  get notaDecidir(){ return this.form.get(this.formNotaDecidir); }
  get idEstudiante(){ return this.form.get(this.formIdEstudiante); }
  get idEvalPoseedor(){ return this.form.get(this.formIdEvalPoseedor); }

  ListaSelect(){
    this.serviceNota.getNotas().subscribe(response=>{
      this.listaSelect=response.data;
    });
  }
  ListaSelectEstudiante(){
    this.estudianteService.getEstudiantes().subscribe(response=>{
      this.listaSelectEstudiante=response.data;
    });
  }

}
