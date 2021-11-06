import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AsistenciaService } from '../../services/asistencia.service';
import { MateriaService } from '../../services/materia.service';
import { EstudianteService } from '../../services/estudiante.service';
import { PeriodoService } from '../../services/periodo.service';
import { Asistencia } from '../../models/asistencia';
import { CursoService } from 'src/app/services/curso.service';

import { EstudianteCursoService} from '../../services/estudiante-curso.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista-estudiantes.component.html',
  styleUrls: ['./lista-estudiantes.component.css']
})
export class ListaEstudiantesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  form: FormGroup;
  actionType: string;
  formEstado: string;
  formIdCurso;
  formIdEstudiante;
  formIdMateria;
  formIdPeriodo;

  asistenciaId: number;
  errorMessage: any;
  asistencia: [];

  public listaSelectEstudiante: any[];
  public listaSelectCurso: any[];
  public listaSelectMateria: any[];
  public listaSelectPeriodo: any[];
  public estudianteCursoLista!: any[];

  displayedColumns: string[] = ['id', 'idCurso', 'idEstudiante', "estado", "asistencia", 'editar', 'eliminar',];
  dataSource: MatTableDataSource<any>;

  //Buscar profesor
  encontrado;

  constructor(private estudianteCursoService: EstudianteCursoService, private asistenciaService: AsistenciaService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService,
    private periodoService: PeriodoService,
    private cursoService: CursoService) { 

    const idParam = 'id';
    this.actionType = 'Add';
    this.formEstado = 'estado';
    this.formIdCurso = 'idCurso';
    this.formIdEstudiante = 'idEstudiante';
    this.formIdMateria = 'idMateria';
    this.formIdPeriodo = 'idPeriodo';

    if (this.avRoute.snapshot.params[idParam]){
      this.asistenciaId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        asistenciaId: 0,
        estado: ['', [Validators.required]],
        idEstudiante: new FormControl({value: '', disabled: true}),
        idCurso: ['', [Validators.required]],
        idMateria: ['', [Validators.required]],
        idPeriodo: ['', [Validators.required]],

        estudianteCursoId: 0,
        encontrado: 0,
      }
    )

  }

  ngOnInit(): void {
    this.ListaSelectCurso();
    this.ListaSelectMateria();
    this.ListaSelectPeriodo();
    this.ListaSelectEstudiante();
  }

  ListaEstudianteCursos(encontrado, ide){
    this.estudianteCursoService.getIdCurso(encontrado, ide).subscribe(response =>{
      this.estudianteCursoLista=response.data;
      this.dataSource = new MatTableDataSource(this.estudianteCursoLista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
  }

  ListaSelectEstudiante(){
    this.estudianteService.getEstudiantes().subscribe(response=>{
      this.listaSelectEstudiante=response.data;
    });
  }
  ListaSelectCurso(){
    this.cursoService.getCursos().subscribe(response=>{
      this.listaSelectCurso=response.data;
    });
  }
  ListaSelectMateria(){
    this.materiaService.getMaterias().subscribe(response=>{
      this.listaSelectMateria=response.data;
    });
  }
  ListaSelectPeriodo(){
    this.periodoService.getPeriodos().subscribe(response=>{
      this.listaSelectPeriodo=response.data;
    });
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const asistencia: Asistencia = {
        fecha: new Date(),
        estado: this.form.get(this.formEstado).value,
        descripcion: "Descripcion",
        idCurso: Number(this.form.get(this.formIdCurso).value),
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        idMateria:  Number(this.form.get(this.formIdMateria).value),
        idPeriodo:  Number(this.form.get(this.formIdPeriodo).value),
        estadoSql: 1
      };
      
      this.asistenciaService.saveAsistencia(asistencia)
      .subscribe((data) => {
        //this.router.navigate(['/listaEstudiantes']);
      });
    }
  }

  delete(estudianteCursoId){
    const res = confirm('Quiere eliminar el EstudianteCurso con Id: ' + estudianteCursoId);
    if(res){
      this.estudianteCursoService.deleteEstudianteCurso(estudianteCursoId).subscribe((data) => {
        this.ListaEstudianteCursos(estudianteCursoId, estudianteCursoId);
      });
    }
  }

  get estado(){ return this.form.get(this.formEstado); }
  get idCurso(){ return this.form.get(this.formIdCurso); }
  get idEstudiante(){ return this.form.get(this.formIdEstudiante); }
  get idMateria(){ return this.form.get(this.formIdMateria); }
  get idPeriodo(){ return this.form.get(this.formIdPeriodo); }

  applyFilter(id){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  buscar(encontrar){
    this.encontrado = encontrar; 
    this.ListaEstudianteCursos(encontrar, encontrar);
  }

  //Obtener estudiante
  estudiante(estudiante){
    this.form.controls[this.formIdEstudiante].setValue(estudiante)
  }

  listaGuardar(obj){
    
      for(let i in obj){
        const asistencia: Asistencia = {
        fecha: new Date(),
        estado: this.form.get(this.formEstado).value,
        descripcion: "Descripcion",
        idCurso: Number(this.form.get(this.formIdCurso).value),
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        idMateria:  Number(this.form.get(this.formIdMateria).value),
        idPeriodo:  Number(this.form.get(this.formIdPeriodo).value),
        estadoSql: 1
      };
      
      this.asistenciaService.saveAsistencia(asistencia)
      .subscribe((data) => {
        //this.router.navigate(['/listaEstudiantes']);
      });
    }
    
  }
  
}
