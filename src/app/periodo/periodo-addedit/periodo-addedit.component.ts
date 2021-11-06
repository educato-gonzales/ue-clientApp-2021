import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodoService } from '../../services/periodo.service';
import { Periodo } from '../../models/periodo';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-periodo-addedit',
  templateUrl: './periodo-addedit.component.html',
  styleUrls: ['./periodo-addedit.component.css']
})
export class PeriodoAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formNombre: string;
  formFechaInicio: string;
  formFechaFin: string;
  formEstado: string;
  formDescripcion: string;
  periodoId: number;
  errorMessage: any;
  periodo: [];

  constructor( private PeriodoService: PeriodoService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNombre = 'nombre';
    this.formFechaInicio = 'fechaInicio';
    this.formFechaFin = 'fechaFin';
    this.formEstado = 'estado';
    this.formDescripcion = 'descripcion';

    if (this.avRoute.snapshot.params[idParam]){
      this.periodoId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        periodoId: 0,
        nombre: ['', [Validators.required]],
        fechaInicio: ['', [Validators.required]],
        fechaFin: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.periodoId > 0){
      this.actionType = 'Edit';
      this.PeriodoService.getPeriodo(this.periodoId)
      .subscribe(response => (
        this.periodo = response.data,
        this.form.controls[this.formNombre].setValue(this.periodo['nombre']),
        this.form.controls[this.formFechaInicio].setValue(this.periodo['fechaInicio']),
        this.form.controls[this.formFechaFin].setValue(this.periodo['fechaFin']),
        this.form.controls[this.formEstado].setValue(this.periodo['estado']),
        this.form.controls[this.formDescripcion].setValue(this.periodo['descripcion'])
        ));
    }
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const periodo: Periodo = {
        nombre: this.form.get(this.formNombre).value,
        fechaInicio: this.form.get(this.formFechaInicio).value,
        fechaFin: this.form.get(this.formFechaFin).value,
        estado: this.form.get(this.formEstado).value,
        descripcion: this.form.get(this.formDescripcion).value,
        estadoSql: 1
      };
      
      this.PeriodoService.savePeriodo(periodo)
      .subscribe((data) => {
        this.router.navigate(['/periodo']);
      });
    }
    if(this.actionType === 'Edit'){
      const periodo: Periodo = {
        id: this.periodo['id'],
        nombre: this.form.get(this.formNombre).value,
        fechaInicio: this.form.get(this.formFechaInicio).value,
        fechaFin: this.form.get(this.formFechaFin).value,
        estado: this.form.get(this.formEstado).value,
        descripcion: this.form.get(this.formDescripcion).value,
        estadoSql: this.periodo['estadoSql']
      };
      this.PeriodoService.updatePeriodo(periodo.id, periodo)
        .subscribe((data) => {
          this.router.navigate(['/periodo']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/periodo']);
  }
  get nombre(){ return this.form.get(this.formNombre); }
  get fechaInicio(){ return this.form.get(this.formFechaInicio); }
  get fechaFin(){ return this.form.get(this.formFechaFin); }
  get estado(){ return this.form.get(this.formEstado); }
  get descripcion(){ return this.form.get(this.formDescripcion); }

}
