import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoevaluacionService} from '../../services/autoevaluacion.service';
import { Autoevaluacion } from '../../models/autoevaluacion';
import { Response } from '../../models/response';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-autoevaluaciones',
  templateUrl: './autoevaluaciones.component.html',
  styleUrls: ['./autoevaluaciones.component.css']
})
export class AutoevaluacionesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public autoevaluacionesLista: any[];

  displayedColumns: string[] = ['id','notaSer', 'notaDecidir', 'idEvalPoseedor', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  constructor(private autoevaluacionService: AutoevaluacionService){}

  ngOnInit(): void {
    this.ListaAutoevaluaciones();
  }

  ListaAutoevaluaciones(){
    this.autoevaluacionService.getAutoevaluaciones().subscribe(response =>
      {
        this.autoevaluacionesLista = response.data;
        this.dataSource = new MatTableDataSource(this.autoevaluacionesLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(autoevaluacionId){
    const res = confirm('Quiere eliminar la autoevaluacion con Id: ' + autoevaluacionId);
    if(res){
      this.autoevaluacionService.deleteAutoevaluacion(autoevaluacionId).subscribe((data) => {
        this.ListaAutoevaluaciones();
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

