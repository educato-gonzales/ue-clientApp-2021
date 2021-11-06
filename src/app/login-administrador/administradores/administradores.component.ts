import { Observable } from 'rxjs';
import { AdministradorService} from '../../services/administrador.service';
import { Administrador } from '../../models/administrador';
import { Response } from '../../models/response';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public administradoresLista: any[];

  displayedColumns: string[] = ['id', 'cedulaIdentidad', 'apPaterno', 'apMaterno', 'nombres', "sexo", 'telefono','celular', 'correo',  'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;


  constructor(private administradorService: AdministradorService){}

  ngOnInit(): void {
    this.ListaAdministradores();
  }

  ListaAdministradores(){
    this.administradorService.getAdministradores().subscribe(response =>
      {
        this.administradoresLista = response.data;
        this.dataSource = new MatTableDataSource(this.administradoresLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(administradorId){
    const res = confirm('Quiere eliminar la  administrador con Id: ' + administradorId);
    if(res){
      this.administradorService.deleteAdministrador(administradorId).subscribe((data) => {
        this.ListaAdministradores();
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
