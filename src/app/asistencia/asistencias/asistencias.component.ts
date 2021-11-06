import { Observable } from 'rxjs';
import { AsistenciaService} from '../../services/asistencia.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public asistenciasLista!: any[];

  displayedColumns: string[] = ['id', 'fecha', "estado", 'descripcion',"idCurso", "idEstudiante", "idMateria", "idPeriodo",'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  constructor(private asistenciaService: AsistenciaService){}

  ngOnInit(): void {
    this.ListaAsistencias();
  }

  ListaAsistencias(){
    this.asistenciaService.getAsistencias().subscribe(response =>{
      this.asistenciasLista=response.data;
      this.dataSource = new MatTableDataSource(this.asistenciasLista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

        //this.asistenciasLista = response.data;
      });
  }

  delete(asistenciaId){
    const res = confirm('Quiere eliminar el Asistencia con Id: ' + asistenciaId);
    if(res){
      this.asistenciaService.deleteAsistencia(asistenciaId).subscribe((data) => {
        this.ListaAsistencias();
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
