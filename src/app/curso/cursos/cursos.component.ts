import { Observable } from 'rxjs';
import { CursoService} from '../../services/curso.service';
import { Curso } from '../../models/curso';
import { Response } from '../../models/response';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'nombre', 'nivel',"turno","descripcion", 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  public cursosLista: any[];
  constructor(private cursoService: CursoService){}

  ngOnInit(): void {
    this.ListaCursos();
  }

  ListaCursos(){
    this.cursoService.getCursos().subscribe(response =>
      {
        this.cursosLista = response.data;
        this.dataSource = new MatTableDataSource(this.cursosLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(cursoId){
    const res = confirm('Quiere eliminar la curso con Id: ' + cursoId);
    if(res){
      this.cursoService.deleteCurso(cursoId).subscribe((data) => {
        this.ListaCursos();
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
