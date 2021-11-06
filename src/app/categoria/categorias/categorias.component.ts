
import { CategoriaService} from '../../services/categoria.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  public categoriasLista: any[];
  constructor(private categoriaService: CategoriaService){}

  ngOnInit(): void {
    this.ListaCategorias();
  }

  ListaCategorias(){
    this.categoriaService.getCategorias().subscribe(response =>
      {
        this.categoriasLista = response.data;
        this.dataSource = new MatTableDataSource(this.categoriasLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(categoriaId){
    const res = confirm('Quiere eliminar la categoria con Id: ' + categoriaId);
    if(res){
      this.categoriaService.deleteCategoria(categoriaId).subscribe((data) => {
        this.ListaCategorias();
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