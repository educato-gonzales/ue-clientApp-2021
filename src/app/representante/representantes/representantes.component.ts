import { Observable } from 'rxjs';
import { RepresentanteService} from '../../services/representante.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-representantes',
  templateUrl: './representantes.component.html',
  styleUrls: ['./representantes.component.css']
})
export class RepresentantesComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'parentesco', 'cedulaIdentidad', 'apPaterno', 'apMaterno', 'nombres', 'telefono','celular', 'correo',  'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  public representantesLista: any[];
  constructor(private representanteService: RepresentanteService){}

  ngOnInit(): void {
    this.ListaRepresentantes();
  }

  ListaRepresentantes(){
    this.representanteService.getRepresentantes().subscribe(response =>
      {
        this.representantesLista = response.data;
        this.dataSource = new MatTableDataSource(this.representantesLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(representanteId){
    const res = confirm('Quiere eliminar la representante con Id: ' + representanteId);
    if(res){
      this.representanteService.deleteRepresentante(representanteId).subscribe((data) => {
        this.ListaRepresentantes();
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
