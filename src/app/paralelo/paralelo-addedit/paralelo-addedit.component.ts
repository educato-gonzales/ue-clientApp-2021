import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParaleloService } from '../../services/paralelo.service';
import { Paralelo } from '../../models/paralelo';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-paralelo-addedit',
  templateUrl: './paralelo-addedit.component.html',
  styleUrls: ['./paralelo-addedit.component.css']
})
export class ParaleloAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formNombre: string;
  paraleloId: number;
  errorMessage: any;
  paralelo: [];

  constructor( private paraleloService: ParaleloService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNombre = 'nombre';

    if (this.avRoute.snapshot.params[idParam]){
      this.paraleloId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        paraleloId: 0,
        nombre: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.paraleloId > 0){
      this.actionType = 'Edit';
      this.paraleloService.getParalelo(this.paraleloId)
      .subscribe(response => (
        this.paralelo = response.data,
        this.form.controls[this.formNombre].setValue(this.paralelo['nombre'])
        ));
    }
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const paralelo: Paralelo = {
        nombre: this.form.get(this.formNombre).value,
        estadoSql: 1
      };
      
      this.paraleloService.saveParalelo(paralelo)
      .subscribe((data) => {
        this.router.navigate(['/paralelo']);
      });
    }
    if(this.actionType === 'Edit'){
      const paralelo: Paralelo = {
        id: this.paralelo['id'],
        nombre: this.form.get(this.formNombre).value,
        estadoSql: this.paralelo['estadoSql']
      };
      this.paraleloService.updateParalelo(paralelo.id, paralelo)
        .subscribe((data) => {
          this.router.navigate(['/paralelo']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/paralelo']);
  }
  get nombre(){ return this.form.get(this.formNombre); }

}
