import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutoevaluacionService } from '../../services/autoevaluacion.service';
import { Autoevaluacion } from '../../models/autoevaluacion';
import { Observable } from 'rxjs';
import { NotaService } from '../../services/nota.service';

@Component({
  selector: 'app-autoevaluacion-addedit',
  templateUrl: './autoevaluacion-addedit.component.html',
  styleUrls: ['./autoevaluacion-addedit.component.css']
})
export class AutoevaluacionAddeditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formNotaSer;
  formNotaDecidir;
  formIdEvalPoseedor;
  autoevaluacionId;
  errorMessage: any;
  autoevaluacion: [];
  public listaSelect: any[];

  constructor( private autoevaluacionService: AutoevaluacionService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router, private serviceNota: NotaService) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNotaSer = 'notaSer';
    this.formNotaDecidir = 'notaDecidir';
    this.formIdEvalPoseedor = 'idEvalPoseedor';

    if (this.avRoute.snapshot.params[idParam]){
      this.autoevaluacionId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        autoevaluacionId: 0,
        notaSer: ['', [Validators.required]],
        notaDecidir: ['', [Validators.required]],
        idEvalPoseedor: ['', [Validators.required]],
      }
    );

  }

  ngOnInit(): void {
    if (this.autoevaluacionId > 0){
      this.actionType = 'Edit';
      this.autoevaluacionService.getAutoevaluacion(this.autoevaluacionId)
      .subscribe(response => (
        this.autoevaluacion = response.data,
        this.form.controls[this.formNotaSer].setValue(this.autoevaluacion['notaSer']),
        this.form.controls[this.formNotaDecidir].setValue(this.autoevaluacion['notaDecidir']),
        this.form.controls[this.formIdEvalPoseedor].setValue(this.autoevaluacion['idEvalPoseedor'])
        ));
    }
    this.ListaSelect();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const autoevaluacion: Autoevaluacion = {
        notaSer: this.form.get(this.formNotaSer).value,
        notaDecidir: this.form.get(this.formNotaDecidir).value,
        idEvalPoseedor: Number(this.form.get(this.formIdEvalPoseedor).value),
        estadoSql: 1
      };
      
      this.autoevaluacionService.saveAutoevaluacion(autoevaluacion)
      .subscribe((data) => {
        this.router.navigate(['/autoevaluacion']);
      });
    }
    if(this.actionType === 'Edit'){
      const autoevaluacion: Autoevaluacion = {
        id: this.autoevaluacion['id'],
        notaSer: this.form.get(this.formNotaSer).value,
        notaDecidir: this.form.get(this.formNotaDecidir).value,
        idEvalPoseedor: this.form.get(this.formIdEvalPoseedor).value,
        estadoSql: this.autoevaluacion['estadoSql']
      };
      this.autoevaluacionService.updateAutoevaluacion(autoevaluacion.id, autoevaluacion)
        .subscribe((data) => {
          this.router.navigate(['/autoevaluacion']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/autoevaluacion']);
  }

  get notaSer(){ return this.form.get(this.formNotaSer); }
  get notaDecidir(){ return this.form.get(this.formNotaDecidir); }
  get idEvalPoseedor(){ return this.form.get(this.formIdEvalPoseedor); }

  ListaSelect(){
      this.serviceNota.getNotas().subscribe(response=>{
        this.listaSelect=response.data;
      });
    }

}