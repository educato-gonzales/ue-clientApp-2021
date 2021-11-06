import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarioService } from '../../services/calendario.service';
import { Calendario } from '../../models/calendario';
import { Observable } from 'rxjs';
import { PeriodoService } from '../../services/periodo.service';

@Component({
  selector: 'app-calendario-addedit',
  templateUrl: './calendario-addedit.component.html',
  styleUrls: ['./calendario-addedit.component.css']
})


export class CalendarioAddeditComponent implements OnInit {
  
  public listaSelect: any[];
  form: FormGroup;
  actionType: string;
  formNombre: string;
  formFecha: string;
  formLugar: string;
  formDescripcion: string;
  formIdPeriodo;
  calendarioId: number;
  errorMessage: any;
  calendario: [];

  constructor( private calendarioService: CalendarioService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,private servicePeriodo: PeriodoService) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNombre = 'nombre';
    this.formFecha = 'fecha';
    this.formLugar = 'lugar';
    this.formDescripcion = 'descripcion';
    this.formIdPeriodo = 'idPeriodo';
    if (this.avRoute.snapshot.params[idParam]){
      this.calendarioId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        calendarioId: 0,
        nombre: ['', [Validators.required]],
        fecha: ['', [Validators.required]],
        lugar: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        idPeriodo: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.calendarioId > 0){
      this.actionType = 'Edit';
      this.calendarioService.getCalendario(this.calendarioId)
      .subscribe(response => (
        this.calendario = response.data,
        this.form.controls[this.formNombre].setValue(this.calendario['nombre']),
        this.form.controls[this.formFecha].setValue(this.calendario['fecha']),
        this.form.controls[this.formLugar].setValue(this.calendario['lugar']),
        this.form.controls[this.formDescripcion].setValue(this.calendario['descripcion']),
        this.form.controls[this.formIdPeriodo].setValue(this.calendario['idPeriodo'])
        ));
    }
    this.ListaSelect();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const calendario: Calendario = {
        nombre: this.form.get(this.formNombre).value,
        fecha: this.form.get(this.formFecha).value,
        lugar: this.form.get(this.formLugar).value,
        descripcion: this.form.get(this.formDescripcion).value,
        idPeriodo: Number(this.form.get(this.formIdPeriodo).value),
        estadoSql: 1
      };
      
      this.calendarioService.saveCalendario(calendario)
      .subscribe((data) => {
        this.router.navigate(['/calendario']);
      });
    }
    if(this.actionType === 'Edit'){
      const calendario: Calendario = {
        id: this.calendario['id'],
        nombre: this.form.get(this.formNombre).value,
        fecha: this.form.get(this.formFecha).value,
        lugar: this.form.get(this.formLugar).value,
        descripcion: this.form.get(this.formDescripcion).value,
        idPeriodo: this.form.get(this.formIdPeriodo).value,
        estadoSql: this.calendario['estadoSql']
      };
      this.calendarioService.updateCalendario(calendario.id, calendario)
        .subscribe((data) => {
          this.router.navigate(['/calendario']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/calendario']);
  }
  get nombre(){ return this.form.get(this.formNombre); }
  get fecha(){ return this.form.get(this.formFecha); }
  get lugar(){ return this.form.get(this.formLugar); }
  get descripcion(){ return this.form.get(this.formDescripcion); }
  get idPeriodo(){ return this.form.get(this.formIdPeriodo); }

  ListaSelect(){
    this.servicePeriodo.getPeriodos().subscribe(response=>{
      this.listaSelect=response.data;
    });
  }

}
