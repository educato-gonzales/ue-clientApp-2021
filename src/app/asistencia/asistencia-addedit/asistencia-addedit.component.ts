import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsistenciaService } from '../../services/asistencia.service';
import { MateriaService } from '../../services/materia.service';
import { EstudianteService } from '../../services/estudiante.service';
import { PeriodoService } from '../../services/periodo.service';
import { Asistencia } from '../../models/asistencia';
import { Observable } from 'rxjs';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-asistencia-addedit',
  templateUrl: './asistencia-addedit.component.html',
  styleUrls: ['./asistencia-addedit.component.css']
})
export class AsistenciaAddeditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formFecha: string;
  formEstado: string;
  formDescripcion: string;
  formIdCurso;
  formIdEstudiante;
  formIdMateria;
  formIdPeriodo;

  asistenciaId: number;
  errorMessage: any;
  asistencia: [];

  public listaSelectCurso: any[];
  public listaSelectEstudiante: any[];
  public listaSelectMateria: any[];
  public listaSelectPeriodo: any[];

  constructor( private asistenciaService: AsistenciaService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService,
    private periodoService: PeriodoService,
    private cursoService: CursoService) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formFecha = 'fecha';
    this.formEstado = 'estado';
    this.formDescripcion = 'descripcion';
    this.formIdCurso = 'idCurso';
    this.formIdEstudiante = 'idEstudiante';
    this.formIdMateria = 'idMateria';
    this.formIdPeriodo = 'idPeriodo';

    if (this.avRoute.snapshot.params[idParam]){
      this.asistenciaId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        asistenciaId: 0,
        fecha: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        idEstudiante: ['', [Validators.required]],
        idCurso: ['', [Validators.required]],
        idMateria: ['', [Validators.required]],
        idPeriodo: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.asistenciaId > 0){
      this.actionType = 'Edit';
      this.asistenciaService.getAsistencia(this.asistenciaId)
      .subscribe(response => (
        this.asistencia = response.data,
        this.form.controls[this.formFecha].setValue(this.asistencia['fecha']),
        this.form.controls[this.formEstado].setValue(this.asistencia['estado']),
        this.form.controls[this.formDescripcion].setValue(this.asistencia['descripcion']),
        this.form.controls[this.formIdCurso].setValue(this.asistencia['idCurso']),
        this.form.controls[this.formIdEstudiante].setValue(this.asistencia['idEstudiante']),
        this.form.controls[this.formIdMateria].setValue(this.asistencia['idMateria']),
        this.form.controls[this.formIdPeriodo].setValue(this.asistencia['idPeriodo'])
        ));
    }
    this.ListaSelectCurso();
    this.ListaSelectEstudiante();
    this.ListaSelectMateria();
    this.ListaSelectPeriodo();
  }
  ListaSelectCurso(){
    this.cursoService.getCursos().subscribe(response=>{
      this.listaSelectCurso=response.data;
    });
  }
  ListaSelectEstudiante(){
    this.estudianteService.getEstudiantes().subscribe(response=>{
      this.listaSelectEstudiante=response.data;
    });
  }
  ListaSelectMateria(){
    this.materiaService.getMaterias().subscribe(response=>{
      this.listaSelectMateria=response.data;
    });
  }
  ListaSelectPeriodo(){
    this.periodoService.getPeriodos().subscribe(response=>{
      this.listaSelectPeriodo=response.data;
    });
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const asistencia: Asistencia = {
        fecha: this.form.get(this.formFecha).value,
        estado: this.form.get(this.formEstado).value,
        descripcion: this.form.get(this.formDescripcion).value,
        idCurso: Number(this.form.get(this.formIdCurso).value),
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        idMateria:  Number(this.form.get(this.formIdMateria).value),
        idPeriodo:  Number(this.form.get(this.formIdPeriodo).value),
        estadoSql: 1
      };
      
      this.asistenciaService.saveAsistencia(asistencia)
      .subscribe((data) => {
        this.router.navigate(['/asistencia']);
      });
    }
    if(this.actionType === 'Edit'){
      const asistencia: Asistencia = {
        id: this.asistencia['id'],
        fecha: this.form.get(this.formFecha).value,
        estado: this.form.get(this.formEstado).value,
        descripcion: this.form.get(this.formDescripcion).value,
        idCurso: this.form.get(this.formIdCurso).value,
        idEstudiante: this.form.get(this.formIdEstudiante).value,
        idMateria: this.form.get(this.formIdMateria).value,
        idPeriodo: this.form.get(this.formIdPeriodo).value,
        estadoSql: this.asistencia['estadoSql']
      };
      this.asistenciaService.updateAsistencia(asistencia.id, asistencia)
        .subscribe((data) => {
          this.router.navigate(['/asistencia']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/asistencia']);
  }
  get fecha(){ return this.form.get(this.formFecha); }
  get estado(){ return this.form.get(this.formEstado); }
  get descripcion(){ return this.form.get(this.formDescripcion); }
  get idCurso(){ return this.form.get(this.formIdCurso); }
  get idEstudiante(){ return this.form.get(this.formIdEstudiante); }
  get idMateria(){ return this.form.get(this.formIdMateria); }
  get idPeriodo(){ return this.form.get(this.formIdPeriodo); }

}
