import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RudeService } from '../../services/rude.service';
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante } from '../../models/estudiante';
import { Observable } from 'rxjs';
import { RepresentanteService } from '../../services/representante.service';
import { Rude } from 'src/app/models/rude';

@Component({
  selector: 'app-rude-addedit',
  templateUrl: './rude-addedit.component.html',
  styleUrls: ['./rude-addedit.component.css']
})
export class RudeAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;

  formCodSieue: string;
  formPais: string;
  formDepartamento: string;
  formProvincia: string;
  formLocalidad: string;
  formOficialia: string;
  formLibro;
  formPartida;
  formFolio;
  formComplemento: string;
  formExpedido: string;
  formCodRude: string;
  formSexo;
  formDiscapacidad;
  formNumDiscapacidad;
  formTipoDiscapacidad: string;
  formGradoDiscapacidad: string;
  formDepartamentoEst: string;
  formProvinciaEst: string;
  formSeccionEst: string;
  formLocalidadEst: string;
  formZonaEst: string;
  formAvenidaEst: string;
  formNumViviendaEst: string;
  formIdiomaNiniez: string;
  formIdiomaFrecuente: string;
  formNacion: string;
  formCentroSalud;
  formProblemaSalud: string;
  formFrecuenciaCs: string;
  formSeguroCs;
  formAgua;
  formBanio;
  formAlcantarillado;
  formEnergiaElectrica;
  formServBasura;
  formVivienda: string;
  formInternet: string;
  formFrecuenciaInternet: string;
  formTrabajo;
  formMesesTrabajo: string;
  formActividadTrabajo: string;
  formTurnoTrabajo: string;
  formFrecuenciaTrabajo: string;
  formPagoTrabajo;
  formTipoPago;
  formMedioTransporte: string;
  formTiempoTransporte: string;
  formAbandonoUe;
  formRazonAbandono: string;
  formFechaRegistro: string;
  formLugarRegistro: string;
  formIdRepresentantePadre;
  formIdRepresentanteMadre;
  formIdRepresentanteTutor;
  formIdEstudiante;
  rudeId;
  errorMessage: any;
  rude: [];
  public listaSelectRepresentante: any[];
  public listaSelectEstudiante: any[];

  constructor( private rudeService: RudeService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private serviceRepresentante: RepresentanteService,
    private serviceEstudiante: EstudianteService) { 
      
    const idParam = 'id';
    this.actionType = 'Add';

    this.formCodSieue = 'codSieue';
    this.formPais = 'pais';
    this.formDepartamento = 'departamento';
    this.formProvincia = 'provincia';
    this.formLocalidad = 'localidad';
    this.formOficialia = 'oficialia';
    this.formLibro = 'libro';
    this.formPartida = 'partida';
    this.formFolio = 'folio';
    this.formComplemento = 'complemento';
    this.formExpedido = 'expedido';
    this.formCodRude = 'codRude';
    this.formSexo = 'sexo';
    this.formDiscapacidad = 'discapacidad';
    this.formNumDiscapacidad = 'numDiscapacidad';
    this.formTipoDiscapacidad = 'tipoDiscapacidad';
    this.formGradoDiscapacidad = 'gradoDiscapacidad';
    this.formDepartamentoEst = 'departamentoEst';
    this.formProvinciaEst = 'provinciaEst';
    this.formSeccionEst = 'seccionEst';
    this.formLocalidadEst = 'localidadEst';
    this.formZonaEst = 'zonaEst';
    this.formAvenidaEst = 'avenidaEst';
    this.formNumViviendaEst = 'numViviendaEst';
    this.formIdiomaNiniez = 'idiomaNiniez';
    this.formIdiomaFrecuente = 'idiomaFrecuente';
    this.formNacion = 'nacion';
    this.formCentroSalud = 'centroSalud';
    this.formProblemaSalud = 'problemaSalud';
    this.formFrecuenciaCs = 'frecuenciaCs';
    this.formSeguroCs = 'seguroCs';
    this.formAgua = 'agua';
    this.formBanio = 'banio';
    this.formAlcantarillado = 'alcantarillado';
    this.formEnergiaElectrica = 'energiaElectrica';
    this.formServBasura = 'servBasura';
    this.formVivienda = 'vivienda';
    this.formInternet = 'internet';
    this.formFrecuenciaInternet = 'frecuenciaInternet';
    this.formTrabajo = 'trabajo';
    this.formMesesTrabajo = 'mesesTrabajo';
    this.formActividadTrabajo = 'actividadTrabajo';
    this.formTurnoTrabajo = 'turnoTrabajo';
    this.formFrecuenciaTrabajo = 'frecuenciaTrabajo';
    this.formPagoTrabajo = 'pagoTrabajo';
    this.formTipoPago = 'tipoPago';
    this.formMedioTransporte = 'medioTransporte';
    this.formTiempoTransporte = 'tiempoTransporte';
    this.formAbandonoUe = 'abandonoUe';
    this.formRazonAbandono = 'razonAbandono';
    this.formFechaRegistro = 'fechaRegistro';
    this.formLugarRegistro = 'lugarRegistro';
    this.formIdRepresentantePadre = 'idRepresentantePadre';
    this.formIdRepresentanteMadre = 'idRepresentanteMadre';
    this.formIdRepresentanteTutor = 'idRepresentanteTutor';
    this.formIdEstudiante = 'idEstudiante';

    if (this.avRoute.snapshot.params[idParam]){
      this.rudeId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        rolId: 0,
        codSieue: ['', [Validators.required]],
        pais: ['', [Validators.required]],
        departamento: ['', [Validators.required]],
        provincia: ['', [Validators.required]],
        localidad: ['', [Validators.required]],
        oficialia: ['', [Validators.required]],
        libro: ['', [Validators.required]],
        partida: ['', [Validators.required]],
        folio: ['', [Validators.required]],
        complemento: ['', [Validators.required]],
        expedido: ['', [Validators.required]],
        codRude: ['', [Validators.required]],
        sexo: ['', [Validators.required]],
        discapacidad: ['', [Validators.required]],
        numDiscapacidad: ['', [Validators.required]],
        tipoDiscapacidad: ['', [Validators.required]],
        gradoDiscapacidad: ['', [Validators.required]],
        departamentoEst: ['', [Validators.required]],
        provinciaEst: ['', [Validators.required]],
        seccionEst: ['', [Validators.required]],
        localidadEst: ['', [Validators.required]],
        zonaEst: ['', [Validators.required]],
        avenidaEst: ['', [Validators.required]],
        numViviendaEst: ['', [Validators.required]],
        idiomaNiniez: ['', [Validators.required]],
        idiomaFrecuente: ['', [Validators.required]],
        nacion: ['', [Validators.required]],
        centroSalud: ['', [Validators.required]],
        problemaSalud: ['', [Validators.required]],
        frecuenciaCs: ['', [Validators.required]],
        seguroCs: ['', [Validators.required]],
        agua: ['', [Validators.required]],
        banio: ['', [Validators.required]],
        alcantarillado: ['', [Validators.required]],
        energiaElectrica: ['', [Validators.required]],
        servBasura: ['', [Validators.required]],
        vivienda: ['', [Validators.required]],
        internet: ['', [Validators.required]],
        frecuenciaInternet: ['', [Validators.required]],
        trabajo: ['', [Validators.required]],
        mesesTrabajo: ['', [Validators.required]],
        actividadTrabajo: ['', [Validators.required]],
        turnoTrabajo: ['', [Validators.required]],
        frecuenciaTrabajo: ['', [Validators.required]],
        pagoTrabajo: ['', [Validators.required]],
        tipoPago: ['', [Validators.required]],
        medioTransporte: ['', [Validators.required]],
        tiempoTransporte: ['', [Validators.required]],
        abandonoUe: ['', [Validators.required]],
        razonAbandono: ['', [Validators.required]],
        fechaRegistro: ['', [Validators.required]],
        lugarRegistro: ['', [Validators.required]],
        idRepresentantePadre: ['', [Validators.required]],
        idRepresentanteMadre: ['', [Validators.required]],
        idRepresentanteTutor: ['', [Validators.required]],
        idEstudiante: ['', [Validators.required]],

      }
    )

  }

  ngOnInit(): void {
    if (this.rudeId > 0){
      this.actionType = 'Edit';
      this.rudeService.getRude(this.rudeId)
      .subscribe(response => (
        this.rude = response.data ,
        this.form.controls[this.formCodSieue].setValue(this.rude['codSieue']),
        this.form.controls[this.formPais].setValue(this.rude['pais']),
        this.form.controls[this.formDepartamento].setValue(this.rude['departamento']),
        this.form.controls[this.formProvincia].setValue(this.rude['provincia']),
        this.form.controls[this.formLocalidad].setValue(this.rude['localidad']),
        this.form.controls[this.formOficialia].setValue(this.rude['oficialia']),
        this.form.controls[this.formLibro].setValue(this.rude['libro']),
        this.form.controls[this.formPartida].setValue(this.rude['partida']),
        this.form.controls[this.formFolio].setValue(this.rude['folio']),
       this.form.controls[this.formComplemento].setValue(this.rude['complemento']),
        this.form.controls[this.formExpedido].setValue(this.rude['expedido']),
        this.form.controls[this.formCodRude].setValue(this.rude['codRude']),
        this.form.controls[this.formSexo].setValue(this.verificacionInversa(this.rude['sexo'])),
        this.form.controls[this.formDiscapacidad].setValue(this.verificacionInversa(this.rude['discapacidad'])),
        this.form.controls[this.formNumDiscapacidad].setValue(this.rude['numDiscapacidad']),
        this.form.controls[this.formTipoDiscapacidad].setValue(this.rude['tipoDiscapacidad']),
        this.form.controls[this.formGradoDiscapacidad].setValue(this.rude['gradoDiscapacidad']),
        this.form.controls[this.formDepartamentoEst].setValue(this.rude['departamentoEst']),
        this.form.controls[this.formProvinciaEst].setValue(this.rude['provinciaEst']),
        this.form.controls[this.formSeccionEst].setValue(this.rude['seccionEst']),
        this.form.controls[this.formLocalidadEst].setValue(this.rude['localidadEst']),
        this.form.controls[this.formZonaEst].setValue(this.rude['zonaEst']),
        this.form.controls[this.formAvenidaEst].setValue(this.rude['avenidaEst']),
        this.form.controls[this.formNumViviendaEst].setValue(this.rude['numViviendaEst']),
        this.form.controls[this.formIdiomaNiniez].setValue(this.rude['idiomaNiniez']),
        this.form.controls[this.formIdiomaFrecuente].setValue(this.rude['idiomaFrecuente']),
        this.form.controls[this.formNacion].setValue(this.rude['nacion']),
        this.form.controls[this.formCentroSalud].setValue(this.verificacionInversa(this.rude['centroSalud'])),
        this.form.controls[this.formProblemaSalud].setValue(this.rude['problemaSalud']),
        this.form.controls[this.formFrecuenciaCs].setValue(this.rude['frecuenciaCs']),
        this.form.controls[this.formSeguroCs].setValue(this.verificacionInversa(this.rude['seguroCs'])),
        this.form.controls[this.formAgua].setValue(this.verificacionInversa(this.rude['agua'])),
        this.form.controls[this.formBanio].setValue(this.verificacionInversa(this.rude['banio'])),
        this.form.controls[this.formAlcantarillado].setValue(this.verificacionInversa(this.rude['alcantarillado'])),
        this.form.controls[this.formEnergiaElectrica].setValue(this.verificacionInversa(this.rude['energiaElectrica'])),
        this.form.controls[this.formServBasura].setValue(this.verificacionInversa(this.rude['servBasura'])),
        this.form.controls[this.formVivienda].setValue(this.rude['vivienda']),
        this.form.controls[this.formInternet].setValue(this.rude['internet']),
        this.form.controls[this.formFrecuenciaInternet].setValue(this.rude['frecuenciaInternet']),
        this.form.controls[this.formTrabajo].setValue(this.verificacionInversa(this.rude['trabajo'])),
        this.form.controls[this.formMesesTrabajo].setValue(this.rude['mesesTrabajo']),
        this.form.controls[this.formActividadTrabajo].setValue(this.rude['actividadTrabajo']),
        this.form.controls[this.formTurnoTrabajo].setValue(this.rude['turnoTrabajo']),
        this.form.controls[this.formFrecuenciaTrabajo].setValue(this.rude['frecuenciaTrabajo']),
        this.form.controls[this.formPagoTrabajo].setValue(this.verificacionInversa(this.rude['pagoTrabajo'])),
        this.form.controls[this.formTipoPago].setValue(this.verificacionInversa(this.rude['tipoPago'])),
        this.form.controls[this.formMedioTransporte].setValue(this.rude['medioTransporte']),
        this.form.controls[this.formTiempoTransporte].setValue(this.rude['tiempoTransporte']),
        this.form.controls[this.formAbandonoUe].setValue(this.verificacionInversa(this.rude['abandonoUe'])),
        this.form.controls[this.formRazonAbandono].setValue(this.rude['razonAbandono']),
        this.form.controls[this.formFechaRegistro].setValue(this.rude['fechaRegistro']),
        this.form.controls[this.formLugarRegistro].setValue(this.rude['lugarRegistro']),
        this.form.controls[this.formIdRepresentantePadre].setValue(this.rude['idRepresentanteMadre']),
        this.form.controls[this.formIdRepresentanteMadre].setValue(this.rude['idRepresentantePadre']),
        this.form.controls[this.formIdRepresentanteTutor].setValue(this.rude['idRepresentanteTutor']),
        this.form.controls[this.formIdEstudiante].setValue(this.rude['idEstudiante'])
        
        ));
        
    }
    this.ListaSelectRepresentante();
    this.ListaSelectEstudiante();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const rude: Rude = {
        codSieue: this.form.get(this.formCodSieue).value,
        departamento: this.form.get(this.formPais).value,
        pais: this.form.get(this.formPais).value,
        provincia: this.form.get(this.formProvincia).value,
        localidad: this.form.get(this.formLocalidad).value,
        oficialia: this.form.get(this.formOficialia).value,
        libro: this.form.get(this.formLibro).value,
        partida: this.form.get(this.formPartida).value,
        folio: this.form.get(this.formFolio).value,
        complemento: this.form.get(this.formComplemento).value,
        expedido: this.form.get(this.formExpedido).value,
        codRude: this.form.get(this.formCodRude).value,
        sexo: this.verificacion(this.form.get(this.formSexo).value),
        discapacidad: this.verificacion(this.form.get(this.formDiscapacidad).value),
        numDiscapacidad: this.form.get(this.formNumDiscapacidad).value,
        tipoDiscapacidad: this.form.get(this.formTipoDiscapacidad).value,
        gradoDiscapacidad: this.form.get(this.formGradoDiscapacidad).value,
        departamentoEst: this.form.get(this.formDepartamentoEst).value,
        provinciaEst: this.form.get(this.formProvinciaEst).value,
        seccionEst: this.form.get(this.formSeccionEst).value,
        localidadEst: this.form.get(this.formLocalidadEst).value,
        zonaEst: this.form.get(this.formZonaEst).value,
        avenidaEst: this.form.get(this.formAvenidaEst).value,
        numViviendaEst: this.form.get(this.formNumViviendaEst).value,
        idiomaNiniez: this.form.get(this.formIdiomaNiniez).value,
        idiomaFrecuente: this.form.get(this.formIdiomaFrecuente).value,
        nacion: this.form.get(this.formNacion).value,
        centroSalud: this.verificacion(this.form.get(this.formCentroSalud).value),
        problemaSalud: this.form.get(this.formProblemaSalud).value,
        frecuenciaCs: this.form.get(this.formFrecuenciaCs).value,
        seguroCs: this.verificacion(this.form.get(this.formSeguroCs).value),
        agua: this.verificacion(this.form.get(this.formAgua).value),
        banio: this.verificacion(this.form.get(this.formBanio).value),
        alcantarillado: this.verificacion(this.form.get(this.formAlcantarillado).value),
        energiaElectrica: this.verificacion(this.form.get(this.formEnergiaElectrica).value),
        servBasura: this.verificacion(this.form.get(this.formServBasura).value),
        vivienda: this.form.get(this.formVivienda).value,
        internet: this.form.get(this.formInternet).value,
        frecuenciaInternet: this.form.get(this.formFrecuenciaInternet).value,
        trabajo: this.verificacion(this.form.get(this.formTrabajo).value),
        mesesTrabajo: this.form.get(this.formMesesTrabajo).value,
        actividadTrabajo: this.form.get(this.formActividadTrabajo).value,
        turnoTrabajo: this.form.get(this.formTurnoTrabajo).value,
        frecuenciaTrabajo: this.form.get(this.formFrecuenciaTrabajo).value,
        pagoTrabajo: this.verificacion(this.form.get(this.formPagoTrabajo).value),
        tipoPago: this.verificacion(this.form.get(this.formTipoPago).value),
        medioTransporte: this.form.get(this.formMedioTransporte).value,
        tiempoTransporte: this.form.get(this.formTiempoTransporte).value,
        abandonoUe:  this.verificacion(this.form.get(this.formAbandonoUe).value),
        razonAbandono: this.form.get(this.formRazonAbandono).value,
        fechaRegistro: this.form.get(this.formFechaRegistro).value,
        lugarRegistro: this.form.get(this.formLugarRegistro).value,
        idRepresentantePadre: Number(this.form.get(this.formIdRepresentantePadre).value),
        idRepresentanteMadre: Number(this.form.get(this.formIdRepresentanteMadre).value),
        idRepresentanteTutor: Number(this.form.get(this.formIdRepresentanteTutor).value),
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        estadoSql: 1
      };
      
      this.rudeService.saveRude(rude)
      .subscribe((data) => {
        this.router.navigate(['/rude']);
      });
    }
    if(this.actionType === 'Edit'){
      const rude: Rude = {
        id: this.rude['id'],
        codSieue: this.form.get(this.formCodSieue).value,
        departamento: this.form.get(this.formPais).value,
        pais: this.form.get(this.formPais).value,
        provincia: this.form.get(this.formProvincia).value,
        localidad: this.form.get(this.formLocalidad).value,
        oficialia: this.form.get(this.formOficialia).value,
        libro: this.form.get(this.formLibro).value,
        partida: this.form.get(this.formPartida).value,
        folio: this.form.get(this.formFolio).value,
        complemento: this.form.get(this.formComplemento).value,
        expedido: this.form.get(this.formExpedido).value,
        codRude: this.form.get(this.formCodRude).value,
        sexo: this.verificacion(this.form.get(this.formSexo).value),
        discapacidad: this.verificacion(this.form.get(this.formDiscapacidad).value),
        numDiscapacidad: this.form.get(this.formNumDiscapacidad).value,
        tipoDiscapacidad: this.form.get(this.formTipoDiscapacidad).value,
        gradoDiscapacidad: this.form.get(this.formGradoDiscapacidad).value,
        departamentoEst: this.form.get(this.formDepartamentoEst).value,
        provinciaEst: this.form.get(this.formProvinciaEst).value,
        seccionEst: this.form.get(this.formSeccionEst).value,
        localidadEst: this.form.get(this.formLocalidadEst).value,
        zonaEst: this.form.get(this.formZonaEst).value,
        avenidaEst: this.form.get(this.formAvenidaEst).value,
        numViviendaEst: this.form.get(this.formNumViviendaEst).value,
        idiomaNiniez: this.form.get(this.formIdiomaNiniez).value,
        idiomaFrecuente: this.form.get(this.formIdiomaFrecuente).value,
        nacion: this.form.get(this.formNacion).value,
        centroSalud: this.verificacion(this.form.get(this.formCentroSalud).value),
        problemaSalud: this.form.get(this.formProblemaSalud).value,
        frecuenciaCs: this.form.get(this.formFrecuenciaCs).value,
        seguroCs: this.verificacion(this.form.get(this.formSeguroCs).value),
        agua: this.verificacion(this.form.get(this.formAgua).value),
        banio: this.verificacion(this.form.get(this.formBanio).value),
        alcantarillado: this.verificacion(this.form.get(this.formAlcantarillado).value),
        energiaElectrica: this.verificacion(this.form.get(this.formEnergiaElectrica).value),
        servBasura: this.verificacion(this.form.get(this.formServBasura).value),
        vivienda: this.form.get(this.formVivienda).value,
        internet: this.form.get(this.formInternet).value,
        frecuenciaInternet: this.form.get(this.formFrecuenciaInternet).value,
        trabajo: this.verificacion(this.form.get(this.formTrabajo).value),
        mesesTrabajo: this.form.get(this.formMesesTrabajo).value,
        actividadTrabajo: this.form.get(this.formActividadTrabajo).value,
        turnoTrabajo: this.form.get(this.formTurnoTrabajo).value,
        frecuenciaTrabajo: this.form.get(this.formFrecuenciaTrabajo).value,
        pagoTrabajo: this.verificacion(this.form.get(this.formPagoTrabajo).value),
        tipoPago: this.verificacion(this.form.get(this.formTipoPago).value),
        medioTransporte: this.form.get(this.formMedioTransporte).value,
        tiempoTransporte: this.form.get(this.formTiempoTransporte).value,
        abandonoUe:  this.verificacion(this.form.get(this.formAbandonoUe).value),
        razonAbandono: this.form.get(this.formRazonAbandono).value,
        fechaRegistro: this.form.get(this.formFechaRegistro).value,
        lugarRegistro: this.form.get(this.formLugarRegistro).value,
        idRepresentantePadre: this.form.get(this.formIdRepresentantePadre).value,
        idRepresentanteMadre: this.form.get(this.formIdRepresentanteMadre).value,
        idRepresentanteTutor: this.form.get(this.formIdRepresentanteTutor).value,
        idEstudiante: this.form.get(this.formIdEstudiante).value,
        estadoSql: this.rude['estadoSql']
      };
      this.rudeService.updateRude(rude.id, rude)
        .subscribe((data) => {
          this.router.navigate(['/rude']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/rude']);
  }
  get codSieue(){ return this.form.get(this.formCodSieue); }
  get pais(){ return this.form.get(this.formPais); }
  get departamento(){ return this.form.get(this.formDepartamento); }
  get provincia(){ return this.form.get(this.formProvincia); }
  get localidad(){ return this.form.get(this.formLocalidad); }
  get oficialia(){ return this.form.get(this.formOficialia); }
  get libro(){ return this.form.get(this.formLibro); }
  get partida(){ return this.form.get(this.formPartida); }
  get folio(){ return this.form.get(this.formFolio); }
  get complemento(){ return this.form.get(this.formComplemento); }
  get expedido(){ return this.form.get(this.formExpedido); }
  get codRude(){ return this.form.get(this.formCodRude); }
  get sexo(){ return this.form.get(this.formSexo); }
  get discapacidad(){ return this.form.get(this.formDiscapacidad); }
  get numDiscapacidad(){ return this.form.get(this.formNumDiscapacidad); }
  get tipoDiscapacidad(){ return this.form.get(this.formTipoDiscapacidad); }
  get gradoDiscapacidad(){ return this.form.get(this.formGradoDiscapacidad); }
  get departamentoEst(){ return this.form.get(this.formDepartamentoEst); }
  get provinciaEst(){ return this.form.get(this.formProvinciaEst); }
  get seccionEst(){ return this.form.get(this.formSeccionEst); }
  get localidadEst(){ return this.form.get(this.formLocalidadEst); }
  get zonaEst(){ return this.form.get(this.formZonaEst); }
  get avenidaEst(){ return this.form.get(this.formAvenidaEst); }
  get numViviendaEst(){ return this.form.get(this.formNumViviendaEst); }
  get idiomaNiniez(){ return this.form.get(this.formIdiomaNiniez); }
  get idiomaFrecuente(){ return this.form.get(this.formIdiomaFrecuente); }
  get nacion(){ return this.form.get(this.formNacion); }
  get centroSalud(){ return this.form.get(this.formCentroSalud); }
  get problemaSalud(){ return this.form.get(this.formProblemaSalud); }
  get frecuenciaCs(){ return this.form.get(this.formFrecuenciaCs); }
  get seguroCs(){ return this.form.get(this.formSeguroCs); }
  get agua(){ return this.form.get(this.formAgua); }
  get banio(){ return this.form.get(this.formBanio); }
  get alcantarillado(){ return this.form.get(this.formAlcantarillado); }
  get energiaElectrica(){ return this.form.get(this.formEnergiaElectrica); }
  get servBasura(){ return this.form.get(this.formServBasura); }
  get vivienda(){ return this.form.get(this.formVivienda); }
  get internet(){ return this.form.get(this.formInternet); }
  get frecuenciaInternet(){ return this.form.get(this.formFrecuenciaInternet); }
  get trabajo(){ return this.form.get(this.formTrabajo); }
  get mesesTrabajo(){ return this.form.get(this.formMesesTrabajo); }
  get actividadTrabajo(){ return this.form.get(this.formActividadTrabajo); }
  get turnoTrabajo(){ return this.form.get(this.formTurnoTrabajo); }
  get frecuenciaTrabajo(){ return this.form.get(this.formFrecuenciaTrabajo); }
  get pagoTrabajo(){ return this.form.get(this.formPagoTrabajo); }
  get tipoPago(){ return this.form.get(this.formTipoPago); }
  get medioTransporte(){ return this.form.get(this.formMedioTransporte); }
  get tiempoTransporte(){ return this.form.get(this.formTiempoTransporte); }
  get abandonoUe(){ return this.form.get(this.formAbandonoUe); }
  get razonAbandono(){ return this.form.get(this.formRazonAbandono); }
  get fechaRegistro(){ return this.form.get(this.formFechaRegistro); }
  get lugarRegistro(){ return this.form.get(this.formLugarRegistro); }
  get idRepresentantePadre(){ return this.form.get(this.formIdRepresentantePadre); }
  get idRepresentanteMadre(){ return this.form.get(this.formIdRepresentanteMadre); }
  get idRepresentanteTutor(){ return this.form.get(this.formIdRepresentanteTutor); }
  get idEstudiante(){ return this.form.get(this.formIdEstudiante); }

  ListaSelectRepresentante(){
    this.serviceRepresentante.getRepresentantes().subscribe(response=>{
      this.listaSelectRepresentante=response.data;
    });
  }
  ListaSelectEstudiante(){
    this.serviceEstudiante.getEstudiantes().subscribe(response=>{
      this.listaSelectEstudiante=response.data;
    });
  }

  verificacion(obj: string){
    if(obj==="1"){
      return true
    }else if(obj === "0"){
      return false
    }
  }
  verificacionInversa(obj: boolean){
    if(obj===true){
      return "1"
    }else if(obj === false){
      return "0"
    }
  }

}

