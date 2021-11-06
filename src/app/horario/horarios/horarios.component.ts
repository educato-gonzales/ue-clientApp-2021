import { HorarioService} from '../../services/horario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', "dia", 'horaInicio', "horaFin", 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  public horariosLista: any[];
  constructor(private horarioService: HorarioService){}

  ngOnInit(): void {
    this.ListaHorarios();
  }

  ListaHorarios(){
    this.horarioService.getHorarios().subscribe(response =>
      {
        this.horariosLista = response.data;
        this.dataSource = new MatTableDataSource(this.horariosLista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  delete(horarioId){
    const res = confirm('Quiere eliminar el horario con Id: ' + horarioId);
    if(res){
      this.horarioService.deleteHorario(horarioId).subscribe((data) => {
        this.ListaHorarios();
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
