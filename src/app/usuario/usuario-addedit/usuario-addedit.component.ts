import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Observable } from 'rxjs';
import { RolService } from '../../services/rol.service';


@Component({
  selector: 'app-usuario-addedit',
  templateUrl: './usuario-addedit.component.html',
  styleUrls: ['./usuario-addedit.component.css']
})
export class UsuarioAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formNombre: string;
  formClave: string;
  formEstado: string;
  formEntidad: string;
  formIdRef;
  formIdRol;
  usuarioId: number;
  errorMessage: any;
  usuario: [];
  public listaSelect: any[];

  constructor( private usuarioService: UsuarioService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private serviceRol: RolService) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNombre = 'nombre';
    this.formClave = 'clave';
    this.formEstado = 'estado';
    this.formEntidad = 'entidad';
    this.formIdRef = 'idRef';
    this.formIdRol = 'idRol';

    if (this.avRoute.snapshot.params[idParam]){
      this.usuarioId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        usuarioId: 0,
        nombre: ['', [Validators.required]],
        clave: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        entidad: ['', [Validators.required]],
        idRef: ['', [Validators.required]],
        idRol: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.usuarioId > 0){
      this.actionType = 'Edit';
      this.usuarioService.getUsuario(this.usuarioId)
      .subscribe(response => (
        this.usuario = response.data,
        this.form.controls[this.formNombre].setValue(this.usuario['nombre']),
        this.form.controls[this.formClave].setValue(this.usuario['clave']),
        this.form.controls[this.formEstado].setValue(this.usuario['estado']),
        this.form.controls[this.formEntidad].setValue(this.usuario['entidad']),
        this.form.controls[this.formIdRef].setValue(this.usuario['idRef']),
        this.form.controls[this.formIdRol].setValue(this.usuario['idRol'])
        ));
    }
    this.ListaSelect();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const usuario: Usuario = {
        nombre: this.form.get(this.formNombre).value,
        clave: this.form.get(this.formClave).value,
        estado: this.form.get(this.formEstado).value,
        entidad: this.form.get(this.formEntidad).value,
        idRef: this.form.get(this.formIdRef).value,
        idRol: Number(this.form.get(this.formIdRol).value),
        estadoSql: 1
      };
      
      this.usuarioService.saveUsuario(usuario)
      .subscribe((data) => {
        this.router.navigate(['/usuario']);
      });
    }
    if(this.actionType === 'Edit'){
      const usuario: Usuario = {
        id: this.usuario['id'],
        nombre: this.form.get(this.formNombre).value,
        clave: this.form.get(this.formClave).value,
        estado: this.form.get(this.formEstado).value,
        entidad: this.form.get(this.formEntidad).value,
        idRef: this.form.get(this.formIdRef).value,
        idRol: Number(this.form.get(this.formIdRol).value),
        estadoSql: this.usuario['estadoSql']
      };
      this.usuarioService.updateUsuario(usuario.id, usuario)
        .subscribe((data) => {
          this.router.navigate(['/usuario']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/usuario']);
  }
  get nombre(){ return this.form.get(this.formNombre); }
  get clave(){ return this.form.get(this.formClave); }
  get estado(){ return this.form.get(this.formEstado); }
  get entidad(){ return this.form.get(this.formEntidad); }
  get idRef(){ return this.form.get(this.formIdRef); }
  get idRol(){ return this.form.get(this.formIdRol); }

   ListaSelect(){
      this.serviceRol.getRoles().subscribe(response=>{
        this.listaSelect=response.data;
      });
    }

}
