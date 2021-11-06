import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RepresentanteService } from '../../services/representante.service';
import { Representante } from '../../models/representante';

@Component({
  selector: 'app-representante-editar',
  templateUrl: './representante-editar.component.html',
  styleUrls: ['./representante-editar.component.css']
})
export class RepresentanteEditarComponent implements OnInit {

  form: FormGroup;
  formBuscar: string;
  formId;
  representanteId;
  public representantesLista: any[];

  formCedulaIdentidad: string;
  formParentesco: string;
  formIdiomaFrecuente: string;
  formApPaterno: string;
  formApMaterno: string;
  formNombres: string;
  formOcupacionLaboral: string;
  formComplemento: string;
  formExpedido: string;
  formGradoInstruccion: string;
  formFechaNacimiento: string;
  formTelefono: string;
  formCelular: string;

  constructor(private RepresentanteService: RepresentanteService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    this.formId = 'id';
    this.formBuscar = 'buscar';
    this.formCedulaIdentidad = 'cedulaIdentidad';
    this.formComplemento = 'complemento';
    this.formExpedido = 'expedido';
    this.formApPaterno = 'apPaterno';
    this.formApMaterno = 'apMaterno';
    this.formNombres = 'nombres';
    this.formIdiomaFrecuente = 'idiomaFrecuente';
    this.formOcupacionLaboral = 'ocupacionLaboral';
    this.formGradoInstruccion = 'gradoInstruccion';
    this.formFechaNacimiento = 'fechaNacimiento';
    this.formParentesco = 'parentesco';
    this.formTelefono = 'telefono';
    this.formCelular = 'celular';

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        representanteId: 0,
        buscar: ['', [Validators.required]],
        id: new FormControl({value: '', disabled: true}),
        cedulaIdentidad: [''],
        apPaterno: [''],
        apMaterno: [''],
        nombres: [''],
        ocupacionLaboral: [''],
        complemento: [''],
        expedido: [''],
        gradoInstruccion: [''],
        fechaNacimiento: [''],
        parentesco: [''],
        idiomaFrecuente: [''],
        telefono: [''],
        celular: [''],
      }
    )
   }

  ngOnInit(): void {
  }

  ListaRepresentantes(){
    this.RepresentanteService.getRepresentantes().subscribe(response =>
      {
        this.representantesLista = response.data;
      });
  }

  delete(representanteId){
    const res = confirm('Quiere eliminar REPRESENTANTE con Id: ' + representanteId);
    if(res){
      this.RepresentanteService.deleteRepresentante(representanteId).subscribe((data) => {
        this.router.navigate(['/inicioRepresentante']);
      });
    }
  }

  buscarId(cedulaIdentidad){
    this.RepresentanteService.getBuscar(cedulaIdentidad).subscribe(response =>
      {
        this.representantesLista = (response as any);
        console.log(this.representantesLista);
        this.representanteId = this.representantesLista['id'],
        this.form.controls[this.formId].setValue(this.representantesLista['id']),
        this.form.controls[this.formCedulaIdentidad].setValue(this.representantesLista['cedulaIdentidad']),
        this.form.controls[this.formApPaterno].setValue(this.representantesLista['apPaterno']),
        this.form.controls[this.formApMaterno].setValue(this.representantesLista['apMaterno']),
        this.form.controls[this.formNombres].setValue(this.representantesLista['nombres']),
        this.form.controls[this.formOcupacionLaboral].setValue(this.representantesLista['ocupacionLaboral']),
        this.form.controls[this.formComplemento].setValue(this.representantesLista['complemento']),
        this.form.controls[this.formExpedido].setValue(this.representantesLista['expedido']),
        this.form.controls[this.formGradoInstruccion].setValue(this.representantesLista['gradoInstruccion']),
        this.form.controls[this.formFechaNacimiento].setValue(this.representantesLista['fechaNacimiento']),
        this.form.controls[this.formParentesco].setValue(this.representantesLista['parentesco']),
        this.form.controls[this.formIdiomaFrecuente].setValue(this.representantesLista['idiomaFrecuente']),
        this.form.controls[this.formTelefono].setValue(this.representantesLista['telefono']),
        this.form.controls[this.formCelular].setValue(this.representantesLista['celular'])
      });
  }

  editar(){
    if(this.representanteId > 0){
      const representante: Representante = {
        id: this.representanteId,
        cedulaIdentidad: this.form.get(this.formCedulaIdentidad).value,
        apPaterno: this.form.get(this.formApPaterno).value,
        apMaterno: this.form.get(this.formApMaterno).value,
        nombres: this.form.get(this.formNombres).value,
        ocupacionLaboral: this.form.get(this.formOcupacionLaboral).value,
        complemento: this.form.get(this.formComplemento).value,
        expedido: this.form.get(this.formExpedido).value,
        gradoInstruccion: this.form.get(this.formGradoInstruccion).value,
        fechaNacimiento: this.form.get(this.formFechaNacimiento).value,
        parentesco: this.form.get(this.formParentesco).value,
        idiomaFrecuente: this.form.get(this.formIdiomaFrecuente).value,
        telefono: this.form.get(this.formTelefono).value,
        celular: this.form.get(this.formCelular).value,
        estadoSql: 1
      };
      this.RepresentanteService.updateRepresentante(representante.id, representante)
        .subscribe((data) => {
          this.router.navigate(['/inicioRepresentante']);
      });
    }
  }

  cancel(){
    this.router.navigate(['/inicioRepresentante']);
  }

  get id(){ return this.form.get(this.formId); }
  get buscar(){ return this.form.get(this.formBuscar); }
  get cedulaIdentidad(){ return this.form.get(this.formCedulaIdentidad); }
  get apPaterno(){ return this.form.get(this.formApPaterno); }
  get apMaterno(){ return this.form.get(this.formApMaterno); }
  get nombres(){ return this.form.get(this.formNombres); }
  get ocupacionLaboral(){ return this.form.get(this.formOcupacionLaboral); }
  get complemento(){ return this.form.get(this.formComplemento); }
  get expedido(){ return this.form.get(this.formExpedido); }
  get gradoInstruccion(){ return this.form.get(this.formGradoInstruccion); }
  get fechaNacimiento(){ return this.form.get(this.formFechaNacimiento); }
  get parentesco(){ return this.form.get(this.formParentesco); }
  get idiomaFrecuente(){ return this.form.get(this.formIdiomaFrecuente); }
  get telefono(){ return this.form.get(this.formTelefono); }
  get celular(){ return this.form.get(this.formCelular); }

  // Steps
   step = 0;
  
   setStep(index: number) {
     this.step = index;
   }
  
   nextStep() {
     this.step++;
   }
  
   prevStep() {
     this.step--;
   }

}
