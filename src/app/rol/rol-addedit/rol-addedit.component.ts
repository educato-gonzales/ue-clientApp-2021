import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../models/rol';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rol-addedit',
  templateUrl: './rol-addedit.component.html',
  styleUrls: ['./rol-addedit.component.css']
})

export class RolAddeditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formNombre: string;
  formDescripcion: string;
  rolId: number;
  errorMessage: any;
  rol: [];

  constructor( private rolService: RolService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNombre = 'nombre';
    this.formDescripcion = 'descripcion';
    if (this.avRoute.snapshot.params[idParam]){
      this.rolId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        rolId: 0,
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.rolId > 0){
      this.actionType = 'Edit';
      this.rolService.getRol(this.rolId)
      .subscribe(response => (
        this.rol = response.data,
        this.form.controls[this.formNombre].setValue(this.rol['nombre']),
        this.form.controls[this.formDescripcion].setValue(this.rol['descripcion'])
        ));
    }
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const rol: Rol = {
        nombre: this.form.get(this.formNombre).value,
        descripcion: this.form.get(this.formDescripcion).value,
        estadoSql: 1
      };
      
      this.rolService.saveRol(rol)
      .subscribe((data) => {
        this.router.navigate(['/rol']);
      });
    }
    if(this.actionType === 'Edit'){
      const rol: Rol = {
        id: this.rol['id'],
        nombre: this.form.get(this.formNombre).value,
        descripcion: this.form.get(this.formDescripcion).value,
        estadoSql: this.rol['estadoSql']
      };
      this.rolService.updateRol(rol.id, rol)
        .subscribe((data) => {
          this.router.navigate(['/rol']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/rol']);
  }
  get nombre(){ return this.form.get(this.formNombre); }
  get descripcion(){ return this.form.get(this.formDescripcion); }

}
