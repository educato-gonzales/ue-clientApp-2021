import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';
import { Profesor } from '../../models/profesor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profesor-addedit',
  templateUrl: './profesor-addedit.component.html',
  styleUrls: ['./profesor-addedit.component.css']
})
export class ProfesorAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
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
  profesorId: number;
  errorMessage: any;
  profesor: [];

  constructor( private ProfesorService: ProfesorService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
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

    if (this.avRoute.snapshot.params[idParam]){
      this.profesorId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        profesorId: 0,
        cedulaIdentidad: ['', [Validators.required]],
        apPaterno: ['', [Validators.required]],
        apMaterno: ['', [Validators.required]],
        nombres: ['', [Validators.required]],
        sexo: ['', [Validators.required]],
        rda: ['', [Validators.required]],
        cas: ['', [Validators.required]],
        tituloProvNacional: ['', [Validators.required]],
        tituloProfesional: ['', [Validators.required]],
        posgrado: ['', [Validators.required]],
        idiomaFrecuente: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        celular: ['', [Validators.required]],
        correo: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.profesorId > 0){
      this.actionType = 'Edit';
      this.ProfesorService.getProfesor(this.profesorId)
      .subscribe(response => (
        this.profesor = response.data,
        this.form.controls[this.formCedulaIdentidad].setValue(this.profesor['cedulaIdentidad']),
        this.form.controls[this.formApPaterno].setValue(this.profesor['apPaterno']),
        this.form.controls[this.formApMaterno].setValue(this.profesor['apMaterno']),
        this.form.controls[this.formNombres].setValue(this.profesor['nombres']),
        this.form.controls[this.formSexo].setValue(this.verificacionInversa(this.profesor['sexo'])),
        this.form.controls[this.formRda].setValue(this.verificacionInversa(this.profesor['rda'])),
        this.form.controls[this.formCas].setValue(this.verificacionInversa(this.profesor['cas'])),
        this.form.controls[this.formTituloProvNacional].setValue(this.profesor['tituloProvNacional']),
        this.form.controls[this.formTituloProfesional].setValue(this.profesor['tituloProfesional']),
        this.form.controls[this.formPosgrado].setValue(this.profesor['posgrado']),
        this.form.controls[this.formIdiomaFrecuente].setValue(this.profesor['idiomaFrecuente']),
        this.form.controls[this.formTelefono].setValue(this.profesor['telefono']),
        this.form.controls[this.formCelular].setValue(this.profesor['celular']),
        this.form.controls[this.formCorreo].setValue(this.profesor['correo'])
        ));
    }
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const profesor: Profesor = {
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
      
      this.ProfesorService.saveProfesor(profesor)
      .subscribe((data) => {
        this.router.navigate(['/profesor']);
      });
    }
    if(this.actionType === 'Edit'){
      const profesor: Profesor = {
        id: this.profesor['id'],
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
        estadoSql: this.profesor['estadoSql']
      };
      this.ProfesorService.updateProfesor(profesor.id, profesor)
        .subscribe((data) => {
          this.router.navigate(['/profesor']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/inicioProfesor']);
  }
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
}
