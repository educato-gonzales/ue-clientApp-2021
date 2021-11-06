import { ParametroService} from '../../services/parametro.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'nombre', 'valor', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  public parametrosLista: any[];
  constructor(private parametroService: ParametroService){}

  ngOnInit(): void {
    this.ListaParametros();
  }

  ListaParametros(){
    this.parametroService.getParametros().subscribe(response =>
      {
        this.parametrosLista = response.data;
        this.dataSource = new MatTableDataSource(this.parametrosLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(parametroId){
    const res = confirm('Quiere eliminar la parametro con Id: ' + parametroId);
    if(res){
      this.parametroService.deleteParametro(parametroId).subscribe((data) => {
        this.ListaParametros();
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