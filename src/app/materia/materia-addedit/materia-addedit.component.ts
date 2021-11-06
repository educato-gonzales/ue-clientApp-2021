import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from '../../services/materia.service';
import { Materia } from '../../models/materia';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-materia-addedit',
  templateUrl: './materia-addedit.component.html',
  styleUrls: ['./materia-addedit.component.css']
})
export class MateriaAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formSigla: string;
  formNombre: string;
  formNivel: string;
  formDescripcion: string;
  materiaId: number;
  errorMessage: any;
  materia: [];

  constructor( private materiaService: MateriaService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formSigla = 'sigla';
    this.formNombre = 'nombre';
    this.formNivel = 'nivel';
    this.formDescripcion = 'descripcion';

    if (this.avRoute.snapshot.params[idParam]){
      this.materiaId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        materiaId: 0,
        sigla: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
        nivel: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.materiaId > 0){
      this.actionType = 'Edit';
      this.materiaService.getMateria(this.materiaId)
      .subscribe(response => (
        this.materia = response.data,
        this.form.controls[this.formSigla].setValue(this.materia['sigla']),
        this.form.controls[this.formNombre].setValue(this.materia['nombre']),
        this.form.controls[this.formNivel].setValue(this.materia['nivel']),
        this.form.controls[this.formDescripcion].setValue(this.materia['descripcion'])
        ));
    }
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const materia: Materia = {
        sigla: this.form.get(this.formSigla).value,
        nombre: this.form.get(this.formNombre).value,
        nivel: this.form.get(this.formNivel).value,
        descripcion: this.form.get(this.formDescripcion).value,
        estadoSql: 1
      };
      
      this.materiaService.saveMateria(materia)
      .subscribe((data) => {
        this.router.navigate(['/materia']);
      });
    }
    if(this.actionType === 'Edit'){
      const materia: Materia = {
        id: this.materia['id'],
        sigla: this.form.get(this.formSigla).value,
        nombre: this.form.get(this.formNombre).value,
        nivel: this.form.get(this.formNivel).value,
        descripcion: this.form.get(this.formDescripcion).value,
        estadoSql: this.materia['estadoSql']
      };
      this.materiaService.updateMateria(materia.id, materia)
        .subscribe((data) => {
          this.router.navigate(['/materia']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/materia']);
  }
  get sigla(){ return this.form.get(this.formSigla); }
  get nombre(){ return this.form.get(this.formNombre); }
  get nivel(){ return this.form.get(this.formNivel); }
  get descripcion(){ return this.form.get(this.formDescripcion); }

}
