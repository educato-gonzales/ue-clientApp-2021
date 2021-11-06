import { Observable } from 'rxjs';
import { EstudianteService} from '../../services/estudiante.service';
import { Estudiante } from '../../models/estudiante';
import { Response } from '../../models/response';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { PeriodoService } from '../../services/periodo.service';
import { Router, ActivatedRoute} from '@angular/router';
import { EstudianteCursoService } from 'src/app/services/estudiante-curso.service';

@Component({
  selector: 'app-registro-estudiante-editar',
  templateUrl: './registro-estudiante-editar.component.html',
  styleUrls: ['./registro-estudiante-editar.component.css']
})
export class RegistroEstudianteEditarComponent implements OnInit {


  form: FormGroup;
  formBuscar: string;
  formId;
  estudianteId;

  formApPaterno: string;
  formApMaterno: string;
  formNombres: string;
  formFechaNacimiento: string;
  formCedulaIdentidad: string;
  formTelefono: string;
  formCelular: string;
  formIdPeriodo;

  public listaSelect: any[];
  public listaSelectCurso: any[];
  public listaSelectEstudiante: any[];
  public estudiantesLista: any[];
  public buscarLista: any[];


  constructor(private estudianteService: EstudianteService, private formBuilder: FormBuilder,
    private router: Router,
    private serviceCurso: CursoService,
    private servicePeriodo: PeriodoService){

    this.formId = 'id';
    this.formBuscar = 'buscar';
    this.formNombres = 'nombres';
    this.formApPaterno = 'apPaterno';
    this.formApMaterno = 'apMaterno';
    this.formNombres = 'nombres';
    this.formFechaNacimiento = 'fechaNacimiento';
    this.formCedulaIdentidad = 'cedulaIdentidad';
    this.formTelefono = 'telefono';
    this.formCelular = 'celular';
    this.formIdPeriodo = 'idPeriodo';

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        estudianteId: 0,
        buscar: ['', [Validators.required]],
        id: new FormControl({value: '', disabled: true}),
        apPaterno: [''],
        apMaterno: [''],
        nombres: [''],
        fechaNacimiento: [''],
        cedulaIdentidad: [''],
        telefono: [''],
        celular: [''],
        idPeriodo: [''], 
      }
    )
  }

  ngOnInit(): void {
    this.ListaSelect();
    this.ListaSelectCurso();
    this.ListaSelectEstudiante();
  }

  ListaEstudiantes(){
    this.estudianteService.getEstudiantes().subscribe(response =>
      {
        this.estudiantesLista = response.data;
      });
  }

  delete(estudianteId){
    const res = confirm('Quiere eliminar ESTUDIANTE con Id: ' + estudianteId);
    if(res){
      this.estudianteService.deleteEstudiante(estudianteId).subscribe((data) => {
        this.router.navigate(['/registro-estudiante-nuevo']);
      });
    }
  }
  
  get id(){ return this.form.get(this.formId); }
  get buscar(){ return this.form.get(this.formBuscar); }
  get apPaterno(){ return this.form.get(this.formApPaterno); }
  get apMaterno(){ return this.form.get(this.formApMaterno); }
  get nombres(){ return this.form.get(this.formNombres); }
  get fechaNacimiento(){ return this.form.get(this.formFechaNacimiento); }
  get cedulaIdentidad(){ return this.form.get(this.formCedulaIdentidad); }
  get telefono(){ return this.form.get(this.formTelefono); }
  get celular(){ return this.form.get(this.formCelular); }
  get idPeriodo(){ return this.form.get(this.formIdPeriodo); }

   buscarId(cedulaIdentidad){
    this.estudianteService.getBuscar(cedulaIdentidad).subscribe(response =>
      {
        this.estudiantesLista = (response as any);
        console.log(this.estudiantesLista);
        this.estudianteId = this.estudiantesLista['id'],
        this.form.controls[this.formId].setValue(this.estudiantesLista['id']),
        this.form.controls[this.formApPaterno].setValue(this.estudiantesLista['apPaterno']),
        this.form.controls[this.formApMaterno].setValue(this.estudiantesLista['apMaterno']),
        this.form.controls[this.formNombres].setValue(this.estudiantesLista['nombres']),
        this.form.controls[this.formFechaNacimiento].setValue(this.estudiantesLista['fechaNacimiento']),
        this.form.controls[this.formCedulaIdentidad].setValue(this.estudiantesLista['cedulaIdentidad']),
        this.form.controls[this.formTelefono].setValue(this.estudiantesLista['telefono']),
        this.form.controls[this.formCelular].setValue(this.estudiantesLista['celular']),
        this.form.controls[this.formIdPeriodo].setValue(this.estudiantesLista['idPeriodo'])
      });
  }

  editar(){
    if(this.estudianteId > 0){
      const estudiante: Estudiante = {
        id: this.estudianteId,
        apPaterno: this.form.get(this.formApPaterno).value,
        apMaterno: this.form.get(this.formApMaterno).value,
        nombres: this.form.get(this.formNombres).value,
        fechaNacimiento: this.form.get(this.formFechaNacimiento).value,
        cedulaIdentidad: this.form.get(this.formCedulaIdentidad).value,
        telefono: this.form.get(this.formTelefono).value,
        celular: this.form.get(this.formCelular).value,
        idPeriodo: this.form.get(this.formIdPeriodo).value,
        estadoSql: 1
      };
      this.estudianteService.updateEstudiante(estudiante.id, estudiante)
        .subscribe((data) => {
          this.router.navigate(['/registro-estudiante-nuevo']);
      });
    }
  }

  cancel(){
    this.router.navigate(['/registro-estudiante-nuevo']);
  }
  
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
  

