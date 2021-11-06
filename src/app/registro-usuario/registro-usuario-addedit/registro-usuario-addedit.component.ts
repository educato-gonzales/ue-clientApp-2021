import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Observable } from 'rxjs';
import { RolService } from '../../services/rol.service';
@Component({
  selector: 'app-registro-usuario-addedit',
  templateUrl: './registro-usuario-addedit.component.html',
  styleUrls: ['./registro-usuario-addedit.component.css']
})
export class RegistroUsuarioAddeditComponent implements OnInit {
form: FormGroup;
  actionType: string;
  formNombre: string;
  formClave: string;
  
  usuarioId: number;
  entidadLogin: string;
  rolLogin: number;

  errorMessage: any;

  usuario: [];

  constructor( private usuarioService: UsuarioService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private serviceRol: RolService) { 

    const idParam = 'id';
    const entidadLoginParam = 'entidad';

    this.actionType = 'Add';
    this.formNombre = 'nombre';
    this.formClave = 'clave';

    if (this.avRoute.snapshot.params[idParam] && this.avRoute.snapshot.params[entidadLoginParam] ){
      this.entidadLogin = this.avRoute.snapshot.params[entidadLoginParam];
      this.usuarioId = this.avRoute.snapshot.params[idParam];
      if(this.entidadLogin==='Estudiante'){
        this.rolLogin=1
      }else if(this.entidadLogin==='Administrador'){
        this.rolLogin=2
      }else if(this.entidadLogin==='Profesor'){
        this.rolLogin=3
      }else if(this.entidadLogin==='Representante'){
        this.rolLogin=4
      }
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        usuarioId: 0,
        nombre: ['', [Validators.required]],
        clave: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    console.log(this.entidadLogin)
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      console.log(this.rolLogin)
      const usuario: Usuario = {
        nombre: this.form.get(this.formNombre).value,
        clave: this.form.get(this.formClave).value,
        estado: "activo",
        entidad: this.entidadLogin,
        idRef: Number(this.usuarioId),
        idRol: this.rolLogin,
        estadoSql: 1
      };
      
      this.usuarioService.saveUsuario(usuario)
      .subscribe((data) => {
        this.router.navigate(['/ingresar']);
      });
    }
  }

  cancel(){
    this.router.navigate(['/inicio']);
  }
  get nombre(){ return this.form.get(this.formNombre); }
  get clave(){ return this.form.get(this.formClave); }

}
