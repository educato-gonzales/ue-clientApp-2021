import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutoevaluacionService } from '../../services/autoevaluacion.service';
import { Autoevaluacion } from '../../models/autoevaluacion';
import { Observable } from 'rxjs';
import { NotaService } from '../../services/nota.service';

@Component({
  selector: 'app-registro-autoevaluacion-add',
  templateUrl: './registro-autoevaluacion-add.component.html',
  styleUrls: ['./registro-autoevaluacion-add.component.css']
})
export class RegistroAutoevaluacionAddComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formNotaSer;
  formNotaDecidir;
  formIdEvalPoseedor;
  autoevaluacionId;
  errorMessage: any;
  autoevaluacion: [];
  public listaSelect: any[];
  //Para obtener IdEvalPoseedor 
  listaId;
  listasId;
  // Capturando IdRef
  navigation; 
  constructor( private autoevaluacionService: AutoevaluacionService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router, private serviceNota: NotaService) { 
    const idParam = 'id';
    const idParams = 'ids';
    this.actionType = 'Add';
    this.formNotaSer = 'notaSer';
    this.formNotaDecidir = 'notaDecidir';
    this.formIdEvalPoseedor = 'idEvalPoseedor';
    //Para obtener IdEvalPoseedor 
    const listaIdParam = 'id';
    const listasIdParam = 'ids';

    //Para obtener IdEvalPoseedor 
    if (this.avRoute.snapshot.params[listaIdParam] || this.avRoute.snapshot.params[listasIdParam]){
      this.listaId = this.avRoute.snapshot.params[listaIdParam];
      this.listasId = this.avRoute.snapshot.params[listasIdParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        autoevaluacionId: 0,
        notaSer: ['', [Validators.required]],
        notaDecidir: ['', [Validators.required]],
        idEvalPoseedor: new FormControl({value: '', disabled: true}),
        //Capturando IdRef
        navigation:0,
      }
    );

  }

  ngOnInit(): void {
    this.form.controls[this.formIdEvalPoseedor].setValue(this.listasId)
    if (this.listaId > 0){
      console.log(this.listaId);
    
      this.actionType = 'Edit'
      this.autoevaluacionService.getAutoevaluacion(this.listaId)
      .subscribe(response => (
        this.autoevaluacion = response as any,
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
        if(this.navigation == 'Profesor'){
          this.router.navigate(['/registro-autoevaluaciones']);
        }
        else{
          this.router.navigate(['/inicio']);
        }
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
          this.router.navigate(['/registro-autoevaluaciones']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/registro-nota']);
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
