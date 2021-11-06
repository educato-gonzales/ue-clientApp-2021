import { EstudianteCursoService} from '../../services/estudiante-curso.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-estudiante-cursos',
  templateUrl: './estudiante-cursos.component.html',
  styleUrls: ['./estudiante-cursos.component.css']
})
export class EstudianteCursosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public estudianteCursoLista!: any[];

  displayedColumns: string[] = ['id', 'idCurso', 'idEstudiante', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  form: FormGroup;
  formIdCurso: string;
  public listaSelectCurso: any[];
  //Buscar profesor
  encontrado;

  constructor(private estudianteCursoService: EstudianteCursoService, private formBuilder: FormBuilder, private serviceCurso: CursoService){
    this.formIdCurso = 'idCurso';
    this.form = this.formBuilder.group(
      {
        estudianteCursoId: 0,
        idCurso: ['', [Validators.required]],
        encontrado: 0,
      }
    )
  }

  ngOnInit(): void {
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
    this.serviceCurso.getCursos().subscribe(response=>{
      this.listaSelectCurso=response.data;
    });
  }
  
  delete(estudianteCursoId){
    const res = confirm('Quiere eliminar el EstudianteCurso con Id: ' + estudianteCursoId);
    if(res){
      this.estudianteCursoService.deleteEstudianteCurso(estudianteCursoId).subscribe((data) => {
        this.ListaEstudianteCursos(estudianteCursoId, estudianteCursoId);
      });
    }
  }
  

  applyFilter(id){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  get idCurso(){ return this.form.get(this.formIdCurso); }

  

  buscar(encontrar){
    this.encontrado = encontrar; 
    this.ListaEstudianteCursos(encontrar, encontrar);
  }

}
