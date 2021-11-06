import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalificacionService } from '../../services/calificacion.service';
import { Calificacion } from '../../models/calificacion';
import { Observable } from 'rxjs';
import { EstudianteService } from '../../services/estudiante.service';
import { NotaService } from '../../services/nota.service';
import { CursoService } from 'src/app/services/curso.service';
import { EstudianteCursoService} from '../../services/estudiante-curso.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-calificacion-addedit',
  templateUrl: './calificacion-addedit.component.html',
  styleUrls: ['./calificacion-addedit.component.css']
})
export class CalificacionAddeditComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  form: FormGroup;
  actionType: string;
  formNota;
  formIdEstudiante;
  formIdEvalPoseedor;
  formIdCurso;
  calificacionId: number;
  errorMessage: any;
  calificacion: [];

  public listaSelectCurso: any[];
  public estudianteCursoLista!: any[];
  //Para obtener IdEvalPoseedor 
  listaId;
  listasId;

  displayedColumns: string[] = ['id', 'idCurso', 'idEstudiante',"calificar", 'editar', 'eliminar',];
  dataSource: MatTableDataSource<any>;
  //Buscar profesor
  encontrado;

  constructor( private calificacionService: CalificacionService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private estudianteService: EstudianteService,
    private notaService: NotaService,
    private cursoService: CursoService,
    private estudianteCursoService: EstudianteCursoService) { 

    const idParam = 'id';
    const idParams = 'ids';
    this.actionType = 'Add';
    this.formNota = 'nota';
    this.formIdEstudiante = 'idEstudiante';
    this.formIdEvalPoseedor = 'idEvalPoseedor';
    this.formIdCurso = 'idCurso';
    //Para obtener IdEvalPoseedor 
    const listaIdParam = 'id';
    const listasIdParam = 'ids';

    //Para obtener IdEvalPoseedor 
    if (this.avRoute.snapshot.params[listaIdParam] || this.avRoute.snapshot.params[listasIdParam]){
      this.listaId = this.avRoute.snapshot.params[listaIdParam];
      this.listasId = this.avRoute.snapshot.params[listasIdParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        calificacionId: 0,
        nota: ['', [Validators.required]],
        idEstudiante: ['', [Validators.required]],
        idEvalPoseedor: ['', [Validators.required]],
        idCurso: ['', [Validators.required]],
        estudianteCursoId: 0,
        encontrado: 0,
      }
    );
  }

  ngOnInit(): void {
    this.form.controls[this.formIdEvalPoseedor].setValue(this.listasId)
    if (this.listaId > 0){
      this.actionType = 'Edit';
      this.calificacionService.getCalificacion(this.listaId)
      .subscribe(response => (
        this.calificacion = response.data,
        this.form.controls[this.formNota].setValue(this.calificacion['nota'])
      ));
    }
    this.ListaSelectCurso();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const calificacion: Calificacion = {
        nota: this.form.get(this.formNota).value,
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        idEvalPoseedor: Number(this.form.get(this.formIdEvalPoseedor).value),
        estadoSql: 1
      };
      
      this.calificacionService.saveCalificacion(calificacion)
      .subscribe((data) => {
      });
    }
    if(this.actionType === 'Edit'){
      const calificacion: Calificacion = {
        id: this.calificacion['id'],
        nota: this.form.get(this.formNota).value,
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        idEvalPoseedor: Number(this.form.get(this.formIdEvalPoseedor).value),
        estadoSql: this.calificacion['estadoSql']
      };
      this.calificacionService.updateCalificacion(calificacion.id, calificacion)
        .subscribe((data) => {
          this.router.navigate(['/calificacion']);
      });
    }
  }

  cancel(){
    this.router.navigate(['/calificacion']);
  }

  delete(estudianteCursoId){
    const res = confirm('Quiere eliminar el EstudianteCurso con Id: ' + estudianteCursoId);
    if(res){
      this.estudianteCursoService.deleteEstudianteCurso(estudianteCursoId).subscribe((data) => {
        this.ListaEstudianteCursos(estudianteCursoId, estudianteCursoId);
      });
    }
  }

  ListaEstudianteCursos(encontrado, ide){
    this.estudianteCursoService.getIdCurso(encontrado, ide).subscribe(response =>{
      this.estudianteCursoLista=response.data;
      this.dataSource = new MatTableDataSource(this.estudianteCursoLista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  ListaSelectCurso(){
    this.cursoService.getCursos().subscribe(response=>{
      this.listaSelectCurso=response.data;
    });
  }

  get nota(){ return this.form.get(this.formNota); }
  get idEstudiante(){ return this.form.get(this.formIdEstudiante); }
  get idEvalPoseedor(){ return this.form.get(this.formIdEvalPoseedor); }
  get idCurso(){ return this.form.get(this.formIdCurso); }

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
}