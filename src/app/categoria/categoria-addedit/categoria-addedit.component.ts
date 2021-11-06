import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categoria-addedit',
  templateUrl: './categoria-addedit.component.html',
  styleUrls: ['./categoria-addedit.component.css']
})
export class CategoriaAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formNombre: string;
  formDescripcion: string;
  categoriaId: number;
  errorMessage: any;
  categoria: [];

  constructor( private categoriaService: CategoriaService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNombre = 'nombre';
    this.formDescripcion = 'descripcion';
    if (this.avRoute.snapshot.params[idParam]){
      this.categoriaId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        categoriaId: 0,
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
      }
    );

  }

  ngOnInit(): void {
    if (this.categoriaId > 0){
      this.actionType = 'Edit';
      this.categoriaService.getCategoria(this.categoriaId)
      .subscribe(response => (
        this.categoria = response.data,
        this.form.controls[this.formNombre].setValue(this.categoria['nombre']),
        this.form.controls[this.formDescripcion].setValue(this.categoria['descripcion'])
        ));
    }
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const categoria: Categoria = {
        nombre: this.form.get(this.formNombre).value,
        descripcion: this.form.get(this.formDescripcion).value,
        estadoSql: 1
      };
      
      this.categoriaService.saveCategoria(categoria)
      .subscribe((data) => {
        this.router.navigate(['/categoria']);
      });
    }
    if(this.actionType === 'Edit'){
      const categoria: Categoria = {
        id: this.categoria['id'],
        nombre: this.form.get(this.formNombre).value,
        descripcion: this.form.get(this.formDescripcion).value,
        estadoSql: this.categoria['estadoSql']
      };
      this.categoriaService.updateCategoria(categoria.id, categoria)
        .subscribe((data) => {
          this.router.navigate(['/categoria']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/categoria']);
  }

  get nombre(){ return this.form.get(this.formNombre); }
  get descripcion(){ return this.form.get(this.formDescripcion); }

}
