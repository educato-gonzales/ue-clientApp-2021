import { Observable } from 'rxjs';
import { RolService} from '../../services/rol.service';
import { Rol } from '../../models/rol';
import { Response } from '../../models/response';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public rolesLista!: any[];

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  constructor(private rolService: RolService){}

  ngOnInit(): void {
    this.ListaRoles();
  }

  ListaRoles(){
    this.rolService.getRoles().subscribe(response =>{
      this.rolesLista=response.data;
      this.dataSource = new MatTableDataSource(this.rolesLista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
  }

  delete(rolId){
    const res = confirm('Quiere eliminar el Rol con Id: ' + rolId);
    if(res){
      this.rolService.deleteRol(rolId).subscribe((data) => {
        this.ListaRoles();
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
