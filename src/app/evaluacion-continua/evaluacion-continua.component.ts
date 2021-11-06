import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotaService } from '../services/nota.service';
import { Nota } from '../models/nota';
import { Observable } from 'rxjs';
import { CursoService } from '../services/curso.service';
import { PeriodoService } from '../services/periodo.service';
import { MateriaService } from '../services/materia.service';
import { CategoriaService } from '../services/categoria.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-evaluacion-continua',
  templateUrl: './evaluacion-continua.component.html',
  styleUrls: ['./evaluacion-continua.component.css']
})
export class EvaluacionContinuaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'sigla', 'nombre',"nivel", "ver",'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  public materiasLista: any[];


  form: FormGroup;
  formIdCurso;
  formidPeriodo;
  formIdCategoria;

  public listaSelectCurso: any[];
  public listaSelectPeriodo: any[];
  public listaSelectCategoria: any[];

  constructor(private serviceCurso: CursoService,
    private servicePeriodo: PeriodoService,
    private serviceMateria: MateriaService,
    private serviceCategoria: CategoriaService,
    private formBuilder: FormBuilder) { 

    this.formIdCurso = 'idCurso';
    this.formidPeriodo = 'idPeriodo';
    this.formIdCategoria = "idCategoria";

      this.form = this.formBuilder.group(
        { //Capturando IdRef
          navigation:0,
          //esto es para registrar lo de la vista que se necesita
          notaId: 0,
          nota1: ['', [Validators.required]],
          descripcion: ['', [Validators.required]],
          idCurso: ['', [Validators.required]],
          idPeriodo: ['', [Validators.required]],
          idCategoria: ['', [Validators.required]],
        }
      )

    }

    get idCurso(){ return this.form.get(this.formIdCurso); }
    get idPeriodo(){ return this.form.get(this.formidPeriodo); }
    get idCategoria(){ return this.form.get(this.formIdCategoria); }
    

  ngOnInit(): void {
    this.ListaMaterias();
    this.ListaSelectCurso();
    this.ListaSelectPeriodo();
    this.ListaSelectCategoria();
  }

  ListaMaterias(){
    this.serviceMateria.getMaterias().subscribe(response =>
      {
        this.materiasLista = response.data;
        this.dataSource = new MatTableDataSource(this.materiasLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

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
   ListaSelectCategoria(){
    this.serviceCategoria.getCategorias().subscribe(response=>{
      this.listaSelectCategoria=response.data;
    });
  }

  delete(materiaId){
    const res = confirm('Quiere eliminar la materia con Id: ' + materiaId);
    if(res){
      this.serviceMateria.deleteMateria(materiaId).subscribe((data) => {
        this.ListaMaterias();
      });
    }
  }

}
