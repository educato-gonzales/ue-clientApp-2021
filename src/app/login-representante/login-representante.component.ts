import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepresentanteService } from '../services/representante.service';
import { Representante } from '../models/representante';

@Component({
  selector: 'app-login-representante',
  templateUrl: './login-representante.component.html',
  styleUrls: ['./login-representante.component.css']
})
export class LoginRepresentanteComponent implements OnInit {

  form: FormGroup;
  actionType: string;

  formCedulaIdentidad: string;
  formParentesco: string;
  formIdiomaFrecuente: string;
  formApPaterno: string;
  formApMaterno: string;
  formNombres: string;
  formOcupacionLaboral: string;
  formComplemento: string;
  formExpedido: string;
  formGradoInstruccion: string;
  formFechaNacimiento: string;
  formTelefono: string;
  formCelular: string;

  representanteId: number;
  errorMessage: any;
  representante: [];
  public listaLogin: any[];

  constructor( private RepresentanteService: RepresentanteService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formCedulaIdentidad = 'cedulaIdentidad';
    this.formComplemento = 'complemento';
    this.formExpedido = 'expedido';
    this.formApPaterno = 'apPaterno';
    this.formApMaterno = 'apMaterno';
    this.formNombres = 'nombres';
    this.formIdiomaFrecuente = 'idiomaFrecuente';
    this.formOcupacionLaboral = 'ocupacionLaboral';
    this.formGradoInstruccion = 'gradoInstruccion';
    this.formFechaNacimiento = 'fechaNacimiento';
    this.formParentesco = 'parentesco';
    this.formTelefono = 'telefono';
    this.formCelular = 'celular';

    if (this.avRoute.snapshot.params[idParam]){
      this.representanteId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        representanteId: 0,
        cedulaIdentidad: ['', [Validators.required]],
        apPaterno: ['', [Validators.required]],
        apMaterno: ['', [Validators.required]],
        nombres: ['', [Validators.required]],
        ocupacionLaboral: ['', [Validators.required]],
        complemento: ['', [Validators.required]],
        expedido: ['', [Validators.required]],
        gradoInstruccion: ['', [Validators.required]],
        fechaNacimiento: ['', [Validators.required]],
        parentesco: ['', [Validators.required]],
        idiomaFrecuente: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        celular: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.representanteId > 0){
      this.actionType = 'Edit';
      this.RepresentanteService.getRepresentante(this.representanteId)
      .subscribe(response => (
        this.representante = response as any,
        this.form.controls[this.formCedulaIdentidad].setValue(this.representante['cedulaIdentidad']),
        this.form.controls[this.formApPaterno].setValue(this.representante['apPaterno']),
        this.form.controls[this.formApMaterno].setValue(this.representante['apMaterno']),
        this.form.controls[this.formNombres].setValue(this.representante['nombres']),
        this.form.controls[this.formOcupacionLaboral].setValue(this.representante['ocupacionLaboral']),
        this.form.controls[this.formComplemento].setValue(this.representante['complemento']),
        this.form.controls[this.formExpedido].setValue(this.representante['expedido']),
        this.form.controls[this.formGradoInstruccion].setValue(this.representante['gradoInstruccion']),
        this.form.controls[this.formFechaNacimiento].setValue(this.representante['fechaNacimiento']),
        this.form.controls[this.formParentesco].setValue(this.representante['parentesco']),
        this.form.controls[this.formIdiomaFrecuente].setValue(this.representante['idiomaFrecuente']),
        this.form.controls[this.formTelefono].setValue(this.representante['telefono']),
        this.form.controls[this.formCelular].setValue(this.representante['celular'])
        ));
    }
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const representante: Representante = {
        cedulaIdentidad: this.form.get(this.formCedulaIdentidad).value,
        apPaterno: this.form.get(this.formApPaterno).value,
        apMaterno: this.form.get(this.formApMaterno).value,
        nombres: this.form.get(this.formNombres).value,
        ocupacionLaboral: this.form.get(this.formOcupacionLaboral).value,
        complemento: this.form.get(this.formComplemento).value,
        expedido: this.form.get(this.formExpedido).value,
        gradoInstruccion: this.form.get(this.formGradoInstruccion).value,
        fechaNacimiento: this.form.get(this.formFechaNacimiento).value,
        parentesco: this.form.get(this.formParentesco).value,
        idiomaFrecuente: this.form.get(this.formIdiomaFrecuente).value,
        telefono: this.form.get(this.formTelefono).value,
        celular: this.form.get(this.formCelular).value,
        estadoSql: 1
      };
      
      this.RepresentanteService.saveRepresentante(representante)
      .subscribe((data) => { 
        this.listaLogin = data.data;
        this.router.navigate(['/addRegistroUsuario/', this.listaLogin['id'], 'Representante']);
      });
    }
  }

  cancel(){
    this.router.navigate(['/registrarse']);
  }
  get cedulaIdentidad(){ return this.form.get(this.formCedulaIdentidad); }
  get apPaterno(){ return this.form.get(this.formApPaterno); }
  get apMaterno(){ return this.form.get(this.formApMaterno); }
  get nombres(){ return this.form.get(this.formNombres); }
  get ocupacionLaboral(){ return this.form.get(this.formOcupacionLaboral); }
  get complemento(){ return this.form.get(this.formComplemento); }
  get expedido(){ return this.form.get(this.formExpedido); }
  get gradoInstruccion(){ return this.form.get(this.formGradoInstruccion); }
  get fechaNacimiento(){ return this.form.get(this.formFechaNacimiento); }
  get parentesco(){ return this.form.get(this.formParentesco); }
  get idiomaFrecuente(){ return this.form.get(this.formIdiomaFrecuente); }
  get telefono(){ return this.form.get(this.formTelefono); }
  get celular(){ return this.form.get(this.formCelular); }

  
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
