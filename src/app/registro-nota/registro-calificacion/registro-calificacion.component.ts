import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotaService } from '../../services/nota.service';
import { Nota } from '../../models/nota';
import { Observable } from 'rxjs';
import { CursoService } from '../../services/curso.service';
import { PeriodoService } from '../../services/periodo.service';
import { MateriaService } from '../../services/materia.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-registro-calificacion',
  templateUrl: './registro-calificacion.component.html',
  styleUrls: ['./registro-calificacion.component.css']
})
export class RegistroCalificacionComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formNotas;
  formDescripcion: string;
  formIdCurso;
  formidPeriodo;
  formIdMateria;
  formIdCategoria;
  notaId: number;
  errorMessage: any;
  nota: [];
  public listaSelectCurso: any[];
  public listaSelectPeriodo: any[];
  public listaSelectMateria: any[];
  public listaSelectCategoria: any[];
  // Capturando IdRef
  navigation; 
  //Para obtener el IdEvalPoseedor
  public listId: any [];


  constructor( private notaService: NotaService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private serviceCurso: CursoService,
    private servicePeriodo: PeriodoService,
    private serviceMateria: MateriaService,
    private serviceCategoria: CategoriaService) {

    const idParam = 'id';
    this.actionType = 'Add';
    this.formNotas = 'nota1';
    this.formDescripcion = 'descripcion';
    this.formIdCurso = 'idCurso';
    this.formidPeriodo = 'idPeriodo';
    this.formIdMateria = 'idMateria';
    this.formIdCategoria = "idCategoria";

    //Capturando IdRef
    this.navigation  = localStorage.getItem('IdRef');
    
    if (this.avRoute.snapshot.params[idParam]){
      this.notaId = this.avRoute.snapshot.params[idParam];
     
    }

    this.form = this.formBuilder.group(
      { //Capturando IdRef
        navigation:0,
        //esto es para registrar lo de la vista que se necesita
        notaId: 0,
        nota1: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        idCurso: ['', [Validators.required]],
        idPeriodo: ['', [Validators.required]],
        idMateria: ['', [Validators.required]],
        idCategoria: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    console.log(localStorage.getItem('IdRef'));
    if (this.notaId > 0){
      this.actionType = 'Edit';
      this.notaService.getNota(this.notaId)
      .subscribe(response => (
        this.nota = response.data,
        this.form.controls[this.formNotas].setValue(this.nota['nota1']),
        this.form.controls[this.formDescripcion].setValue(this.nota['descripcion']),
        this.form.controls[this.formIdCurso].setValue(this.nota['idCurso']),
        this.form.controls[this.formidPeriodo].setValue(this.nota['idPeriodo']),
        this.form.controls[this.formIdMateria].setValue(this.nota['idMateria']),
        this.form.controls[this.formIdCategoria].setValue(this.nota['idCategoria'])
        ));
    }

    this.ListaSelectCurso();
    this.ListaSelectPeriodo();
    this.ListaSelectMateria();
    this.ListaSelectCategoria();
    
  }


  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const nota: Nota = {
        fecha: new Date(),
        nota1: this.form.get(this.formNotas).value,
        descripcion: this.form.get(this.formDescripcion).value,
        idCurso: Number(this.form.get(this.formIdCurso).value),
        idPeriodo: Number(this.form.get(this.formidPeriodo).value),
        idMateria: Number(this.form.get(this.formIdMateria).value),
        idCategoria: Number(this.form.get(this.formIdCategoria).value),
        idRef: Number(this.navigation),
        estadoSql: 1
      };
      
      this.notaService.saveNota(nota)
      .subscribe((data) => {
        //Para obtener el IdEvalPoseedor
        this.listId = data.data;
        this.router.navigate(['/addCalificacion/', this.listId['id']]);
      });
    }
  }


  cancel(){
    this.router.navigate(['/registro-nota']);
  }

  get nota1(){ return this.form.get(this.formNotas); }
  get descripcion(){ return this.form.get(this.formDescripcion); }
  get idCurso(){ return this.form.get(this.formIdCurso); }
  get idPeriodo(){ return this.form.get(this.formidPeriodo); }
  get idMateria(){ return this.form.get(this.formIdMateria); }
  get idCategoria(){ return this.form.get(this.formIdCategoria); }

   ListaSelectCurso(){
      this.serviceCurso.getCursos().subscribe(response=>{
        this.listaSelectCurso=response.data;
      });
    }
     ListaSelectPeriodo(){
      this.servicePeriodo.getPeriodos().subscribe(response=>{
        this.listaSelectPeriodo=response.data;
      });
    }
     ListaSelectMateria(){
      this.serviceMateria.getMaterias().subscribe(response=>{
        this.listaSelectMateria=response.data;
      });
    }
     ListaSelectCategoria(){
      this.serviceCategoria.getCategorias().subscribe(response=>{
        this.listaSelectCategoria=response.data;
      });
    }
}
