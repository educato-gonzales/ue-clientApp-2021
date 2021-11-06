import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdministradorService } from '../../services/administrador.service';
import { Administrador } from '../../models/administrador';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-administrador-editar',
  templateUrl: './administrador-editar.component.html',
  styleUrls: ['./administrador-editar.component.css']
})
export class AdministradorEditarComponent implements OnInit {

  form: FormGroup;
  formBuscar: string;
  formId;
  administradorId;
  public administradoresLista: any[];

  formCedulaIdentidad: string;
  formApPaterno: string;
  formApMaterno: string;
  formNombres: string;
  formSexo: string;
  formTelefono: string;
  formCelular: string;
  formCorreo: string;

  constructor(private AdministradorService: AdministradorService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    this.formId = 'id';
    this.formBuscar = 'buscar';
    this.formCedulaIdentidad = 'cedulaIdentidad';
    this.formApPaterno = 'apPaterno';
    this.formApMaterno = 'apMaterno';
    this.formNombres = 'nombres';
    this.formSexo = 'sexo';
    this.formTelefono = 'telefono';
    this.formCelular = 'celular';
    this.formCorreo = 'correo';

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        administradorId: 0,
        buscar: ['', [Validators.required]],
        id: new FormControl({value: '', disabled: true}),
        cedulaIdentidad: [''],
        apPaterno: [''],
        apMaterno: [''],
        nombres: [''],
        sexo: [''],
        telefono: [''],
        celular: [''],
        correo: ['', [Validators.email]],
      }
    )
   }

  ngOnInit(): void {
  }

  ListaAdministradores(){
    this.AdministradorService.getAdministradores().subscribe(response =>
      {
        this.administradoresLista = response.data;
      });
  }

  delete(administradorId){
    const res = confirm('Quiere eliminar ADMINISTRADOR con Id: ' + administradorId);
    if(res){
      this.AdministradorService.deleteAdministrador(administradorId).subscribe((data) => {
        this.router.navigate(['/inicioAdministrador']);
      });
    }
  }

  buscarId(cedulaIdentidad){
    this.AdministradorService.getBuscar(cedulaIdentidad).subscribe(response =>
      {
        this.administradoresLista = (response as any);
        console.log(this.administradoresLista);
        this.administradorId = this.administradoresLista['id'],
        this.form.controls[this.formId].setValue(this.administradoresLista['id']),
        this.form.controls[this.formCedulaIdentidad].setValue(this.administradoresLista['cedulaIdentidad']),
        this.form.controls[this.formApPaterno].setValue(this.administradoresLista['apPaterno']),
        this.form.controls[this.formApMaterno].setValue(this.administradoresLista['apMaterno']),
        this.form.controls[this.formNombres].setValue(this.administradoresLista['nombres']),
        this.form.controls[this.formSexo].setValue(this.verificacionInversa(this.administradoresLista['sexo'])),
        this.form.controls[this.formTelefono].setValue(this.administradoresLista['telefono']),
        this.form.controls[this.formCelular].setValue(this.administradoresLista['celular']),
        this.form.controls[this.formCorreo].setValue(this.administradoresLista['correo'])
      });
  }

  editar(){
    if(this.administradorId > 0){
      const administrador: Administrador = {
        id: this.administradorId,
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
      this.AdministradorService.updateAdministrador(administrador.id, administrador)
        .subscribe((data) => {
          this.router.navigate(['/inicioAdministrador']);
      });
    }
  }

  cancel(){
    this.router.navigate(['/inicioAdministrador']);
  }

  get id(){ return this.form.get(this.formId); }
  get buscar(){ return this.form.get(this.formBuscar); }
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
