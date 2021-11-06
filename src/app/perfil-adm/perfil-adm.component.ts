import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { RolService } from '../services/rol.service';

import { AdministradorService } from '../services/administrador.service';
import { Administrador } from '../models/administrador';

@Component({
  selector: 'app-perfil-adm',
  templateUrl: './perfil-adm.component.html',
  styleUrls: ['./perfil-adm.component.css']
})
export class PerfilAdmComponent implements OnInit {
  
  idUsuario;
  idRef;
  entidad;
  idGeneral;
  claveGeneral;

  form: FormGroup;
  errorMessage: any;
  listaUsuario: [];
  listaAdministrador:[];
  formNombre: string;
  formClave: string;
  formClaveNueva: string;
 //Administrador
  formCedulaIdentidad: string;
  formApPaterno: string;
  formApMaterno: string;
  formNombres: string;
  formSexo: string;
  formTelefono: string;
  formCelular: string;
  formCorreo: string;
  administradorId: number;
  administrador: [];

  constructor( private usuarioService: UsuarioService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private AdministradorService: AdministradorService) {

    this.formNombre = 'nombre';
    this.formClave = 'clave';
    this.formClaveNueva='claveNueva';
    this.idUsuario=localStorage.getItem('UserId');
    this.idRef=localStorage.getItem('IdRef');
    this.claveGeneral=localStorage.getItem('Clave');
    this.entidad=localStorage.getItem('Entidad');
    //Adm
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
        usuarioId: 0,
        nombre: ['', [Validators.required]],
        clave: ['', [Validators.required]],
        claveNueva:['', [Validators.required]],
        idGeneral:0,
        //Adm
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
    this.cargarUsuario();
    this.cargarPersona();
  }

  cargarUsuario(){
    this.usuarioService.getUsuario(this.idUsuario).subscribe(response=>(
      this.listaUsuario=response.data,
      this.form.controls[this.formNombre].setValue(this.listaUsuario['nombre'])
    ));
  }

  cargarPersona(){
    if(this.entidad==='Administrador'){
      this.AdministradorService.getAdministrador(this.idRef).subscribe(response=>(
        this.listaAdministrador=response.data,
        this.form.controls[this.formCedulaIdentidad].setValue(this.listaAdministrador['cedulaIdentidad']),
        this.form.controls[this.formApPaterno].setValue(this.listaAdministrador['apPaterno']),
        this.form.controls[this.formApMaterno].setValue(this.listaAdministrador['apMaterno']),
        this.form.controls[this.formNombres].setValue(this.listaAdministrador['nombres']),
        this.form.controls[this.formSexo].setValue(this.verificacionInversa(this.listaAdministrador['sexo'])),
        this.form.controls[this.formTelefono].setValue(this.listaAdministrador['telefono']),
        this.form.controls[this.formCelular].setValue(this.listaAdministrador['celular']),
        this.form.controls[this.formCorreo].setValue(this.listaAdministrador['correo'])
      ));
    }
  }

  saveUsuario(){
    if((this.form.get(this.formClaveNueva).value)==='' && (this.form.get(this.formClave).value)===''){
      return;
    }

    if(this.claveGeneral===this.form.get(this.formClave).value){  
      const obj: Usuario={
        id:this.listaUsuario['id'],
        nombre:this.listaUsuario['nombre'],
        clave:this.form.get(this.formClaveNueva).value,
        estado:this.listaUsuario['estado'],
        entidad: this.listaUsuario['entidad'],
        idRef:this.listaUsuario['idRef'],
        idRol:this.listaUsuario['idRol'],
        estadoSql: 1
      }
      localStorage.removeItem('UserId');
      localStorage.removeItem('Token');
      localStorage.removeItem('Entidad');
      localStorage.removeItem('IdRef');
      localStorage.removeItem('Clave');
      const res=confirm("Esta seguro de cambiar su contraseña antigua");
      
      if(res){
          this.usuarioService.updateUsuario(obj.id, obj).subscribe((data)=>{
          this.router.navigate(['/login']);
        });
      }
    }else{
      alert('Contraseña antigua o incorrecta')
    }
  }

  saveDatosPersonales(){

    if(!this.form.valid){
      return;
    }
    const obj: Administrador={
      id : this.listaAdministrador['id'],
      cedulaIdentidad: this.form.get(this.formCedulaIdentidad).value,
      apPaterno: this.form.get(this.formApPaterno).value,
      apMaterno: this.form.get(this.formApMaterno).value,
      nombres: this.form.get(this.formNombres).value,
      sexo: this.verificacion(this.form.get(this.formSexo).value),
      telefono: this.form.get(this.formTelefono).value,
      celular: this.form.get(this.formCelular).value,
      correo: this.form.get(this.formCorreo).value,
      estadoSql: 1
    }
  }

  cancel(){
    this.router.navigate(['/inicio']);
  }

  get nombre(){ return this.form.get(this.formNombre); }
  get clave(){ return this.form.get(this.formClave); }
  get claveNueva(){return this.form.get(this.formClaveNueva);}
  //adm
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
