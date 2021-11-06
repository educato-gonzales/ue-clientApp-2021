import { Observable } from 'rxjs';
import { NotasService} from '../../services/notas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reg-notass',
  templateUrl: './reg-notass.component.html',
  styleUrls: ['./reg-notass.component.css']
})
export class RegNotassComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public notassLista!: any[];

  displayedColumns: string[] = ['id', 'fecha', "descripcion", "idCurso", "idPeriodo", "idMateria","idCategoria",'idEstudiante',"nota", 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  constructor(private notasService: NotasService){}

  ngOnInit(): void {
    this.ListaNotass();
  }

  ListaNotass(){
    this.notasService.getNotass().subscribe(response =>{
      this.notassLista=response.data;
      this.dataSource = new MatTableDataSource(this.notassLista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
  }

  delete(notasId){
    const res = confirm('Quiere eliminar la nota con Id: ' + notasId);
    if(res){
      this.notasService.deleteNotas(notasId).subscribe((data) => {
        this.ListaNotass();
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