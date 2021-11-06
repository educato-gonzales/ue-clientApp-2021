import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from '../services/estudiante.service';
import { Estudiante } from '../models/estudiante';
import { Observable } from 'rxjs';
import { CursoService } from '../services/curso.service';
import { PeriodoService } from '../services/periodo.service';
import { UsuarioService } from '../services/usuario.service';
import { EstudianteCursoService } from '../services/estudiante-curso.service';
import { EstudianteCurso } from '../models/estudianteCurso';

@Component({
  selector: 'app-login-estudiante',
  templateUrl: './login-estudiante.component.html',
  styleUrls: ['./login-estudiante.component.css']
})
export class LoginEstudianteComponent implements OnInit {

  form: FormGroup;
  actionType: string;

  formApPaterno: string;
  formApMaterno: string;
  formNombres: string;
  formFechaNacimiento: string;
  formCedulaIdentidad: string;
  formTelefono: string;
  formCelular: string;
  formIdPeriodo;
  //
  formIdEstudiante;
  formIdCurso;
 
  estudianteId;
  errorMessage: any;
  estudiante: [];
  public listaSelect: any[];
  public listaSelectCurso: any[];
  public listaSelectEstudiante: any[];

  estudianteCursoId: number;
  estudianteCurso: [];

  public listaLogin: any[];

  constructor( private estudianteService: EstudianteService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private servicePeriodo: PeriodoService,
    private serviceCurso: CursoService,
    public _authService: UsuarioService,
    private estudianteCursoService: EstudianteCursoService) { 
      
    const idParam = 'id';
    this.actionType = 'Add';

    this.formApPaterno = 'apPaterno';
    this.formApMaterno = 'apMaterno';
    this.formNombres = 'nombres';
    this.formFechaNacimiento = 'fechaNacimiento';
    this.formCedulaIdentidad = 'cedulaIdentidad';
    this.formTelefono = 'telefono';
    this.formCelular = 'celular';
    this.formIdPeriodo = 'idPeriodo';
    //
    this.formIdCurso = 'idCurso';
    this.formIdEstudiante = 'idEstudiante';

    if (this.avRoute.snapshot.params[idParam]){
      this.estudianteId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        estudianteId: 0,
        
        apPaterno: ['', [Validators.required]],
        apMaterno: ['', [Validators.required]],
        nombres: ['', [Validators.required]],
        fechaNacimiento: ['', [Validators.required]],
        cedulaIdentidad: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        celular: ['', [Validators.required]],
        idPeriodo: ['', [Validators.required]],
        //esto es para registrar lo de la vista que se necesita
        estudianteCursoId: 0,
        idCurso: [''],
        idEstudiante: [''],

      }
    )

  }

  ngOnInit(): void {
    this.ListaSelect();
    this.ListaSelectCurso();
    this.ListaSelectEstudiante();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const estudiante: Estudiante = {
        apPaterno: this.form.get(this.formApPaterno).value,
        apMaterno: this.form.get(this.formApMaterno).value,
        nombres: this.form.get(this.formNombres).value,
        fechaNacimiento: this.form.get(this.formFechaNacimiento).value,
        cedulaIdentidad: this.form.get(this.formCedulaIdentidad).value,
        telefono: this.form.get(this.formTelefono).value,
        celular: this.form.get(this.formCelular).value,
        idPeriodo: Number(this.form.get(this.formIdPeriodo).value),
        estadoSql: 1
      };
    
      this.estudianteService.saveEstudiante(estudiante)
      .subscribe((data) => {
        this.listaLogin = data.data;
        this.ListaSelectEstudiante();
        this.form.controls[this.formIdEstudiante].setValue(data.data.id)
      });
    }
  }

  save2(){
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
        this.router.navigate(['/addRegistroUsuario/',estudianteCurso.idEstudiante, 'Estudiante']);
      });
    }
  }

  cancel(){
    this.router.navigate(['/registrarse']);
  }
  get apPaterno(){ return this.form.get(this.formApPaterno); }
  get apMaterno(){ return this.form.get(this.formApMaterno); }
  get nombres(){ return this.form.get(this.formNombres); }
  get fechaNacimiento(){ return this.form.get(this.formFechaNacimiento); }
  get cedulaIdentidad(){ return this.form.get(this.formCedulaIdentidad); }
  get telefono(){ return this.form.get(this.formTelefono); }
  get celular(){ return this.form.get(this.formCelular); }
  get idPeriodo(){ return this.form.get(this.formIdPeriodo); }

  get idEstudiante(){ return this.form.get(this.formIdEstudiante); }
  get idCurso(){ return this.form.get(this.formIdCurso); }

  ListaSelect(){
    this.servicePeriodo.getPeriodos().subscribe(response=>{
      this.listaSelect=response.data;
    });
  }
  ListaSelectCurso(){
    this.serviceCurso.getCursos().subscribe(response=>{
      this.listaSelectCurso=response.data;
    });
  }
  ListaSelectEstudiante(){
    this.estudianteService.getEstudiantes().subscribe(response=>{
      this.listaSelectEstudiante=response.data;
    });
  }

  verificacion(obj: string){
    if(obj==="1"){
      return true
    }else if(obj === "0"){
      return false
    }
  }
  verificacionInversa(obj: boolean){
    if(obj===true){
      return "1"
    }else if(obj === false){
      return "0"
    }
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
