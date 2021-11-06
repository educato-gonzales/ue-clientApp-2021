import { Observable } from 'rxjs';
import { MateriaDictadaService} from '../../services/materia-dictada.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ProfesorService } from '../../services/profesor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-materia-dictadas',
  templateUrl: './materia-dictadas.component.html',
  styleUrls: ['./materia-dictadas.component.css']
})
export class MateriaDictadasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public materiaDictadasLista: any[];

  displayedColumns: string[] = ['id','idProfesor', 'idMateria', 'idCurso', 'idHorario', 'idPeriodo', 'descripcion' ,'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;
  // SELECT 
  formIdProfesor;
  public listaSelectProfesor: any[];
  form: FormGroup;

  encontrado;

  constructor(private materiaDictadaService: MateriaDictadaService, private serviceProfesor: ProfesorService,private formBuilder: FormBuilder){
    this.formIdProfesor = 'idProfesor';

    this.form = this.formBuilder.group(
      {
        idProfesor: ['', [Validators.required]],
        encontrado: 0,
      }
    )
  }

  ngOnInit(): void {
    this.ListaSelectProfesor();
  }

  ListaMateriaDictadas(encontrado, ide){
    this.materiaDictadaService.getIdProfesor(encontrado, ide).subscribe(response =>
      {
        this.materiaDictadasLista = response.data;
        this.dataSource = new MatTableDataSource(this.materiaDictadasLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  ListaSelectProfesor(){
    this.serviceProfesor.getProfesores().subscribe(response=>{
      this.listaSelectProfesor=response.data;
    });
  }

  delete(materiaDictadaId){
    const res = confirm('Quiere eliminar la Materia Dictada con Id: ' + materiaDictadaId);
    if(res){
      this.materiaDictadaService.deleteMateriaDictada(materiaDictadaId).subscribe((data) => {
        this.ListaMateriaDictadas(materiaDictadaId, materiaDictadaId);
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

  get idProfesor(){ return this.form.get(this.formIdProfesor); }

  buscar(encontrar){
    this.encontrado = encontrar; 
    this.ListaMateriaDictadas(encontrar, encontrar);
  }
}
