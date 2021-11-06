import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { InstitucionService} from '../../services/institucion.service';
import { Institucion } from '../../models/institucion';
import { Response } from '../../models/response';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public institucionesLista: any[];

  displayedColumns: string[] = ['id', 'codUe', 'nombreUe','numResolucionAdm1', 'fechaResolucionAdm1', 'codDistritoEducativo', 'nombreDistritoEducativo', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;
  
  constructor(private institucionService: InstitucionService){}

  ngOnInit(): void {
    this.ListaInstituciones();
  }

  ListaInstituciones(){
    this.institucionService.getInstituciones().subscribe(response =>
      {
        this.institucionesLista = response.data;
        this.dataSource = new MatTableDataSource(this.institucionesLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(institucionId){
    const res = confirm('Quiere eliminar la Institucion con Id: ' + institucionId);
    if(res){
      this.institucionService.deleteInstitucion(institucionId).subscribe((data) => {
        this.ListaInstituciones();
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
