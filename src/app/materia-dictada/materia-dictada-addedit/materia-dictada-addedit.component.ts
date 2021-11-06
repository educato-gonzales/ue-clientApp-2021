import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MateriaDictadaService } from '../../services/materia-dictada.service';
import { MateriaDictada } from '../../models/materiaDictada';
import { Observable } from 'rxjs';
import { MateriaService } from '../../services/materia.service';
import { CursoService } from '../../services/curso.service';
import { ProfesorService } from '../../services/profesor.service';
import { HorarioService } from '../../services/horario.service';
import { PeriodoService } from '../../services/periodo.service';


@Component({
  selector: 'app-materia-dictada-addedit',
  templateUrl: './materia-dictada-addedit.component.html',
  styleUrls: ['./materia-dictada-addedit.component.css']
})
export class MateriaDictadaAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  
  formDescripcion: string;
  formIdMateria;
  formIdCurso;
  formIdProfesor;
  formIdHorario;
  formIdPeriodo;

  materiaDictadaId;
  errorMessage: any;
  materiaDictada: [];
  public listaSelectMateria: any[];
  public listaSelectCurso: any[];
  public listaSelectProfesor: any[];
  public listaSelectHorario: any[];
  public listaSelectPeriodo: any[];
  //Para obtener IdEvalPoseedor 
  listaId;
  listasId;

  constructor( private materiaDictadaService: MateriaDictadaService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private serviceMateria: MateriaService,
    private serviceCurso: CursoService,
    private serviceProfesor: ProfesorService,
    private serviceHorario: HorarioService,
    private servicePeriodo: PeriodoService) {

    const idParam = 'id';
    const idParams = 'ids';
    this.actionType = 'Add';
    this.formDescripcion = 'descripcion';
    this.formIdMateria = 'idMateria';
    this.formIdCurso = 'idCurso';
    this.formIdProfesor = 'idProfesor';
    this.formIdHorario = 'idHorario';
    this.formIdPeriodo = 'idPeriodo';
    //Para obtener IdEvalPoseedor 
    const listaIdParam = 'id';
    const listasIdParam = 'ids';

    //Para obtener IdEvalPoseedor 
    if (this.avRoute.snapshot.params[listaIdParam] || this.avRoute.snapshot.params[listasIdParam]){
      this.listaId = this.avRoute.snapshot.params[listaIdParam];
      this.listasId = this.avRoute.snapshot.params[listasIdParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        materiaDictadaId: 0,
        descripcion: ['', [Validators.required]],
        idMateria: ['', [Validators.required]],
        idCurso: new FormControl({value: '', disabled: true}),
        //idCurso: ['', [Validators.required]],
        idProfesor: ['', [Validators.required]],
        idHorario: ['', [Validators.required]],
        idPeriodo: ['', [Validators.required]],
      }
    );

  }

  ngOnInit(): void {
    this.form.controls[this.formIdCurso].setValue(this.listasId)
    if (this.listaId > 0){
      console.log(this.listaId);
    
      this.actionType = 'Edit'
      this.materiaDictadaService.getMateriaDictada(this.listaId)
      .subscribe(response => (
        this.materiaDictada = response as any,
        this.form.controls[this.formDescripcion].setValue(this.materiaDictada['descripcion']),
        this.form.controls[this.formIdMateria].setValue(this.materiaDictada['idMateria']),
        this.form.controls[this.formIdCurso].setValue(this.materiaDictada['idCurso']),
        this.form.controls[this.formIdProfesor].setValue(this.materiaDictada['idProfesor']),
        this.form.controls[this.formIdHorario].setValue(this.materiaDictada['idHorario']),
        this.form.controls[this.formIdPeriodo].setValue(this.materiaDictada['idPeriodo']) 
      ));
    }
    this.ListaSelectMateria();
    this.ListaSelectCurso();
    this.ListaSelectProfesor();
    this.ListaSelectHorario();
    this.ListaSelectPeriodo();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const materiaDictada: MateriaDictada = {
        descripcion: this.form.get(this.formDescripcion).value,
        idMateria: Number(this.form.get(this.formIdMateria).value),
        idCurso: Number(this.form.get(this.formIdCurso).value),
        idProfesor: Number(this.form.get(this.formIdProfesor).value),
        idHorario: Number(this.form.get(this.formIdHorario).value),
        idPeriodo: Number(this.form.get(this.formIdPeriodo).value),
        estadoSql: 1
      };
      
      this.materiaDictadaService.saveMateriaDictada(materiaDictada)
      .subscribe((data) => {
        this.router.navigate(['/horario-estudiante']);
      });
    }
    if(this.actionType === 'Edit'){
      const materiaDictada: MateriaDictada = {
        id: this.materiaDictada['id'],
        descripcion: this.form.get(this.formDescripcion).value,
        idMateria: this.form.get(this.formIdMateria).value,
        idCurso: this.form.get(this.formIdCurso).value,
        idProfesor: this.form.get(this.formIdProfesor).value,
        idHorario: this.form.get(this.formIdHorario).value,
        idPeriodo: this.form.get(this.formIdPeriodo).value,
        estadoSql: this.materiaDictada['estadoSql']
      };
      this.materiaDictadaService.updateMateriaDictada(materiaDictada.id, materiaDictada)
        .subscribe((data) => {
          this.router.navigate(['/materiaDictadas']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/materiaDictadas']);
  }

  get descripcion(){ return this.form.get(this.formDescripcion); }
  get idMateria(){ return this.form.get(this.formIdMateria); }
  get idCurso(){ return this.form.get(this.formIdCurso); }
  get idProfesor(){ return this.form.get(this.formIdProfesor); }
  get idHorario(){ return this.form.get(this.formIdHorario); }
  get idPeriodo(){ return this.form.get(this.formIdPeriodo); }

  ListaSelectMateria(){
    this.serviceMateria.getMaterias().subscribe(response=>{
      this.listaSelectMateria=response.data;
    });
  }
  ListaSelectCurso(){
    this.serviceCurso.getCursos().subscribe(response=>{
      this.listaSelectCurso=response.data;
    });
  }
  ListaSelectProfesor(){
    this.serviceProfesor.getProfesores().subscribe(response=>{
      this.listaSelectProfesor=response.data;
    });
  }
  ListaSelectHorario(){
    this.serviceHorario.getHorarios().subscribe(response=>{
      this.listaSelectHorario=response.data;
    });
  }
  ListaSelectPeriodo(){
    this.servicePeriodo.getPeriodos().subscribe(response=>{
      this.listaSelectPeriodo=response.data;
    });
  }

  // Steps
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
