import { Component, OnInit, ViewChild } from '@angular/core';
import { RudeService} from '../../services/rude.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-rudes',
  templateUrl: './rudes.component.html',
  styleUrls: ['./rudes.component.css']
})
export class RudesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public rudesLista: any[];

  displayedColumns: string[] = ['id','codSieue', 'pais', 'departamento', 'provincia', 'localidad','oficialia', 'libro', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  constructor(private rudeService: RudeService){}

  ngOnInit(): void {
    this.ListaRudes();
  }

  ListaRudes(){
    this.rudeService.getRudes().subscribe(response =>
      {
        this.rudesLista = response.data;
        this.dataSource = new MatTableDataSource(this.rudesLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(rudeId){
    const res = confirm('Quiere eliminar la materia con Id: ' + rudeId);
    if(res){
      this.rudeService.deleteRude(rudeId).subscribe((data) => {
        this.ListaRudes();
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

