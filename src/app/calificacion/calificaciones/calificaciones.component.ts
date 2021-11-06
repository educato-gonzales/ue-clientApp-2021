import { Observable } from 'rxjs';
import { CalificacionService} from '../../services/calificacion.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public calificacionesLista!: any[];

  displayedColumns: string[] = ['id', 'nota', 'idEstudiante', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  constructor(private calificacionService: CalificacionService){}

  ngOnInit(): void {
    this.ListaCalificaciones();
  }

  ListaCalificaciones(){
    this.calificacionService.getCalificaciones().subscribe(response =>{
      this.calificacionesLista=response.data;
      this.dataSource = new MatTableDataSource(this.calificacionesLista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
  }

  delete(calificacionId){
    const res = confirm('Quiere eliminar la calificacion con Id: ' + calificacionId);
    if(res){
      this.calificacionService.deleteCalificacion(calificacionId).subscribe((data) => {
        this.ListaCalificaciones();
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