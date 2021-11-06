import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RudeService } from '../../services/rude.service';
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante } from '../../models/estudiante';
import { Observable } from 'rxjs';
import { RepresentanteService } from '../../services/representante.service';
import { Rude } from 'src/app/models/rude';
import { Representante } from 'src/app/models/representante';

@Component({
  selector: 'app-registro-rude-editar',
  templateUrl: './registro-rude-editar.component.html',
  styleUrls: ['./registro-rude-editar.component.css']
})
export class RegistroRudeEditarComponent implements OnInit {
  
  states: string[] = ['Psíquica', 'Autismo', 'Síndrome de Down', 'Intelectual', 'Auditiva', 'Física-Motora', 'Sordoceguera', 'Múltiple','Visual'];
  states1: string[] = ['Leve', 'Moderado', 'Grave', 'Muy grave', 'Ceguera total', 'Baja visión'];
  states2: string[] = ['Ninguno','Afroboliviano', 'Araona', 'Aymara', 'Ayoreo', 'Baures', 'Canichana', 'Cabineño', 'Cayubaba','Chácobo', 'Chimán', 'Chiquitano (Monkox)', 
  'Ese ejja', 'Guaraní', 'Baures', 'Canichana', 'Guarasug’we', 'Gwarayu','Itonama','Leco', 'Kallawaya','Machineri', 'Maropa', 'Mojos-Ignaciano', 'Mojos-Trinitario', 
  'More', 'Moseten', 'Movima', 'Pacawara', 'Pukina','Quechua', 'Siriono', 'Tacana', 'Tapiete', 'Toromona', 'Uru Chipaya', 'Weenhayek', 'Yaminahua', 'Yuki','Yuracare'];
  states3: string[] = ['Caja o seguro de salud', 'Establecimientos de salud públicos', 'Establecimientos de salud privados', 'Muy En su vivienda','Medicina Tradicional', 'La farmacia sin receta'];
  states4: string[] = ["Ninguna",'1 a 2 veces', '3 a 5 veces', '6 o más veces'];
  states5: string[] = ['Propia', 'Alquilada', 'Anticretico', 'Cedida por servicios', 'Prestada por parientes o amigos', 'Contrato Mixto'];
  states6: string[] = ['Su vivienda', 'La Unidad Educativa', 'Lugares Públicos', 'Teléfono Celular', 'No accede a internet - Pase a 4.5 ', 'Contrato Mixto'];
  states7: string[] = ['Diariamente', 'Una vez a la semana', 'Más de una vez a la semana', 'Una vez al mes'];
  states8: string[] = ['Agricultura', 'Ganadería o pesca', 'Minería', 'Construcción', 'Zafra', 'Vendedor dependiente','Vendedor por cuenta propia','Transporte o mecánica','Lustrabotas', 
  'Trabajador(a) del hogar o niñero( a)','Ayudante familiar o comunitario en agricultura o ganadería o pesca', 'Ayudante en el hogar en comercio o ventas','Otro trabajo' ];
  states9: string[] = ['Mañana', 'Tarde', 'Noche'];
  states10: string[] = ['Todos los días', 'Días hábiles', 'Fines de semana', 'Eventual / esporádico', 'Días festivos', 'En Vacaciones'];
  states11: string[] = ['A pie', 'En vehículo de transporte terrestre', 'Fluvial', 'Otro'];
  states12: string[] = ['Menos de media hora', 'Entre media hora y una hora', 'Entre una a dos horas', 'Más de dos horas'];
  states13: string[] = ['Tuvo que ayudar a sus padres en su trabajo', 'Tuvo trabajo remunerado', 'Falta de dinero', 'Edad temprana (precocidad) / edad tardía (rezago)','La unidad educativa era distante', 
  'Labores de casa/cuidado de niños(as)', 'Embarazo o paternidad', 'Por enfermedad/accidente/discapacidad','Viaje o traslado', 'Falta de interés','Bullying o discriminación en la Unidad Educativa', 'Otra'];
  states14: string[] = ['Enero', 'Febrero', 'Marzo','Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
  states15: string[] = ['En especie', 'Dinero'];

  form: FormGroup;
  formBuscar: string;

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
  // Estudiante
  formApPaterno: string;
  formApMaterno: string;
  formNombres: string;
  formFechaNacimiento: string;
  formCedulaIdentidad: string;
  formTelefono: string;
  formCelular: string;
  formIdPeriodo;
  //Representante padre
  formCedulaIdentidadP: string;
  formParentescoP: string;
  formIdiomaFrecuenteP: string;
  formApPaternoP: string;
  formApMaternoP: string;
  formNombresP: string;
  formOcupacionLaboralP: string;
  formComplementoP: string;
  formExpedidoP: string;
  formGradoInstruccionP: string;
  formFechaNacimientoP: string;
  formTelefonoP: string;
  formCelularP: string;
  //Representante madre
  formCedulaIdentidadM: string;
  formParentescoM: string;
  formIdiomaFrecuenteM: string;
  formApPaternoM: string;
  formApMaternoM: string;
  formNombresM: string;
  formOcupacionLaboralM: string;
  formComplementoM: string;
  formExpedidoM: string;
  formGradoInstruccionM: string;
  formFechaNacimientoM: string;
  formTelefonoM: string;
  formCelularM: string;
  //Representante Tutor
  formCedulaIdentidadT: string;
  formParentescoT: string;
  formIdiomaFrecuenteT: string;
  formApPaternoT: string;
  formApMaternoT: string;
  formNombresT: string;
  formOcupacionLaboralT: string;
  formComplementoT: string;
  formExpedidoT: string;
  formGradoInstruccionT: string;
  formFechaNacimientoT: string;
  formTelefonoT: string;
  formCelularT: string;
  

  formId;
  rudeId;

  public listaSelectRepresentante: any[];
  public listaSelectEstudiante: any[];
  public rudesLista: any[];
  public buscarLista: any[];
  public representanteLista: any[];

  constructor(private rudeService: RudeService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private serviceRepresentante: RepresentanteService,
    private serviceEstudiante: EstudianteService) { 

    this.formId = 'id';
    this.formBuscar = 'buscar';
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
    //Estudiante
    this.formApPaterno = 'apPaterno';
    this.formApMaterno = 'apMaterno';
    this.formNombres = 'nombres';
    this.formApPaterno = 'apPaterno';
    this.formApMaterno = 'apMaterno';
    this.formNombres = 'nombres';
    this.formFechaNacimiento = 'fechaNacimiento';
    this.formCedulaIdentidad = 'cedulaIdentidad';
    this.formTelefono = 'telefono';
    this.formCelular = 'celular';
    this.formIdPeriodo = 'idPeriodo';
    // Representante Padre
    this.formCedulaIdentidadP = 'cedulaIdentidadP';
    this.formComplementoP = 'complementoP';
    this.formExpedidoP = 'expedidoP';
    this.formApPaternoP = 'apPaternoP';
    this.formApMaternoP = 'apMaternoP';
    this.formNombresP = 'nombresP';
    this.formIdiomaFrecuenteP = 'idiomaFrecuenteP';
    this.formOcupacionLaboralP = 'ocupacionLaboralP';
    this.formGradoInstruccionP = 'gradoInstruccionP';
    this.formFechaNacimientoP = 'fechaNacimientoP';
    this.formParentescoP = 'parentescoP';
    this.formTelefonoP = 'telefonoP';
    this.formCelularP = 'celularP';
    // Representante Madre
    this.formCedulaIdentidadM = 'cedulaIdentidadM';
    this.formComplementoM = 'complementoM';
    this.formExpedidoM = 'expedidoM';
    this.formApPaternoM = 'apPaternoM';
    this.formApMaternoM = 'apMaternoM';
    this.formNombresM = 'nombresM';
    this.formIdiomaFrecuenteM = 'idiomaFrecuenteM';
    this.formOcupacionLaboralM = 'ocupacionLaboralM';
    this.formGradoInstruccionM = 'gradoInstruccionM';
    this.formFechaNacimientoM = 'fechaNacimientoM';
    this.formParentescoM = 'parentescoM';
    this.formTelefonoM = 'telefonoM';
    this.formCelularM = 'celularM';
    // Representante Tutor
    this.formCedulaIdentidadT = 'cedulaIdentidadT';
    this.formComplementoT = 'complementoT';
    this.formExpedidoT = 'expedidoT';
    this.formApPaternoT = 'apPaternoT';
    this.formApMaternoT = 'apMaternoT';
    this.formNombresT = 'nombresT';
    this.formIdiomaFrecuenteT = 'idiomaFrecuenteT';
    this.formOcupacionLaboralT = 'ocupacionLaboralT';
    this.formGradoInstruccionT = 'gradoInstruccionT';
    this.formFechaNacimientoT = 'fechaNacimientoT';
    this.formParentescoT = 'parentescoT';
    this.formTelefonoT = 'telefonoT';
    this.formCelularT = 'celularT';


    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        
        rudeId: 0,
        buscar: ['', [Validators.required]],
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
        // Etudiante
        apPaterno: [''],
        apMaterno: [''],
        nombres: [''],
        fechaNacimiento: [''],
        cedulaIdentidad: [''],
        telefono: [''],
        celular: [''],
        idPeriodo: [''],
        // Representante Padre
        cedulaIdentidadP: [''],
        apPaternoP: [''],
        apMaternoP: [''],
        nombresP: [''],
        ocupacionLaboralP: [''],
        complementoP: [''],
        expedidoP: [''],
        gradoInstruccionP: [''],
        fechaNacimientoP: [''],
        parentescoP: [''],
        idiomaFrecuenteP: [''],
        telefonoP: [''],
        celularP: [''],
        
        // Representante Madre
        cedulaIdentidadM: [''],
        apPaternoM: [''],
        apMaternoM: [''],
        nombresM: [''],
        ocupacionLaboralM: [''],
        complementoM: [''],
        expedidoM: [''],
        gradoInstruccionM: [''],
        fechaNacimientoM: [''],
        parentescoM: [''],
        idiomaFrecuenteM: [''],
        telefonoM: [''],
        celularM: [''],
        // Representante Tutor
        cedulaIdentidadT: [''],
        apPaternoT: [''],
        apMaternoT: [''],
        nombresT: [''],
        ocupacionLaboralT: [''],
        complementoT: [''],
        expedidoT: [''],
        gradoInstruccionT: [''],
        fechaNacimientoT: [''],
        parentescoT: [''],
        idiomaFrecuenteT: [''],
        telefonoT: [''],
        celularT: [''],

        id: [''],
      }
    )
  }

  ngOnInit(): void {
    this.ListaSelectRepresentante();
    this.ListaSelectEstudiante();
  }

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
  
  get id(){ return this.form.get(this.formId); }
  get buscar(){ return this.form.get(this.formBuscar); }
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
  // Estudiante
  get apPaterno(){ return this.form.get(this.formApPaterno); }
  get apMaterno(){ return this.form.get(this.formApMaterno); }
  get nombres(){ return this.form.get(this.formNombres); }
  get fechaNacimiento(){ return this.form.get(this.formFechaNacimiento); }
  get cedulaIdentidad(){ return this.form.get(this.formCedulaIdentidad); }
  get telefono(){ return this.form.get(this.formTelefono); }
  get celular(){ return this.form.get(this.formCelular); }
  get idPeriodo(){ return this.form.get(this.formIdPeriodo); }
  // Representante Padre
  get cedulaIdentidadP(){ return this.form.get(this.formCedulaIdentidadP); }
  get apPaternoP(){ return this.form.get(this.formApPaternoP); }
  get apMaternoP(){ return this.form.get(this.formApMaternoP); }
  get nombresP(){ return this.form.get(this.formNombresP); }
  get ocupacionLaboralP(){ return this.form.get(this.formOcupacionLaboralP); }
  get complementoP(){ return this.form.get(this.formComplementoP); }
  get expedidoP(){ return this.form.get(this.formExpedidoP); }
  get gradoInstruccionP(){ return this.form.get(this.formGradoInstruccionP); }
  get fechaNacimientoP(){ return this.form.get(this.formFechaNacimientoP); }
  get parentescoP(){ return this.form.get(this.formParentescoP); }
  get idiomaFrecuenteP(){ return this.form.get(this.formIdiomaFrecuenteP); }
  get telefonoP(){ return this.form.get(this.formTelefonoP); }
  get celularP(){ return this.form.get(this.formCelularP); }
  // Representante Madre
  get cedulaIdentidadM(){ return this.form.get(this.formCedulaIdentidadM); }
  get apPaternoM(){ return this.form.get(this.formApPaternoM); }
  get apMaternoM(){ return this.form.get(this.formApMaternoM); }
  get nombresM(){ return this.form.get(this.formNombresM); }
  get ocupacionLaboralM(){ return this.form.get(this.formOcupacionLaboralM); }
  get complementoM(){ return this.form.get(this.formComplementoM); }
  get expedidoM(){ return this.form.get(this.formExpedidoM); }
  get gradoInstruccionM(){ return this.form.get(this.formGradoInstruccionM); }
  get fechaNacimientoM(){ return this.form.get(this.formFechaNacimientoM); }
  get parentescoM(){ return this.form.get(this.formParentescoM); }
  get idiomaFrecuenteM(){ return this.form.get(this.formIdiomaFrecuenteM); }
  get telefonoM(){ return this.form.get(this.formTelefonoM); }
  get celularM(){ return this.form.get(this.formCelularM); }
  // Representante Tutor
  get cedulaIdentidadT(){ return this.form.get(this.formCedulaIdentidadT); }
  get apPaternoT(){ return this.form.get(this.formApPaternoT); }
  get apMaternoT(){ return this.form.get(this.formApMaternoT); }
  get nombresT(){ return this.form.get(this.formNombresT); }
  get ocupacionLaboralT(){ return this.form.get(this.formOcupacionLaboralT); }
  get complementoT(){ return this.form.get(this.formComplementoT); }
  get expedidoT(){ return this.form.get(this.formExpedidoT); }
  get gradoInstruccionT(){ return this.form.get(this.formGradoInstruccionT); }
  get fechaNacimientoT(){ return this.form.get(this.formFechaNacimientoT); }
  get parentescoT(){ return this.form.get(this.formParentescoT); }
  get idiomaFrecuenteT(){ return this.form.get(this.formIdiomaFrecuenteT); }
  get telefonoT(){ return this.form.get(this.formTelefonoT); }
  get celularT(){ return this.form.get(this.formCelularT); }


  buscarId(codRude){
    this.rudeService.getBuscar(codRude).subscribe(response =>
      {
        this.rudesLista = (response as any);
        console.log(this.rudesLista);
        this.rudeId = this.rudesLista['id'],
        this.form.controls[this.formCodSieue].setValue(this.rudesLista['codSieue']),
        this.form.controls[this.formPais].setValue(this.rudesLista['pais']),
        this.form.controls[this.formDepartamento].setValue(this.rudesLista['departamento']),
        this.form.controls[this.formProvincia].setValue(this.rudesLista['provincia']),
        this.form.controls[this.formLocalidad].setValue(this.rudesLista['localidad']),
        this.form.controls[this.formOficialia].setValue(this.rudesLista['oficialia']),
        this.form.controls[this.formLibro].setValue(this.rudesLista['libro']),
        this.form.controls[this.formPartida].setValue(this.rudesLista['partida']),
        this.form.controls[this.formFolio].setValue(this.rudesLista['folio']),
        this.form.controls[this.formComplemento].setValue(this.rudesLista['complemento']),
        this.form.controls[this.formExpedido].setValue(this.rudesLista['expedido']),
        this.form.controls[this.formCodRude].setValue(this.rudesLista['codRude']),
        this.form.controls[this.formSexo].setValue(this.verificacionInversa(this.rudesLista['sexo'])),
        this.form.controls[this.formDiscapacidad].setValue(this.verificacionInversa(this.rudesLista['discapacidad'])),
        this.form.controls[this.formNumDiscapacidad].setValue(this.rudesLista['numDiscapacidad']),
        this.form.controls[this.formTipoDiscapacidad].setValue(this.rudesLista['tipoDiscapacidad']),
        this.form.controls[this.formGradoDiscapacidad].setValue(this.rudesLista['gradoDiscapacidad']),
        this.form.controls[this.formDepartamentoEst].setValue(this.rudesLista['departamentoEst']),
        this.form.controls[this.formProvinciaEst].setValue(this.rudesLista['provinciaEst']),
        this.form.controls[this.formSeccionEst].setValue(this.rudesLista['seccionEst']),
        this.form.controls[this.formLocalidadEst].setValue(this.rudesLista['localidadEst']),
        this.form.controls[this.formZonaEst].setValue(this.rudesLista['zonaEst']),
        this.form.controls[this.formAvenidaEst].setValue(this.rudesLista['avenidaEst']),
        this.form.controls[this.formNumViviendaEst].setValue(this.rudesLista['numViviendaEst']),
        this.form.controls[this.formIdiomaNiniez].setValue(this.rudesLista['idiomaNiniez']),
        this.form.controls[this.formIdiomaFrecuente].setValue(this.rudesLista['idiomaFrecuente']),
        this.form.controls[this.formNacion].setValue(this.rudesLista['nacion']),
        this.form.controls[this.formCentroSalud].setValue(this.verificacionInversa(this.rudesLista['centroSalud'])),
        this.form.controls[this.formProblemaSalud].setValue(this.rudesLista['problemaSalud']),
        this.form.controls[this.formFrecuenciaCs].setValue(this.rudesLista['frecuenciaCs']),
        this.form.controls[this.formSeguroCs].setValue(this.verificacionInversa(this.rudesLista['seguroCs'])),
        this.form.controls[this.formAgua].setValue(this.verificacionInversa(this.rudesLista['agua'])),
        this.form.controls[this.formBanio].setValue(this.verificacionInversa(this.rudesLista['banio'])),
        this.form.controls[this.formAlcantarillado].setValue(this.verificacionInversa(this.rudesLista['alcantarillado'])),
        this.form.controls[this.formEnergiaElectrica].setValue(this.verificacionInversa(this.rudesLista['energiaElectrica'])),
        this.form.controls[this.formServBasura].setValue(this.verificacionInversa(this.rudesLista['servBasura'])),
        this.form.controls[this.formVivienda].setValue(this.rudesLista['vivienda']),
        this.form.controls[this.formInternet].setValue(this.rudesLista['internet']),
        this.form.controls[this.formFrecuenciaInternet].setValue(this.rudesLista['frecuenciaInternet']),
        this.form.controls[this.formTrabajo].setValue(this.verificacionInversa(this.rudesLista['trabajo'])),
        this.form.controls[this.formMesesTrabajo].setValue(this.rudesLista['mesesTrabajo']),
        this.form.controls[this.formActividadTrabajo].setValue(this.rudesLista['actividadTrabajo']),
        this.form.controls[this.formTurnoTrabajo].setValue(this.rudesLista['turnoTrabajo']),
        this.form.controls[this.formFrecuenciaTrabajo].setValue(this.rudesLista['frecuenciaTrabajo']),
        this.form.controls[this.formPagoTrabajo].setValue(this.verificacionInversa(this.rudesLista['pagoTrabajo'])),
        this.form.controls[this.formTipoPago].setValue(this.verificacionInversa(this.rudesLista['tipoPago'])),
        this.form.controls[this.formMedioTransporte].setValue(this.rudesLista['medioTransporte']),
        this.form.controls[this.formTiempoTransporte].setValue(this.rudesLista['tiempoTransporte']),
        this.form.controls[this.formAbandonoUe].setValue(this.verificacionInversa(this.rudesLista['abandonoUe'])),
        this.form.controls[this.formRazonAbandono].setValue(this.rudesLista['razonAbandono']),
        this.form.controls[this.formFechaRegistro].setValue(this.rudesLista['fechaRegistro']),
        this.form.controls[this.formLugarRegistro].setValue(this.rudesLista['lugarRegistro']),
        this.form.controls[this.formIdRepresentantePadre].setValue(this.rudesLista['idRepresentantePadre']),
        this.form.controls[this.formIdRepresentanteMadre].setValue(this.rudesLista['idRepresentanteMadre']),
        this.form.controls[this.formIdRepresentanteTutor].setValue(this.rudesLista['idRepresentanteTutor']),
        this.form.controls[this.formIdEstudiante].setValue(this.rudesLista['idEstudiante']),
        this.form.controls[this.formId].setValue(this.rudesLista['id']),

          this.serviceEstudiante.getEstudianteBuscar(this.rudesLista['idEstudiante'], 1).subscribe(response=>{
            this.buscarLista=response.data;
            this.form.controls[this.formApPaterno].setValue(this.buscarLista['apPaterno'])
            this.form.controls[this.formApMaterno].setValue(this.buscarLista['apMaterno'])
            this.form.controls[this.formNombres].setValue(this.buscarLista['nombres'])
            this.form.controls[this.formFechaNacimiento].setValue(this.buscarLista['fechaNacimiento'])
            this.form.controls[this.formCedulaIdentidad].setValue(this.buscarLista['cedulaIdentidad'])
            this.form.controls[this.formTelefono].setValue(this.buscarLista['telefono'])
            this.form.controls[this.formCelular].setValue(this.buscarLista['celular'])
            this.form.controls[this.formIdPeriodo].setValue(this.buscarLista['idPeriodo'])
          });

          this.serviceRepresentante.getRepresentanteBuscar(this.rudesLista['idRepresentantePadre'], 1).subscribe(response=>{
            this.representanteLista=response.data;
            this.form.controls[this.formCedulaIdentidadP].setValue(this.representanteLista['cedulaIdentidad'])
            this.form.controls[this.formParentescoP].setValue(this.representanteLista['parentesco'])
            this.form.controls[this.formIdiomaFrecuenteP].setValue(this.representanteLista['idiomaFrecuente'])
            this.form.controls[this.formApPaternoP].setValue(this.representanteLista['apPaterno'])
            this.form.controls[this.formApMaternoP].setValue(this.representanteLista['apMaterno'])
            this.form.controls[this.formNombresP].setValue(this.representanteLista['nombres'])
            this.form.controls[this.formOcupacionLaboralP].setValue(this.representanteLista['ocupacionLaboral'])
            this.form.controls[this.formComplementoP].setValue(this.representanteLista['complemento'])
            this.form.controls[this.formExpedidoP].setValue(this.representanteLista['expedido'])
            this.form.controls[this.formGradoInstruccionP].setValue(this.representanteLista['gradoInstruccion'])
            this.form.controls[this.formFechaNacimientoP].setValue(this.representanteLista['fechaNacimiento'])
            this.form.controls[this.formTelefonoP].setValue(this.representanteLista['telefono'])
            this.form.controls[this.formCelularP].setValue(this.representanteLista['celular'])
          });

          this.serviceRepresentante.getRepresentanteBuscar(this.rudesLista['idRepresentanteMadre'], 1).subscribe(response=>{
            this.representanteLista=response.data;
            this.form.controls[this.formCedulaIdentidadM].setValue(this.representanteLista['cedulaIdentidad'])
            this.form.controls[this.formParentescoM].setValue(this.representanteLista['parentesco'])
            this.form.controls[this.formIdiomaFrecuenteM].setValue(this.representanteLista['idiomaFrecuente'])
            this.form.controls[this.formApPaternoM].setValue(this.representanteLista['apPaterno'])
            this.form.controls[this.formApMaternoM].setValue(this.representanteLista['apMaterno'])
            this.form.controls[this.formNombresM].setValue(this.representanteLista['nombres'])
            this.form.controls[this.formOcupacionLaboralM].setValue(this.representanteLista['ocupacionLaboral'])
            this.form.controls[this.formComplementoM].setValue(this.representanteLista['complemento'])
            this.form.controls[this.formExpedidoM].setValue(this.representanteLista['expedido'])
            this.form.controls[this.formGradoInstruccionM].setValue(this.representanteLista['gradoInstruccion'])
            this.form.controls[this.formFechaNacimientoM].setValue(this.representanteLista['fechaNacimiento'])
            this.form.controls[this.formTelefonoM].setValue(this.representanteLista['telefono'])
            this.form.controls[this.formCelularM].setValue(this.representanteLista['celular'])
          });

          this.serviceRepresentante.getRepresentanteBuscar(this.rudesLista['idRepresentanteTutor'], 1).subscribe(response=>{
            this.representanteLista=response.data;
            this.form.controls[this.formCedulaIdentidadT].setValue(this.representanteLista['cedulaIdentidad'])
            this.form.controls[this.formParentescoT].setValue(this.representanteLista['parentesco'])
            this.form.controls[this.formIdiomaFrecuenteT].setValue(this.representanteLista['idiomaFrecuente'])
            this.form.controls[this.formApPaternoT].setValue(this.representanteLista['apPaterno'])
            this.form.controls[this.formApMaternoT].setValue(this.representanteLista['apMaterno'])
            this.form.controls[this.formNombresT].setValue(this.representanteLista['nombres'])
            this.form.controls[this.formOcupacionLaboralT].setValue(this.representanteLista['ocupacionLaboral'])
            this.form.controls[this.formComplementoT].setValue(this.representanteLista['complemento'])
            this.form.controls[this.formExpedidoT].setValue(this.representanteLista['expedido'])
            this.form.controls[this.formGradoInstruccionT].setValue(this.representanteLista['gradoInstruccion'])
            this.form.controls[this.formFechaNacimientoT].setValue(this.representanteLista['fechaNacimiento'])
            this.form.controls[this.formTelefonoT].setValue(this.representanteLista['telefono'])
            this.form.controls[this.formCelularT].setValue(this.representanteLista['celular'])
          });
      });
  }

  cancel(){
    this.router.navigate(['/registro-rude']);
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

  editar(){
    if(this.rudeId > 0){
      const estudiante: Estudiante = {
        id: this.form.get(this.formIdEstudiante).value,
        apPaterno: this.form.get(this.formApPaterno).value,
        apMaterno: this.form.get(this.formApMaterno).value,
        nombres: this.form.get(this.formNombres).value,
        fechaNacimiento: this.form.get(this.formFechaNacimiento).value,
        cedulaIdentidad: this.form.get(this.formCedulaIdentidad).value,
        telefono: this.form.get(this.formTelefono).value,
        celular: this.form.get(this.formCelular).value,
        idPeriodo: this.form.get(this.formIdPeriodo).value,
        estadoSql: 1
      };
      this.serviceEstudiante.updateEstudiante(estudiante.id, estudiante)
        .subscribe((data) => {
          this.router.navigate(['/registro-rude']);
      });
      const rude: Rude = {
        id: this.rudeId,
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
      this.rudeService.updateRude(rude.id, rude)
        .subscribe((data) => {
          this.router.navigate(['/registro-rude']);
      });
      const representanteP: Representante = {
        id: this.form.get(this.formIdRepresentantePadre).value,
        cedulaIdentidad: this.form.get(this.formCedulaIdentidadP).value,
        complemento: this.form.get(this.formComplementoP).value,
        expedido: this.form.get(this.formExpedidoP).value,
        apPaterno: this.form.get(this.formApPaternoP).value,
        apMaterno: this.form.get(this.formApMaternoP).value,
        nombres: this.form.get(this.formNombresP).value,
        idiomaFrecuente: this.form.get(this.formIdiomaFrecuenteP).value,
        ocupacionLaboral: this.form.get(this.formOcupacionLaboralP).value,
        gradoInstruccion: this.form.get(this.formGradoInstruccionP).value,
        fechaNacimiento: this.form.get(this.formFechaNacimientoP).value,
        parentesco: this.form.get(this.formParentescoP).value,
        telefono: this.form.get(this.formTelefonoP).value,
        celular: this.form.get(this.formCelularP).value,
        estadoSql: 1
      };
      this.serviceRepresentante.updateRepresentante(representanteP.id, representanteP)
        .subscribe((data) => {
          this.router.navigate(['/registro-rude']);
      });

      const representanteM: Representante = {
        id: this.form.get(this.formIdRepresentanteMadre).value,
        cedulaIdentidad: this.form.get(this.formCedulaIdentidadM).value,
        complemento: this.form.get(this.formComplementoM).value,
        expedido: this.form.get(this.formExpedidoM).value,
        apPaterno: this.form.get(this.formApPaternoM).value,
        apMaterno: this.form.get(this.formApMaternoM).value,
        nombres: this.form.get(this.formNombresM).value,
        idiomaFrecuente: this.form.get(this.formIdiomaFrecuenteM).value,
        ocupacionLaboral: this.form.get(this.formOcupacionLaboralM).value,
        gradoInstruccion: this.form.get(this.formGradoInstruccionM).value,
        fechaNacimiento: this.form.get(this.formFechaNacimientoM).value,
        parentesco: this.form.get(this.formParentescoM).value,
        telefono: this.form.get(this.formTelefonoM).value,
        celular: this.form.get(this.formCelularM).value,
        estadoSql: 1
      };
      this.serviceRepresentante.updateRepresentante(representanteM.id, representanteM)
        .subscribe((data) => {
          this.router.navigate(['/registro-rude']);
      });
    }
  }


  delete(rudeId){
    const res = confirm('Quiere eliminar RUDE con Id: ' + rudeId);
    if(res){
      this.rudeService.deleteRude(rudeId).subscribe((data) => {
        this.router.navigate(['/registro-rude']);
      });
    }
  }

}
