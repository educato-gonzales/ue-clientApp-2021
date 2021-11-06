import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametroService } from '../../services/parametro.service';
import { Parametro } from '../../models/parametro';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-parametro-addedit',
  templateUrl: './parametro-addedit.component.html',
  styleUrls: ['./parametro-addedit.component.css']
})
export class ParametroAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formNombre: string;
  formValor: string;
  parametroId: number;
  errorMessage: any;
  parametro: [];

  constructor( private ParametroService: ParametroService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNombre = 'nombre';
    this.formValor = 'valor';

    if (this.avRoute.snapshot.params[idParam]){
      this.parametroId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        parametroId: 0,
        nombre: ['', [Validators.required]],
        valor: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.parametroId > 0){
      this.actionType = 'Edit';
      this.ParametroService.getParametro(this.parametroId)
      .subscribe(response => (
        this.parametro = response.data,
        this.form.controls[this.formNombre].setValue(this.parametro['nombre']),
        this.form.controls[this.formValor].setValue(this.parametro['valor'])
        ));
    }
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const parametro: Parametro = {
        nombre: this.form.get(this.formNombre).value,
        valor: this.form.get(this.formValor).value,
        estadoSql: 1
      };
      
      this.ParametroService.saveParametro(parametro)
      .subscribe((data) => {
        this.router.navigate(['/parametro']);
      });
    }
    if(this.actionType === 'Edit'){
      const parametro: Parametro = {
        id: this.parametro['id'],
        nombre: this.form.get(this.formNombre).value,
        valor: this.form.get(this.formValor).value,
        estadoSql: this.parametro['estadoSql']
      };
      this.ParametroService.updateParametro(parametro.id, parametro)
        .subscribe((data) => {
          this.router.navigate(['/parametro']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/parametro']);
  }
  get nombre(){ return this.form.get(this.formNombre); }
  get valor(){ return this.form.get(this.formValor); }

}
