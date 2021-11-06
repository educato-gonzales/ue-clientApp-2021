import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante } from '../../models/estudiante';
import { Observable } from 'rxjs';
import { RepresentanteService } from '../../services/representante.service';
import { CursoService } from '../../services/curso.service';
import { PeriodoService } from '../../services/periodo.service';

@Component({
  selector: 'app-estudiante-addedit',
  templateUrl: './estudiante-addedit.component.html',
  styleUrls: ['./estudiante-addedit.component.css']
})
export class EstudianteAddeditComponent implements OnInit {
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

  estudianteId;
  errorMessage: any;
  estudiante: [];
  public listaSelect: any[];
  public listaSelectRepresentante: any[];
  public listaSelectCurso: any[];

  constructor( private estudianteService: EstudianteService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private serviceRepresentante: RepresentanteService,
    private serviceCurso: CursoService,
    private servicePeriodo: PeriodoService) { 
      
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

      }
    )

  }

  ngOnInit(): void {
    if (this.estudianteId > 0){
      this.actionType = 'Edit';
      this.estudianteService.getEstudiante(this.estudianteId)
      .subscribe(response => (
        this.estudiante = (response as any),
        this.form.controls[this.formApPaterno].setValue(this.estudiante['apPaterno']),
        this.form.controls[this.formApMaterno].setValue(this.estudiante['apMaterno']),
        this.form.controls[this.formNombres].setValue(this.estudiante['nombres']),
        this.form.controls[this.formFechaNacimiento].setValue(this.estudiante['fechaNacimiento']),
        this.form.controls[this.formCedulaIdentidad].setValue(this.estudiante['cedulaIdentidad']),
        this.form.controls[this.formTelefono].setValue(this.estudiante['telefono']),
        this.form.controls[this.formCelular].setValue(this.estudiante['celular']),
        this.form.controls[this.formIdPeriodo].setValue(this.estudiante['idPeriodo'])

        ));
        
    }
    this.ListaSelect();
    this.ListaSelectRepresentante();
    this.ListaSelectCurso();
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
        this.router.navigate(['/estudiante']);
      });
    }
    if(this.actionType === 'Edit'){
      const estudiante: Estudiante = {
        id: this.estudiante['id'],
        apPaterno: this.form.get(this.formApPaterno).value,
        apMaterno: this.form.get(this.formApMaterno).value,
        nombres: this.form.get(this.formNombres).value,
        fechaNacimiento: this.form.get(this.formFechaNacimiento).value,
        cedulaIdentidad: this.form.get(this.formCedulaIdentidad).value,
        telefono: this.form.get(this.formTelefono).value,
        celular: this.form.get(this.formCelular).value,
        idPeriodo: this.form.get(this.formIdPeriodo).value,
        estadoSql: this.estudiante['estadoSql']
      };
      this.estudianteService.updateEstudiante(estudiante.id, estudiante)
        .subscribe((data) => {
          this.router.navigate(['/estudiante']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/estudiante']);
  }
  get apPaterno(){ return this.form.get(this.formApPaterno); }
  get apMaterno(){ return this.form.get(this.formApMaterno); }
  get nombres(){ return this.form.get(this.formNombres); }
  get fechaNacimiento(){ return this.form.get(this.formFechaNacimiento); }
  get cedulaIdentidad(){ return this.form.get(this.formCedulaIdentidad); }
  get telefono(){ return this.form.get(this.formTelefono); }
  get celular(){ return this.form.get(this.formCelular); }
  get idPeriodo(){ return this.form.get(this.formIdPeriodo); }

  ListaSelect(){
    this.servicePeriodo.getPeriodos().subscribe(response=>{
      this.listaSelect=response.data;
    });
  }
  ListaSelectRepresentante(){
    this.serviceRepresentante.getRepresentantes().subscribe(response=>{
      this.listaSelectRepresentante=response.data;
    });
  }
  ListaSelectCurso(){
    this.serviceCurso.getCursos().subscribe(response=>{
      this.listaSelectCurso=response.data;
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
