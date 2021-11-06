import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorarioService } from '../../services/horario.service';
import { Horario } from '../../models/horario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-horario-addedit',
  templateUrl: './horario-addedit.component.html',
  styleUrls: ['./horario-addedit.component.css']
})
export class HorarioAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formDia: string;
  formHoraInicio: string;
  formHoraFin: string;
  horarioId: number;
  errorMessage: any;
  horario: [];

  constructor( private horarioService: HorarioService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formDia = 'dia';
    this.formHoraInicio = 'horaInicio';
    this.formHoraFin = 'horaFin';
    if (this.avRoute.snapshot.params[idParam]){
      this.horarioId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        horarioId: 0,
        dia: ['', [Validators.required]],
        horaInicio: ['', [Validators.required]],
        horaFin: ['', [Validators.required]],
      }
    );

  }

  ngOnInit(): void {
    if (this.horarioId > 0){
      this.actionType = 'Edit';
      this.horarioService.getHorario(this.horarioId)
      .subscribe(response => (
        this.horario = response.data,
        this.form.controls[this.formDia].setValue(this.horario['dia']),
        this.form.controls[this.formHoraInicio].setValue(this.horario['horaInicio']),
        this.form.controls[this.formHoraFin].setValue(this.horario['horaFin'])
        ));
    }
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const horario: Horario = {
        dia: this.form.get(this.formDia).value,
        horaInicio: this.form.get(this.formHoraInicio).value,
        horaFin: this.form.get(this.formHoraFin).value,
        estadoSql: 1
      };
      
      this.horarioService.saveHorario(horario)
      .subscribe((data) => {
        this.router.navigate(['/horario']);
      });
    }
    if(this.actionType === 'Edit'){
      const horario: Horario = {
        id: this.horario['id'],
        dia: this.form.get(this.formDia).value,
        horaInicio: this.form.get(this.formHoraInicio).value,
        horaFin: this.form.get(this.formHoraFin).value,
        estadoSql: this.horario['estadoSql']
      };
      this.horarioService.updateHorario(horario.id, horario)
        .subscribe((data) => {
          this.router.navigate(['/horario']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/horario']);
  }

  get dia(){ return this.form.get(this.formDia); }
  get horaInicio(){ return this.form.get(this.formHoraInicio); }
  get horaFin(){ return this.form.get(this.formHoraFin); }

}
