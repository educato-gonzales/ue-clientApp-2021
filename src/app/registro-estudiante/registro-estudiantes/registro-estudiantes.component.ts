import { Observable } from 'rxjs';
import { EstudianteService} from '../../services/estudiante.service';
import { Estudiante } from '../../models/estudiante';
import { Response } from '../../models/response';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-registro-estudiantes',
  templateUrl: './registro-estudiantes.component.html',
  styleUrls: ['./registro-estudiantes.component.css']
})
export class RegistroEstudiantesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public estudiantesLista: any[];

  displayedColumns: string[] = ['id', 'apPaterno', 'apMaterno', 'nombres', 'cedulaIdentidad', 'fechaNacimiento', 'telefono', 'celular', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  constructor(private estudianteService: EstudianteService){}

  ngOnInit(): void {
    this.ListaEstudiantes();
  }

  ListaEstudiantes(){
    this.estudianteService.getEstudiantes().subscribe(response =>
      {
        this.estudiantesLista = response.data;
        this.dataSource = new MatTableDataSource(this.estudiantesLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(estudianteId){
    const res = confirm('Quiere eliminar la estudiante con Id: ' + estudianteId);
    if(res){
      this.estudianteService.deleteEstudiante(estudianteId).subscribe((data) => {
        this.ListaEstudiantes();
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

}
