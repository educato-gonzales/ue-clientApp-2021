import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';
import { Profesor } from '../../models/profesor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profesor-editar',
  templateUrl: './profesor-editar.component.html',
  styleUrls: ['./profesor-editar.component.css']
})
export class ProfesorEditarComponent implements OnInit {

  form: FormGroup;
  formBuscar: string;
  formId;
  profesorId;
  public profesoresLista: any[];

  formCedulaIdentidad: string;
  formApPaterno: string;
  formApMaterno: string;
  formNombres: string;
  formSexo: string;
  formRda: string;
  formCas: string;
  formTituloProvNacional: string;
  formTituloProfesional: string;
  formPosgrado: string;
  formIdiomaFrecuente: string;
  formTelefono: string;
  formCelular: string;
  formCorreo: string;

  constructor(private ProfesorService: ProfesorService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    this.formId = 'id';
    this.formBuscar = 'buscar';
    this.formCedulaIdentidad = 'cedulaIdentidad';
    this.formApPaterno = 'apPaterno';
    this.formApMaterno = 'apMaterno';
    this.formNombres = 'nombres';
    this.formSexo = 'sexo';
    this.formRda = 'rda';
    this.formCas = 'cas';
    this.formTituloProvNacional = 'tituloProvNacional';
    this.formTituloProfesional = 'tituloProfesional';
    this.formPosgrado = 'posgrado';
    this.formIdiomaFrecuente = 'idiomaFrecuente';
    this.formTelefono = 'telefono';
    this.formCelular = 'celular';
    this.formCorreo = 'correo';

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        profesorId: 0,
        buscar: ['', [Validators.required]],
        id: new FormControl({value: '', disabled: true}),
        cedulaIdentidad: [''],
        apPaterno: [''],
        apMaterno: [''],
        nombres: [''],
        sexo: [''],
        rda: [''],
        cas: [''],
        tituloProvNacional: [''],
        tituloProfesional: [''],
        posgrado: [''],
        idiomaFrecuente: [''],
        telefono: [''],
        celular: [''],
        correo: [''],
      }
    )
  }

  ngOnInit(): void {
  }

  ListaProfesores(){
    this.ProfesorService.getProfesores().subscribe(response =>
      {
        this.profesoresLista = response.data;
      });
  }

  delete(profesorId){
    const res = confirm('Quiere eliminar PROFESOR con Id: ' + profesorId);
    if(res){
      this.ProfesorService.deleteProfesor(profesorId).subscribe((data) => {
        this.router.navigate(['/inicioProfesor']);
      });
    }
  }

  buscarId(cedulaIdentidad){
    this.ProfesorService.getBuscar(cedulaIdentidad).subscribe(response =>
      {
        this.profesoresLista = (response as any);
        console.log(this.profesoresLista);
        this.profesorId = this.profesoresLista['id'],
        this.form.controls[this.formId].setValue(this.profesoresLista['id']),
        this.form.controls[this.formCedulaIdentidad].setValue(this.profesoresLista['cedulaIdentidad']),
        this.form.controls[this.formApPaterno].setValue(this.profesoresLista['apPaterno']),
        this.form.controls[this.formApMaterno].setValue(this.profesoresLista['apMaterno']),
        this.form.controls[this.formNombres].setValue(this.profesoresLista['nombres']),
        this.form.controls[this.formSexo].setValue(this.verificacionInversa(this.profesoresLista['sexo'])),
        this.form.controls[this.formRda].setValue(this.verificacionInversa(this.profesoresLista['rda'])),
        this.form.controls[this.formCas].setValue(this.verificacionInversa(this.profesoresLista['cas'])),
        this.form.controls[this.formTituloProvNacional].setValue(this.profesoresLista['tituloProvNacional']),
        this.form.controls[this.formTituloProfesional].setValue(this.profesoresLista['tituloProfesional']),
        this.form.controls[this.formPosgrado].setValue(this.profesoresLista['posgrado']),
        this.form.controls[this.formIdiomaFrecuente].setValue(this.profesoresLista['idiomaFrecuente']),
        this.form.controls[this.formTelefono].setValue(this.profesoresLista['telefono']),
        this.form.controls[this.formCelular].setValue(this.profesoresLista['celular']),
        this.form.controls[this.formCorreo].setValue(this.profesoresLista['correo'])
      });
  }

  editar(){
    if(this.profesorId > 0){
      const profesor: Profesor = {
        id: this.profesorId,
        cedulaIdentidad: this.form.get(this.formCedulaIdentidad).value,
        apPaterno: this.form.get(this.formApPaterno).value,
        apMaterno: this.form.get(this.formApMaterno).value,
        nombres: this.form.get(this.formNombres).value,
        sexo: this.verificacion(this.form.get(this.formSexo).value),
        rda: this.verificacion(this.form.get(this.formRda).value),
        cas: this.verificacion(this.form.get(this.formCas).value),
        tituloProvNacional: this.form.get(this.formTituloProvNacional).value,
        tituloProfesional: this.form.get(this.formTituloProfesional).value,
        posgrado: this.form.get(this.formPosgrado).value,
        idiomaFrecuente: this.form.get(this.formIdiomaFrecuente).value,
        telefono: this.form.get(this.formTelefono).value,
        celular: this.form.get(this.formCelular).value,
        correo: this.form.get(this.formCorreo).value,
        estadoSql: 1
      };
      this.ProfesorService.updateProfesor(profesor.id, profesor)
        .subscribe((data) => {
          this.router.navigate(['/inicioProfesor']);
      });
    }
  }

  cancel(){
    this.router.navigate(['/inicioProfesor']);
  }

  get id(){ return this.form.get(this.formId); }
  get buscar(){ return this.form.get(this.formBuscar); }
  get cedulaIdentidad(){ return this.form.get(this.formCedulaIdentidad); }
  get apPaterno(){ return this.form.get(this.formApPaterno); }
  get apMaterno(){ return this.form.get(this.formApMaterno); }
  get nombres(){ return this.form.get(this.formNombres); }
  get sexo(){ return this.form.get(this.formSexo); }
  get rda(){ return this.form.get(this.formRda); }
  get cas(){ return this.form.get(this.formCas); }
  get tituloProvNacional(){ return this.form.get(this.formTituloProvNacional); }
  get tituloProfesional(){ return this.form.get(this.formTituloProfesional); }
  get posgrado(){ return this.form.get(this.formPosgrado); }
  get idiomaFrecuente(){ return this.form.get(this.formIdiomaFrecuente); }
  get telefono(){ return this.form.get(this.formTelefono); }
  get celular(){ return this.form.get(this.formCelular); }
  get correo(){ return this.form.get(this.formCorreo); }

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
