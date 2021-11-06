import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso';
import { Observable } from 'rxjs';
import { ParaleloService } from '../../services/paralelo.service';

@Component({
  selector: 'app-curso-addedit',
  templateUrl: './curso-addedit.component.html',
  styleUrls: ['./curso-addedit.component.css']
})
export class CursoAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formNombre: string;
  formNivel: string;
  formTurno: string;
  formDescripcion: string;
  formIdParalelo;
  cursoId: number;
  errorMessage: any;
  curso: [];
  public listaSelect: any[];

  constructor( private cursoService: CursoService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router, private serviceParalelo: ParaleloService) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNombre = 'nombre';
    this.formNivel = 'nivel';
    this.formTurno = 'turno';
    this.formDescripcion = 'descripcion';
    this.formIdParalelo = 'idParalelo';

    if (this.avRoute.snapshot.params[idParam]){
      this.cursoId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        cursoId: 0,
        nombre: ['', [Validators.required]],
        nivel: ['', [Validators.required]],
        turno: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        idParalelo: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.cursoId > 0){
      this.actionType = 'Edit';
      this.cursoService.getCurso(this.cursoId)
      .subscribe(response => (
        this.curso = response.data,
        this.form.controls[this.formNombre].setValue(this.curso['nombre']),
        this.form.controls[this.formNivel].setValue(this.curso['nivel']),
        this.form.controls[this.formTurno].setValue(this.curso['turno']),
        this.form.controls[this.formDescripcion].setValue(this.curso['descripcion']),
        this.form.controls[this.formIdParalelo].setValue(this.curso['idParalelo'])
        ));
    }
    this.ListaSelect();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const curso: Curso = {
        nombre: this.form.get(this.formNombre).value,
        nivel: this.form.get(this.formNivel).value,
        turno: this.form.get(this.formTurno).value,
        descripcion: this.form.get(this.formDescripcion).value,
        idParalelo: Number(this.form.get(this.formIdParalelo).value),
        estadoSql: 1
      };
      
      this.cursoService.saveCurso(curso)
      .subscribe((data) => {
        this.router.navigate(['/curso']);
      });
    }
    if(this.actionType === 'Edit'){
      const curso: Curso = {
        id: this.curso['id'],
        nombre: this.form.get(this.formNombre).value,
        nivel: this.form.get(this.formNivel).value,
        turno: this.form.get(this.formTurno).value,
        descripcion: this.form.get(this.formDescripcion).value,
        idParalelo: this.form.get(this.formIdParalelo).value,
        estadoSql: this.curso['estadoSql']
      };
      this.cursoService.updateCurso(curso.id, curso)
        .subscribe((data) => {
          this.router.navigate(['/curso']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/inicio']);
  }
  get nombre(){ return this.form.get(this.formNombre); }
  get nivel(){ return this.form.get(this.formNivel); }
  get turno(){ return this.form.get(this.formTurno); }
  get descripcion(){ return this.form.get(this.formDescripcion); }
  get idParalelo(){ return this.form.get(this.formIdParalelo); }
  
  ListaSelect(){
    this.serviceParalelo.getParalelos().subscribe(response=>{
      this.listaSelect=response.data;
    });
  }
}
