import { ParaleloService} from '../../services/paralelo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-paralelos',
  templateUrl: './paralelos.component.html',
  styleUrls: ['./paralelos.component.css']
})
export class ParalelosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', "nombre", 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  public paralelosLista: any[];
  constructor(private paraleloService: ParaleloService){}

  ngOnInit(): void {
    this.ListaParalelos();
  }

  ListaParalelos(){
    this.paraleloService.getParalelos().subscribe(response =>
      {
        this.paralelosLista = response.data;
        this.dataSource = new MatTableDataSource(this.paralelosLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(paraleloId){
    const res = confirm('Quiere eliminar la paralelo con Id: ' + paraleloId);
    if(res){
      this.paraleloService.deleteParalelo(paraleloId).subscribe((data) => {
        this.ListaParalelos();
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
