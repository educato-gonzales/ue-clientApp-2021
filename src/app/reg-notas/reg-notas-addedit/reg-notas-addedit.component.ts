import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotasService } from '../../services/notas.service';
import { Notas } from '../../models/notas';
import { Observable } from 'rxjs';
import { EstudianteService } from '../../services/estudiante.service';
import { CursoService } from '../../services/curso.service';
import { PeriodoService } from '../../services/periodo.service';
import { MateriaService } from '../../services/materia.service';
import { CategoriaService } from '../../services/categoria.service';

import { EstudianteCursoService} from '../../services/estudiante-curso.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reg-notas-addedit',
  templateUrl: './reg-notas-addedit.component.html',
  styleUrls: ['./reg-notas-addedit.component.css']
})
export class RegNotasAddeditComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'idCurso', 'idEstudiante', "nota", "calificar"];
  dataSource: MatTableDataSource<any>;
  //Buscar profesor
  encontrado;
  public estudianteCursoLista!: any[];

  form: FormGroup;
  actionType: string;

  formDescripcion: string;
  formIdCurso;
  formidPeriodo;
  formIdMateria;
  formIdCategoria;
  formIdEstudiante;
  formNota;

  notasId: number;
  errorMessage: any;
  notas: [];

  public listaSelectCurso: any[];
  public listaSelectPeriodo: any[];
  public listaSelectMateria: any[];
  public listaSelectCategoria: any[];
  public listaSelectEstudiante: any[];

   // Capturando IdRef
   navigation; 

  constructor( private notasService: NotasService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private serviceCurso: CursoService,
    private servicePeriodo: PeriodoService,
    private serviceMateria: MateriaService,
    private serviceCategoria: CategoriaService,
    private serviceEstudiante: EstudianteService,
    private estudianteCursoService: EstudianteCursoService) { 
      
    const idParam = 'id';
    this.actionType = 'Add';
    this.formDescripcion = 'descripcion';
    this.formIdCurso = 'idCurso';
    this.formidPeriodo = 'idPeriodo';
    this.formIdMateria = 'idMateria';
    this.formIdCategoria = 'idCategoria';
    this.formIdEstudiante = 'idEstudiante';
    this.formNota = 'nota';

    //Capturando IdRef
    this.navigation  = localStorage.getItem('IdRef');

    if (this.avRoute.snapshot.params[idParam]){
      this.notasId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        notasId: 0,
        descripcion: ['', [Validators.required]],
        idCurso: ['', [Validators.required]],
        idPeriodo: ['', [Validators.required]],
        idMateria: ['', [Validators.required]],
        idCategoria: ['', [Validators.required]],
        idEstudiante: ['', [Validators.required]],
        nota: ['', [Validators.required]],
        //Capturando IdRef
        navigation:0,
        //
        estudianteCursoId: 0,
        encontrado: 0,
      }
    )

  }

  ngOnInit(): void {
    if (this.notasId > 0){
      this.actionType = 'Edit';
      this.notasService.getNotas(this.notasId)
      .subscribe(response => (
        this.notas = response.data,
        this.form.controls[this.formDescripcion].setValue(this.notas['descripcion']),
        this.form.controls[this.formIdCurso].setValue(this.notas['idCurso']),
        this.form.controls[this.formidPeriodo].setValue(this.notas['idPeriodo']),
        this.form.controls[this.formIdMateria].setValue(this.notas['idMateria']),
        this.form.controls[this.formIdCategoria].setValue(this.notas['idCategoria']),
        this.form.controls[this.formIdEstudiante].setValue(this.notas['idEstudiante']),
        this.form.controls[this.formNota].setValue(this.notas['nota'])
        ));
    }
    this.ListaSelectCurso();
    this.ListaSelectPeriodo();
    this.ListaSelectMateria();
    this.ListaSelectCategoria();
    this.ListaSelectEstudiante();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const notas: Notas = {
        fecha: new Date(),
        descripcion: this.form.get(this.formDescripcion).value,
        idCurso: Number(this.form.get(this.formIdCurso).value),
        idPeriodo: Number(this.form.get(this.formidPeriodo).value),
        idMateria: Number(this.form.get(this.formIdMateria).value),
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        idCategoria: Number(this.form.get(this.formIdCategoria).value),
        idRef: Number(this.navigation),
        nota: this.form.get(this.formNota).value,
        estadoSql: 1
      };
      
      this.notasService.saveNotas(notas)
      .subscribe((data) => {
      });
    }
    if(this.actionType === 'Edit'){
      const notas: Notas = {
        id: this.notas['id'],
        fecha: new Date(),
        descripcion: this.form.get(this.formDescripcion).value,
        idCurso: Number(this.form.get(this.formIdCurso).value),
        idPeriodo: Number(this.form.get(this.formidPeriodo).value),
        idMateria: Number(this.form.get(this.formIdMateria).value),
        idEstudiante: this.form.get(this.formIdEstudiante).value,
        idCategoria: Number(this.form.get(this.formIdCategoria).value),
        idRef: Number(this.navigation),
        nota: this.form.get(this.formNota).value,
        estadoSql: this.notas['estadoSql']
      };
      this.notasService.updateNotas(notas.id, notas)
        .subscribe((data) => {
          this.router.navigate(['/regNotas']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/regNotas']);
  }

  delete(estudianteCursoId){
    const res = confirm('Quiere eliminar el EstudianteCurso con Id: ' + estudianteCursoId);
    if(res){
      this.estudianteCursoService.deleteEstudianteCurso(estudianteCursoId).subscribe((data) => {
        this.ListaEstudianteCursos(estudianteCursoId, estudianteCursoId);
      });
    }
  }

  get descripcion(){ return this.form.get(this.formDescripcion); }
  get idCurso(){ return this.form.get(this.formIdCurso); }
  get idPeriodo(){ return this.form.get(this.formidPeriodo); }
  get idMateria(){ return this.form.get(this.formIdMateria); }
  get idCategoria(){ return this.form.get(this.formIdCategoria); }
  get idEstudiante(){ return this.form.get(this.formIdEstudiante); }
  get nota(){ return this.form.get(this.formNota); }

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
  ListaSelectEstudiante(){
    this.serviceEstudiante.getEstudiantes().subscribe(response=>{
      this.listaSelectEstudiante=response.data;
    });
  }

  ListaEstudianteCursos(encontrado, ide){
    this.estudianteCursoService.getIdCurso(encontrado, ide).subscribe(response =>{
      this.estudianteCursoLista=response.data;
      this.dataSource = new MatTableDataSource(this.estudianteCursoLista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
  }

  buscar(encontrar){
    this.encontrado = encontrar; 
    this.ListaEstudianteCursos(encontrar, encontrar);
  }

  //Obtener estudiante
  estudiante(estudiante){
    this.form.controls[this.formIdEstudiante].setValue(estudiante)
  }

}
