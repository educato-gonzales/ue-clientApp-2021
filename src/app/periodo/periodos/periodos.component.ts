import { PeriodoService} from '../../services/periodo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', "nombre", 'fechaInicio', "fechaFin", "estado", "descripcion", 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  public periodosLista: any[];
  constructor(private periodoService: PeriodoService){}

  ngOnInit(): void {
    this.ListaPeriodos();
  }

  ListaPeriodos(){
    this.periodoService.getPeriodos().subscribe(response =>
      {
        this.periodosLista = response.data;
        this.dataSource = new MatTableDataSource(this.periodosLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(periodoId){
    const res = confirm('Quiere eliminar la  periodo con Id: ' + periodoId);
    if(res){
      this.periodoService.deletePeriodo(periodoId).subscribe((data) => {
        this.ListaPeriodos();
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
