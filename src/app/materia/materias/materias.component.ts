import { Observable } from 'rxjs';
import { Materia } from '../../models/materia';
import { Response } from '../../models/response';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MateriaService} from '../../services/materia.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'sigla', 'nombre',"nivel","descripcion", 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  public materiasLista: any[];
  constructor(private materiaService: MateriaService){}

  ngOnInit(): void {
    this.ListaMaterias();
  }

  ListaMaterias(){
    this.materiaService.getMaterias().subscribe(response =>
      {
        this.materiasLista = response.data;
        this.dataSource = new MatTableDataSource(this.materiasLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(materiaId){
    const res = confirm('Quiere eliminar la materia con Id: ' + materiaId);
    if(res){
      this.materiaService.deleteMateria(materiaId).subscribe((data) => {
        this.ListaMaterias();
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
