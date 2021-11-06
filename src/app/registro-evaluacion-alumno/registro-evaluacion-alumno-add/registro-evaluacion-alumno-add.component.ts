import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EvaluacionProfesorService } from '../../services/evaluacion-profesor.service';
import { EvaluacionProfesor } from '../../models/evaluacionProfesor';
import { NotaService } from '../../services/nota.service';
import { EstudianteService } from '../../services/estudiante.service';



import { EstudianteCursoService} from '../../services/estudiante-curso.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-registro-evaluacion-alumno-add',
  templateUrl: './registro-evaluacion-alumno-add.component.html',
  styleUrls: ['./registro-evaluacion-alumno-add.component.css']
})
export class RegistroEvaluacionAlumnoAddComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  form: FormGroup;
  actionType: string;
  formNotaSer;
  formNotaDecidir;
  formIdEstudiante;
  formIdEvalPoseedor;
  evaluacionProfesorId;
  errorMessage: any;
  evaluacionProfesor: [];
  //Selects
  public listaSelect: any[];
  public listaSelectEstudiante: any[];
  //Para obtener IdEvalPoseedor 
  listaId;

  displayedColumns: string[] = ['id', 'idCurso', 'idEstudiante',"notaSer","notaDecidir","calificar", 'editar'];
  dataSource: MatTableDataSource<any>;

  //Buscar profesor
  encontrado;
  public estudianteCursoLista!: any[];
  public listaSelectCurso: any[];
  formIdCurso;

  constructor(private evaluacionProfesorService: EvaluacionProfesorService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private serviceNota: NotaService,
    private estudianteService: EstudianteService,
    private estudianteCursoService: EstudianteCursoService,
    private cursoService: CursoService) {

    this.actionType = 'Add';
    this.formNotaSer = 'notaSer';
    this.formNotaDecidir = 'notaDecidir';
    this.formIdEvalPoseedor = 'idEvalPoseedor';
    this.formIdEstudiante = 'idEstudiante';
    this.formIdCurso = 'idCurso';
    //Para obtener IdEvalPoseedor 
    const listaIdParam = 'id';


    //Para obtener IdEvalPoseedor 
    if (this.avRoute.snapshot.params[listaIdParam]){
      this.listaId = this.avRoute.snapshot.params[listaIdParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        evaluacionProfesorId: 0,
        notaSer: ['', [Validators.required]],
        notaDecidir: ['', [Validators.required]],
        idEstudiante: new FormControl({value: '', disabled: true}),
        idEvalPoseedor: new FormControl({value: '', disabled: true}),
      
        idCurso: ['', [Validators.required]],
        estudianteCursoId: 0,
        encontrado: 0,
      }
    );

  }

  ngOnInit(): void {
    if (this.listaId > 0){
      console.log(this.listaId);
      this.form.controls[this.formIdEvalPoseedor].setValue(this.listaId),

      this.evaluacionProfesorService.getEvaluacionProfesor(this.evaluacionProfesorId)
      .subscribe(response => (
        this.evaluacionProfesor = response.data,
        this.form.controls[this.formNotaSer].setValue(this.evaluacionProfesor['notaSer']),
        this.form.controls[this.formNotaDecidir].setValue(this.evaluacionProfesor['notaDecidir']),
        this.form.controls[this.formIdEstudiante].setValue(this.evaluacionProfesor['idEstudiante']),
        this.form.controls[this.formIdEvalPoseedor].setValue(this.evaluacionProfesor['idEvalPoseedor']),
        this.actionType = 'Edit'
        ));
    }
    this.ListaSelect();
    this.ListaSelectEstudiante();
    this.ListaSelectCurso();

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

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const evaluacionProfesor: EvaluacionProfesor = {
        notaSer: this.form.get(this.formNotaSer).value,
        notaDecidir: this.form.get(this.formNotaDecidir).value,
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        idEvalPoseedor: Number(this.form.get(this.formIdEvalPoseedor).value),
        estadoSql: 1
      };
      
      this.evaluacionProfesorService.saveEvaluacionProfesor(evaluacionProfesor)
      .subscribe((data) => {
        //this.router.navigate(['/registro-nota']);
      });
    }
  }

  cancel(){
    this.router.navigate(['/registro-nota']);
  }

  delete(estudianteCursoId){
    const res = confirm('Quiere eliminar el EstudianteCurso con Id: ' + estudianteCursoId);
    if(res){
      this.estudianteCursoService.deleteEstudianteCurso(estudianteCursoId).subscribe((data) => {
        this.ListaEstudianteCursos(estudianteCursoId, estudianteCursoId);
      });
    }
  }

  //Obtener estudiante
  estudiante(estudiante){
    this.form.controls[this.formIdEstudiante].setValue(estudiante)
  }

  get notaSer(){ return this.form.get(this.formNotaSer); }
  get notaDecidir(){ return this.form.get(this.formNotaDecidir); }
  get idEstudiante(){ return this.form.get(this.formIdEstudiante); }
  get idEvalPoseedor(){ return this.form.get(this.formIdEvalPoseedor); }
  get idCurso(){ return this.form.get(this.formIdCurso); }

  ListaSelect(){
      this.serviceNota.getNotas().subscribe(response=>{
        this.listaSelect=response.data;
      });
  }
  ListaSelectEstudiante(){
    this.estudianteService.getEstudiantes().subscribe(response=>{
      this.listaSelectEstudiante=response.data;
    });
  }

  buscar(encontrar){
    this.encontrado = encontrar; 
    this.ListaEstudianteCursos(encontrar, encontrar);
  }

}
