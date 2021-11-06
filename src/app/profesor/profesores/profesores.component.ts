import { Observable } from 'rxjs';
import { ProfesorService} from '../../services/profesor.service';
import { Profesor } from '../../models/profesor';
import { Response } from '../../models/response';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public profesoresLista: any[];

  displayedColumns: string[] = ['id', 'cedulaIdentidad', 'apPaterno', 'apMaterno', 'nombres', 'tituloProfesional', 'telefono','celular', 'correo',  'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;


  constructor(private profesorService: ProfesorService){}

  ngOnInit(): void {
    this.ListaProfesores();
  }

  ListaProfesores(){
    this.profesorService.getProfesores().subscribe(response =>
      {
        this.profesoresLista = response.data;
        this.dataSource = new MatTableDataSource(this.profesoresLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(profesorId){
    const res = confirm('Quiere eliminar la  profesor con Id: ' + profesorId);
    if(res){
      this.profesorService.deleteProfesor(profesorId).subscribe((data) => {
        this.ListaProfesores();
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
