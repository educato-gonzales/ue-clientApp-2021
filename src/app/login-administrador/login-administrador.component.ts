import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorService } from '../services/administrador.service';
import { Administrador } from '../models/administrador';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-administrador',
  templateUrl: './login-administrador.component.html',
  styleUrls: ['./login-administrador.component.css']
})
export class LoginAdministradorComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formCedulaIdentidad: string;
  formApPaterno: string;
  formApMaterno: string;
  formNombres: string;
  formSexo: string;
  formTelefono: string;
  formCelular: string;
  formCorreo: string;
  administradorId: number;
  errorMessage: any;
  administrador: [];

  public listaLogin: any[];

  constructor( private AdministradorService: AdministradorService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formCedulaIdentidad = 'cedulaIdentidad';
    this.formApPaterno = 'apPaterno';
    this.formApMaterno = 'apMaterno';
    this.formNombres = 'nombres';
    this.formSexo = 'sexo';
    this.formTelefono = 'telefono';
    this.formCelular = 'celular';
    this.formCorreo = 'correo';

    if (this.avRoute.snapshot.params[idParam]){
      this.administradorId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        administradorId: 0,
        cedulaIdentidad: ['', [Validators.required]],
        apPaterno: ['', [Validators.required]],
        apMaterno: ['', [Validators.required]],
        nombres: ['', [Validators.required]],
        sexo: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        celular: ['', [Validators.required]],
        correo: ['', [Validators.required, Validators.email]],
      }
    )

  }

  ngOnInit(): void {
    if (this.administradorId > 0){
      this.actionType = 'Edit';
      this.AdministradorService.getAdministrador(this.administradorId)
      .subscribe(response => (
        this.administrador = response as any,
        this.form.controls[this.formCedulaIdentidad].setValue(this.administrador['cedulaIdentidad']),
        this.form.controls[this.formApPaterno].setValue(this.administrador['apPaterno']),
        this.form.controls[this.formApMaterno].setValue(this.administrador['apMaterno']),
        this.form.controls[this.formNombres].setValue(this.administrador['nombres']),
        this.form.controls[this.formSexo].setValue(this.verificacionInversa(this.administrador['sexo'])),
        this.form.controls[this.formTelefono].setValue(this.administrador['telefono']),
        this.form.controls[this.formCelular].setValue(this.administrador['celular']),
        this.form.controls[this.formCorreo].setValue(this.administrador['correo'])
        ));
    }
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const administrador: Administrador = {
        cedulaIdentidad: this.form.get(this.formCedulaIdentidad).value,
        apPaterno: this.form.get(this.formApPaterno).value,
        apMaterno: this.form.get(this.formApMaterno).value,
        nombres: this.form.get(this.formNombres).value,
        sexo: this.verificacion(this.form.get(this.formSexo).value),
        telefono: this.form.get(this.formTelefono).value,
        celular: this.form.get(this.formCelular).value,
        correo: this.form.get(this.formCorreo).value,
        estadoSql: 1
      };
      
      this.AdministradorService.saveAdministrador(administrador)
      .subscribe((data) => {
        this.listaLogin = data.data;
        this.router.navigate(['/addRegistroUsuario/', this.listaLogin['id'], 'Administrador']);
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
  get sexo(){ return this.form.get(this.formSexo); }
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
