import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData : Usuario;

  constructor(private _usuarioSvr: UsuarioService, private _router: Router) {
    this.loginUserData = new Usuario()
   }

  ngOnInit(): void {
  }

  loginUser(): void {
    console.log(this.loginUserData);
    this._usuarioSvr.authUsuario(this.loginUserData.nombre, this.loginUserData.clave).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('UserId', (res as any).id);
        localStorage.setItem('Token', (res as any).token);
        localStorage.setItem('Entidad', (res as any).entidad);
        localStorage.setItem('IdRef', (res as any).idRef);
        localStorage.setItem('Clave', (res as any).clave);
        this._router.navigate(['/']);
      },
      err => { 
        console.log(err); 
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            alert("Usuario o contraseña incorrectos")
            this._router.navigate(['/login']);
          }
        }
      }
    );
  }


}
