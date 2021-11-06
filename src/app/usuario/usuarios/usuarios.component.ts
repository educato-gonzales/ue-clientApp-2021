import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { Response } from '../../models/response';
import { UsuarioService} from '../../services/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public usuariosLista: any[];

  displayedColumns: string[] = ['id', 'nombre', 'clave','estado', 'entidad', 'idRef', 'idRol', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  
  constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.ListaUsuarios();
  }

  ListaUsuarios(){
    this.usuarioService.getUsuarios().subscribe(response =>
      {
        this.usuariosLista = response.data;
        this.dataSource = new MatTableDataSource(this.usuariosLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(usuarioId){
    const res = confirm('Quiere eliminar la usuario con Id: ' + usuarioId);
    if(res){
      this.usuarioService.deleteUsuario(usuarioId).subscribe((data) => {
        this.ListaUsuarios();
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
