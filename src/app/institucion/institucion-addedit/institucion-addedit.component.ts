import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitucionService } from '../../services/institucion.service';
import { Institucion } from '../../models/institucion';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-institucion-addedit',
  templateUrl: './institucion-addedit.component.html',
  styleUrls: ['./institucion-addedit.component.css']
})
export class InstitucionAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formCodUe: string;
  formNombreUe: string;
  formNumResolucionAdm1;
  formFechaResolucionAdm1: string;
  formCodDistritoEducativo: string;
  formNombreDistritoEducativo: string;
  formNumResolucionAdm2;
  formFechaResolucionAdm2;
  formCodEdificioEscolar: string;
  formNuevoCodEdificioEscolar: string;
  formDepartamento: string;
  formProvincia: string;
  formSeccionMunicipal: string;
  formCanton: string;
  formCiudad: string;
  formZona: string;
  formDireccion: string;
  formEstatal;
  formConvenio;
  formNombreInstitucion: string;
  formComunitaria;
  formPrivada;
  formEdFormal;
  formEdInicial;
  formEdPrimaria;
  formEdSecundaria;
  formEdAlternativa;
  formEdAdultos;
  formEdEspecial;
  formEdPermanente;
  formBachillerato;
  formHumanistico;
  formTecnico;
  formSiglas: string;
  formLatitud;
  formLongitud;
  formCorreo: string;
  formTelefono1: string;
  formTelefono2: string;
  formCelular1: string;
  formCelular2: string;
  formWeb: string;
  formDescripcion: string;
  formLugarRecepcion: string;
  formFechaRecepcion: string;
  institucionId: number;
  errorMessage: any;
  institucion: [];

  constructor( private institucionService: InstitucionService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
    const idParam = 'id';
    this.actionType = 'Add';
    this.formCodUe = 'codUe';
    this.formNombreUe = 'nombreUe';
    this.formNumResolucionAdm1 = 'numResolucionAdm1';
    this.formFechaResolucionAdm1 = 'fechaResolucionAdm1';
    this.formCodDistritoEducativo = 'codDistritoEducativo';
    this.formNombreDistritoEducativo = 'nombreDistritoEducativo';
    this.formNumResolucionAdm2 = 'numResolucionAdm2';
    this.formFechaResolucionAdm2 = 'fechaResolucionAdm2';
    this.formCodEdificioEscolar = 'codEdificioEscolar';
    this.formNuevoCodEdificioEscolar = 'nuevoCodEdificioEscolar';
    this.formDepartamento = 'departamento';
    this.formProvincia = 'provincia';
    this.formSeccionMunicipal = 'seccionMunicipal';
    this.formCanton = 'canton';
    this.formCiudad = 'ciudad';
    this.formZona = 'zona';
    this.formDireccion = 'direccion';
    this.formEstatal = 'estatal';
    this.formConvenio = 'convenio';
    this.formNombreInstitucion = 'nombreInstitucion';
    this.formComunitaria = 'comunitaria';
    this.formPrivada = 'privada';
    this.formEdFormal = 'edFormal';
    this.formEdInicial = 'edInicial';
    this.formEdPrimaria = 'edPrimaria';
    this.formEdSecundaria = 'edSecundaria';
    this.formEdAlternativa = 'edAlternativa';
    this.formEdAdultos = 'edAdultos';
    this.formEdEspecial = 'edEspecial';
    this.formEdPermanente = 'edPermanente';
    this.formBachillerato = 'bachillerato';
    this.formHumanistico = 'humanistico';
    this.formTecnico = 'tecnico';
    this.formSiglas = 'siglas';
    this.formLatitud = 'latitud';
    this.formLongitud = 'longitud';
    this.formCorreo = 'correo';
    this.formTelefono1 = 'telefono1';
    this.formTelefono2 = 'telefono2';
    this.formCelular1 = 'celular1';
    this.formCelular2 = 'celular2';
    this.formWeb = 'web';
    this.formDescripcion = 'descripcion';
    this.formLugarRecepcion = 'lugarRecepcion';
    this.formFechaRecepcion = 'fechaRecepcion';


    if (this.avRoute.snapshot.params[idParam]){
      this.institucionId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        institucionId: 0,
        codUe: ['', [Validators.required]],
        nombreUe: ['', [Validators.required]],
        numResolucionAdm1: ['', [Validators.required]],
        fechaResolucionAdm1: ['', [Validators.required]],
        codDistritoEducativo: ['', [Validators.required]],
        nombreDistritoEducativo: ['', [Validators.required]],
        numResolucionAdm2: ['', [Validators.required]],
        fechaResolucionAdm2: ['', [Validators.required]],
        codEdificioEscolar: ['', [Validators.required]],
        nuevoCodEdificioEscolar: ['', [Validators.required]],
        departamento: ['', [Validators.required]],
        provincia: ['', [Validators.required]],
        seccionMunicipal: ['', [Validators.required]],
        canton: ['', [Validators.required]],
        ciudad: ['', [Validators.required]],
        zona: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        estatal: ['', [Validators.required]],
        convenio: ['', [Validators.required]],
        nombreInstitucion: ['', [Validators.required]],
        comunitaria: ['', [Validators.required]],
        privada: ['', [Validators.required]],
        edFormal: ['', [Validators.required]],
        edInicial: ['', [Validators.required]],
        edPrimaria: ['', [Validators.required]],
        edSecundaria: ['', [Validators.required]],
        edAlternativa: ['', [Validators.required]],
        edAdultos: ['', [Validators.required]],
        edEspecial: ['', [Validators.required]],
        edPermanente: ['', [Validators.required]],
        bachillerato: ['', [Validators.required]],
        humanistico: ['', [Validators.required]],
        tecnico: ['', [Validators.required]],
        siglas: ['', [Validators.required]],
        latitud: ['', [Validators.required]],
        longitud: ['', [Validators.required]],
        correo: [''],
        telefono1: [''],
        telefono2: [''],
        celular1: [''],
        celular2: [''],
        web: [''],
        descripcion: [''],
        lugarRecepcion: ['', [Validators.required]],
        fechaRecepcion: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.institucionId > 0){
      this.actionType = 'Edit';
      this.institucionService.getInstitucion(this.institucionId)
      .subscribe(response => (
        this.institucion = response.data,
        this.form.controls[this.formCodUe].setValue(this.institucion['codUe']),
        this.form.controls[this.formNombreUe].setValue(this.institucion['nombreUe']),
        this.form.controls[this.formNumResolucionAdm1].setValue(this.institucion['numResolucionAdm1']),
        this.form.controls[this.formFechaResolucionAdm1].setValue(this.institucion['fechaResolucionAdm1']),
        this.form.controls[this.formCodDistritoEducativo].setValue(this.institucion['codDistritoEducativo']),
        this.form.controls[this.formNombreDistritoEducativo].setValue(this.institucion['nombreDistritoEducativo']),
        this.form.controls[this.formNumResolucionAdm2].setValue(this.institucion['numResolucionAdm2']),
        this.form.controls[this.formFechaResolucionAdm2].setValue(this.institucion['fechaResolucionAdm2']),
        this.form.controls[this.formCodEdificioEscolar].setValue(this.institucion['codEdificioEscolar']),
        this.form.controls[this.formNuevoCodEdificioEscolar].setValue(this.institucion['nuevoCodEdificioEscolar']),
        this.form.controls[this.formDepartamento].setValue(this.institucion['departamento']),
        this.form.controls[this.formProvincia].setValue(this.institucion['provincia']),
        this.form.controls[this.formSeccionMunicipal].setValue(this.institucion['seccionMunicipal']),
        this.form.controls[this.formCanton].setValue(this.institucion['canton']),
        this.form.controls[this.formCiudad].setValue(this.institucion['ciudad']),
        this.form.controls[this.formZona].setValue(this.institucion['zona']),
        this.form.controls[this.formDireccion].setValue(this.institucion['direccion']),
        this.form.controls[this.formEstatal].setValue(this.verificacionInversa(this.institucion['estatal'])),
        this.form.controls[this.formConvenio].setValue(this.verificacionInversa(this.institucion['convenio'])),
        this.form.controls[this.formNombreInstitucion].setValue(this.institucion['nombreInstitucion']),
        this.form.controls[this.formComunitaria].setValue(this.verificacionInversa(this.institucion['comunitaria'])),
        this.form.controls[this.formPrivada].setValue(this.verificacionInversa(this.institucion['privada'])),
        this.form.controls[this.formEdFormal].setValue(this.verificacionInversa(this.institucion['edFormal'])),
        this.form.controls[this.formEdInicial].setValue(this.verificacionInversa(this.institucion['edInicial'])),
        this.form.controls[this.formEdPrimaria].setValue(this.verificacionInversa(this.institucion['edPrimaria'])),
        this.form.controls[this.formEdSecundaria].setValue(this.verificacionInversa(this.institucion['edSecundaria'])),
        this.form.controls[this.formEdAlternativa].setValue(this.verificacionInversa(this.institucion['edAlternativa'])),
        this.form.controls[this.formEdAdultos].setValue(this.verificacionInversa(this.institucion['edAdultos'])),
        this.form.controls[this.formEdEspecial].setValue(this.verificacionInversa(this.institucion['edEspecial'])),
        this.form.controls[this.formEdPermanente].setValue(this.verificacionInversa(this.institucion['edPermanente'])),
        this.form.controls[this.formBachillerato].setValue(this.verificacionInversa(this.institucion['bachillerato'])),
        this.form.controls[this.formHumanistico].setValue(this.verificacionInversa(this.institucion['humanistico'])),
        this.form.controls[this.formTecnico].setValue(this.verificacionInversa(this.institucion['tecnico'])),
        this.form.controls[this.formSiglas].setValue(this.institucion['siglas']),
        this.form.controls[this.formLatitud].setValue(this.institucion['latitud']),
        this.form.controls[this.formLongitud].setValue(this.institucion['longitud']),
        this.form.controls[this.formCorreo].setValue(this.institucion['correo']),
        this.form.controls[this.formTelefono1].setValue(this.institucion['telefono1']),
        this.form.controls[this.formTelefono2].setValue(this.institucion['telefono2']),
        this.form.controls[this.formCelular1].setValue(this.institucion['celular1']),
        this.form.controls[this.formCelular2].setValue(this.institucion['celular2']),
        this.form.controls[this.formWeb].setValue(this.institucion['web']),
        this.form.controls[this.formDescripcion].setValue(this.institucion['descripcion']),
        this.form.controls[this.formLugarRecepcion].setValue(this.institucion['lugarRecepcion']),
        this.form.controls[this.formFechaRecepcion].setValue(this.institucion['fechaRecepcion'])
        ));
    }
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const institucion: Institucion = {
        codUe: this.form.get(this.formCodUe).value,
        nombreUe: this.form.get(this.formNombreUe).value,
        numResolucionAdm1: this.form.get(this.formNumResolucionAdm1).value,
        fechaResolucionAdm1: this.form.get(this.formFechaResolucionAdm1).value,
        codDistritoEducativo: this.form.get(this.formCodDistritoEducativo).value,
        nombreDistritoEducativo: this.form.get(this.formNombreDistritoEducativo).value,
        numResolucionAdm2: this.form.get(this.formNumResolucionAdm2).value,
        fechaResolucionAdm2: this.form.get(this.formFechaResolucionAdm2).value,
        codEdificioEscolar: this.form.get(this.formCodEdificioEscolar).value,
        nuevoCodEdificioEscolar: this.form.get(this.formNuevoCodEdificioEscolar).value,
        departamento: this.form.get(this.formDepartamento).value,
        provincia: this.form.get(this.formProvincia).value,
        seccionMunicipal: this.form.get(this.formSeccionMunicipal).value,
        canton: this.form.get(this.formCanton).value,
        ciudad: this.form.get(this.formCiudad).value,
        zona: this.form.get(this.formZona).value,
        direccion: this.form.get(this.formDireccion).value,
        estatal: this.verificacion(this.form.get(this.formEstatal).value),
        convenio: this.verificacion(this.form.get(this.formConvenio).value),
        nombreInstitucion: this.form.get(this.formNombreInstitucion).value,
        comunitaria: this.verificacion(this.form.get(this.formComunitaria).value),
        privada: this.verificacion(this.form.get(this.formPrivada).value),
        edFormal: this.verificacion(this.form.get(this.formEdFormal).value),
        edInicial: this.verificacion(this.form.get(this.formEdInicial).value),
        edPrimaria: this.verificacion(this.form.get(this.formEdPrimaria).value),
        edSecundaria: this.verificacion(this.form.get(this.formEdSecundaria).value),
        edAlternativa: this.verificacion(this.form.get(this.formEdAlternativa).value),
        edAdultos: this.verificacion(this.form.get(this.formEdAdultos).value),
        edEspecial: this.verificacion(this.form.get(this.formEdEspecial).value),
        edPermanente: this.verificacion(this.form.get(this.formEdPermanente).value),
        bachillerato: this.verificacion(this.form.get(this.formBachillerato).value),
        humanistico: this.verificacion(this.form.get(this.formHumanistico).value),
        tecnico: this.verificacion(this.form.get(this.formTecnico).value),
        siglas: this.form.get(this.formSiglas).value,
        latitud: this.form.get(this.formLatitud).value,
        longitud: this.form.get(this.formLongitud).value,
        correo: this.form.get(this.formCorreo).value,
        telefono1: this.form.get(this.formTelefono1).value,
        telefono2: this.form.get(this.formTelefono2).value,
        celular1: this.form.get(this.formCelular1).value,
        celular2: this.form.get(this.formCelular2).value,
        web: this.form.get(this.formWeb).value,
        descripcion: this.form.get(this.formDescripcion).value,
        lugarRecepcion: this.form.get(this.formLugarRecepcion).value,
        fechaRecepcion: this.form.get(this.formFechaRecepcion).value,

        estadoSql: 1
      };
      
      this.institucionService.saveInstitucion(institucion)
      .subscribe((data) => {
        this.router.navigate(['/institucion']);
      });
    }
    if(this.actionType === 'Edit'){
      const institucion: Institucion = {
        id: this.institucion['id'],
        codUe: this.form.get(this.formCodUe).value,
        nombreUe: this.form.get(this.formNombreUe).value,
        numResolucionAdm1: this.form.get(this.formNumResolucionAdm1).value,
        fechaResolucionAdm1: this.form.get(this.formFechaResolucionAdm1).value,
        codDistritoEducativo: this.form.get(this.formCodDistritoEducativo).value,
        nombreDistritoEducativo: this.form.get(this.formNombreDistritoEducativo).value,
        numResolucionAdm2: this.form.get(this.formNumResolucionAdm2).value,
        fechaResolucionAdm2: this.form.get(this.formFechaResolucionAdm2).value,
        codEdificioEscolar: this.form.get(this.formCodEdificioEscolar).value,
        nuevoCodEdificioEscolar: this.form.get(this.formNuevoCodEdificioEscolar).value,
        departamento: this.form.get(this.formDepartamento).value,
        provincia: this.form.get(this.formProvincia).value,
        seccionMunicipal: this.form.get(this.formSeccionMunicipal).value,
        canton: this.form.get(this.formCanton).value,
        ciudad: this.form.get(this.formCiudad).value,
        zona: this.form.get(this.formZona).value,
        direccion: this.form.get(this.formDireccion).value,
        estatal: this.verificacion(this.form.get(this.formEstatal).value),
        convenio: this.verificacion(this.form.get(this.formConvenio).value),
        nombreInstitucion: this.form.get(this.formNombreInstitucion).value,
        comunitaria: this.verificacion(this.form.get(this.formComunitaria).value),
        privada: this.verificacion(this.form.get(this.formPrivada).value),
        edFormal: this.verificacion(this.form.get(this.formEdFormal).value),
        edInicial: this.verificacion(this.form.get(this.formEdInicial).value),
        edPrimaria:this.verificacion( this.form.get(this.formEdPrimaria).value),
        edSecundaria: this.verificacion(this.form.get(this.formEdSecundaria).value),
        edAlternativa: this.verificacion(this.form.get(this.formEdAlternativa).value),
        edAdultos: this.verificacion(this.form.get(this.formEdAdultos).value),
        edEspecial: this.verificacion(this.form.get(this.formEdEspecial).value),
        edPermanente: this.verificacion(this.form.get(this.formEdPermanente).value),
        bachillerato: this.verificacion(this.form.get(this.formBachillerato).value),
        humanistico: this.verificacion(this.form.get(this.formHumanistico).value),
        tecnico: this.verificacion(this.form.get(this.formTecnico).value),
        siglas: this.form.get(this.formSiglas).value,
        latitud: this.form.get(this.formLatitud).value,
        longitud: this.form.get(this.formLongitud).value,
        correo: this.form.get(this.formCorreo).value,
        telefono1: this.form.get(this.formTelefono1).value,
        telefono2: this.form.get(this.formTelefono2).value,
        celular1: this.form.get(this.formCelular1).value,
        celular2: this.form.get(this.formCelular2).value,
        web: this.form.get(this.formWeb).value,
        descripcion: this.form.get(this.formDescripcion).value,
        lugarRecepcion: this.form.get(this.formLugarRecepcion).value,
        fechaRecepcion: this.form.get(this.formFechaRecepcion).value,
        estadoSql: this.institucion['estadoSql']
      };
      this.institucionService.updateInstitucion(institucion.id, institucion)
        .subscribe((data) => {
          this.router.navigate(['/institucion']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/institucion']);
  }
  get codUe(){ return this.form.get(this.formCodUe); }
  get nombreUe(){ return this.form.get(this.formNombreUe); }
  get numResolucionAdm1(){ return this.form.get(this.formNumResolucionAdm1); }
  get fechaResolucionAdm1(){ return this.form.get(this.formFechaResolucionAdm1); }
  get codDistritoEducativo(){ return this.form.get(this.formCodDistritoEducativo); }
  get nombreDistritoEducativo(){ return this.form.get(this.formNombreDistritoEducativo); }
  get numResolucionAdm2(){ return this.form.get(this.formNumResolucionAdm2); }
  get fechaResolucionAdm2(){ return this.form.get(this.formFechaResolucionAdm2); }
  get codEdificioEscolar(){ return this.form.get(this.formCodEdificioEscolar); }
  get nuevoCodEdificioEscolar(){ return this.form.get(this.formNuevoCodEdificioEscolar); }
  get departamento(){ return this.form.get(this.formDepartamento); }
  get provincia(){ return this.form.get(this.formProvincia); }
  get seccionMunicipal(){ return this.form.get(this.formSeccionMunicipal); }
  get canton(){ return this.form.get(this.formCanton); }
  get ciudad(){ return this.form.get(this.formCiudad); }
  get zona(){ return this.form.get(this.formZona); }
  get direccion(){ return this.form.get(this.formDireccion); }
  get estatal(){ return this.form.get(this.formEstatal); }
  get convenio(){ return this.form.get(this.formConvenio); }
  get nombreInstitucion(){ return this.form.get(this.formNombreInstitucion); }
  get comunitaria(){ return this.form.get(this.formComunitaria); }
  get privada(){ return this.form.get(this.formPrivada); }
  get edFormal(){ return this.form.get(this.formEdFormal); }
  get edInicial(){ return this.form.get(this.formEdInicial); }
  get edPrimaria(){ return this.form.get(this.formEdPrimaria); }
  get edSecundaria(){ return this.form.get(this.formEdSecundaria); }
  get edAlternativa(){ return this.form.get(this.formEdAlternativa); }
  get edAdultos(){ return this.form.get(this.formEdAdultos); }
  get edEspecial(){ return this.form.get(this.formEdEspecial); }
  get edPermanente(){ return this.form.get(this.formEdPermanente); }
  get bachillerato(){ return this.form.get(this.formBachillerato); }
  get humanistico(){ return this.form.get(this.formHumanistico); }
  get tecnico(){ return this.form.get(this.formTecnico); }
  get siglas(){ return this.form.get(this.formSiglas); }
  get latitud(){ return this.form.get(this.formLatitud); }
  get longitud(){ return this.form.get(this.formLongitud); }
  get correo(){ return this.form.get(this.formCorreo); }
  get telefono1(){ return this.form.get(this.formTelefono1); }
  get telefono2(){ return this.form.get(this.formTelefono2); }
  get celular1(){ return this.form.get(this.formCelular1); }
  get celular2(){ return this.form.get(this.formCelular2); }
  get web(){ return this.form.get(this.formWeb); }
  get descripcion(){ return this.form.get(this.formDescripcion); }
  get lugarRecepcion(){ return this.form.get(this.formLugarRecepcion); }
  get fechaRecepcion(){ return this.form.get(this.formFechaRecepcion); }

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

 