import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import { RudeService } from '../services/rude.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from '../services/estudiante.service';
import { RepresentanteService } from '../services/representante.service';

@Component({
  selector: 'app-imprimir-rude',
  templateUrl: './imprimir-rude.component.html',
  styleUrls: ['./imprimir-rude.component.css']
})
export class ImprimirRudeComponent implements OnInit {
  form: FormGroup;
  formBuscar: string;

  formCodSieue;
  formPais;
  formDepartamento;
  formProvincia;
  formLocalidad;
  formOficialia;
  formLibro;
  formPartida;
  formFolio;
  formComplemento;
  formExpedido;
  formCodRude;
  formSexo;
  formDiscapacidad;
  formNumDiscapacidad;
  formTipoDiscapacidad;
  formGradoDiscapacidad;
  formDepartamentoEst;
  formProvinciaEst;
  formSeccionEst;
  formLocalidadEst;
  formZonaEst;
  formAvenidaEst;
  formNumViviendaEst;
  formIdiomaNiniez;
  formIdiomaFrecuente;
  formNacion;
  formCentroSalud;
  formProblemaSalud;
  formFrecuenciaCs;
  formSeguroCs;
  formAgua;
  formBanio;
  formAlcantarillado;
  formEnergiaElectrica;
  formServBasura;
  formVivienda;
  formInternet;
  formFrecuenciaInternet;
  formTrabajo;
  formMesesTrabajo;
  formActividadTrabajo;
  formTurnoTrabajo;
  formFrecuenciaTrabajo;
  formPagoTrabajo;
  formTipoPago;
  formMedioTransporte;
  formTiempoTransporte;
  formAbandonoUe;
  formRazonAbandono;
  formFechaRegistro;
  formLugarRegistro;
  formIdRepresentantePadre;
  formIdRepresentanteMadre;
  formIdRepresentanteTutor;
  formIdEstudiante;
  // Estudiante
  formApPaterno;
  formApMaterno;
  formNombres;
  formFechaNacimiento;
  formCedulaIdentidad;
  formTelefono;
  formCelular;
  formIdCurso;
  formIdPeriodo;
  //Representante padre
  formCedulaIdentidadP;
  formParentescoP;
  formIdiomaFrecuenteP;
  formApPaternoP;
  formApMaternoP;
  formNombresP;
  formOcupacionLaboralP;
  formComplementoP;
  formExpedidoP;
  formGradoInstruccionP;
  formFechaNacimientoP;
  formTelefonoP;
  formCelularP;
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

      this.form = this.formBuilder.group(
        {
          buscar: [''],
          id: [''],
        }
      )
    }

  ngOnInit(): void {
  }

 


  buscarId(codRude){
    this.rudeService.getBuscar(codRude).subscribe(response =>
      {
        this.rudesLista = (response as any);
        console.log(this.rudesLista);
        this.rudeId = this.rudesLista['id'],
        this.formCodSieue=this.rudesLista['codSieue'],
        this.formPais=this.rudesLista['pais'],
        this.formDepartamento=this.rudesLista['departamento'],
        this.formProvincia=this.rudesLista['provincia'],
        this.formLocalidad=this.rudesLista['localidad'],
        this.formOficialia=this.rudesLista['oficialia'],
        this.formLibro=this.rudesLista['libro'],
        this.formPartida=this.rudesLista['partida'],
        this.formFolio=this.rudesLista['folio'],
        this.formComplemento=this.rudesLista['complemento'],
        this.formExpedido=this.rudesLista['expedido'],
        this.formCodRude=this.rudesLista['codRude'],
        this.formSexo=this.verificacionInversa(this.rudesLista['sexo']),

        this.formDiscapacidad=this.rudesLista['discapacidad'],
        this.formNumDiscapacidad=this.rudesLista['numDiscapacidad'],
        this.formTipoDiscapacidad=this.rudesLista['tipoDiscapacidad'],
        this.formGradoDiscapacidad=this.rudesLista['gradoDiscapacidad'],
        this.formDepartamentoEst=this.rudesLista['departamentoEst'],
        this.formProvinciaEst=this.rudesLista['provinciaEst'],
        this.formSeccionEst=this.rudesLista['seccionEst'],
        this.formLocalidadEst=this.rudesLista['localidadEst'],
        this.formZonaEst=this.rudesLista['zonaEst'],
        this.formAvenidaEst=this.rudesLista['avenidaEst'],
        this.formNumViviendaEst=this.rudesLista['numViviendaEst'],
        this.formIdiomaNiniez=this.rudesLista['idiomaNiniez'],
        this.formIdiomaFrecuente=this.rudesLista['idiomaFrecuente'],
        this.formNacion=this.rudesLista['nacion'],
        this.formCentroSalud=this.rudesLista['centroSalud'],
        this.formProblemaSalud=this.rudesLista['problemaSalud'],
        this.formFrecuenciaCs=this.rudesLista['frecuenciaCs'],
        this.formSeguroCs=this.rudesLista['seguroCs'],
        this.formAgua=this.rudesLista['agua'],
        this.formBanio=this.rudesLista['banio'],
        this.formAlcantarillado=this.rudesLista['alcantarillado'],
        this.formEnergiaElectrica=this.rudesLista['energiaElectrica'],
        this.formServBasura=this.rudesLista['servBasura'],
        this.formVivienda=this.rudesLista['vivienda'],
        this.formInternet=this.rudesLista['internet'],
        this.formFrecuenciaInternet=this.rudesLista['frecuenciaInternet'],
        this.formTrabajo=this.rudesLista['trabajo'],
        this.formMesesTrabajo=this.rudesLista['mesesTrabajo'],
        this.formActividadTrabajo=this.rudesLista['actividadTrabajo'],
        this.formTurnoTrabajo=this.rudesLista['turnoTrabajo'],
        this.formFrecuenciaTrabajo=this.rudesLista['frecuenciaTrabajo'],
        this.formPagoTrabajo=this.rudesLista['pagoTrabajo'],
        this.formTipoPago=this.rudesLista['tipoPago'],
        this.formMedioTransporte=this.rudesLista['medioTransporte'],
        this.formTiempoTransporte=this.rudesLista['tiempoTransporte'],
        this.formAbandonoUe=this.rudesLista['abandonoUe'],
        this.formRazonAbandono=this.rudesLista['razonAbandono'],
        this.formFechaRegistro=this.rudesLista['fechaRegistro'],
        this.formLugarRegistro=this.rudesLista['lugarRegistro'],
        this.formIdRepresentantePadre=this.rudesLista['idRepresentanteMadre'],
        this.formIdRepresentanteMadre=this.rudesLista['idRepresentantePadre'],
        this.formIdRepresentanteTutor=this.rudesLista['idRepresentanteTutor'],
        this.formIdEstudiante=this.rudesLista['idEstudiante'],
        this.formId=this.rudesLista['id'],
        
          this.serviceEstudiante.getEstudianteBuscar(this.rudesLista['idEstudiante'], 1).subscribe(response=>{
            this.buscarLista=response.data;
            this.formApPaterno=this.buscarLista['apPaterno']
            this.formApMaterno=this.buscarLista['apMaterno']
            this.formNombres=this.buscarLista['nombres']
            this.formFechaNacimiento=this.buscarLista['fechaNacimiento']
            this.formCedulaIdentidad=this.buscarLista['cedulaIdentidad']
            this.formTelefono=this.buscarLista['telefono']
            this.formCelular=this.buscarLista['celular']
            this.formIdCurso=this.buscarLista['idCurso']
            this.formIdPeriodo=this.buscarLista['idPeriodo']
          });

          this.serviceRepresentante.getRepresentanteBuscar(this.rudesLista['idRepresentantePadre'], 1).subscribe(response=>{
            this.representanteLista=response.data;
            this.formCedulaIdentidadP=this.representanteLista['cedulaIdentidad']
            this.formParentescoP=this.representanteLista['parentesco']
            this.formIdiomaFrecuenteP=this.representanteLista['idiomaFrecuente']
            this.formApPaternoP=this.representanteLista['apPaterno']
            this.formApMaternoP=this.representanteLista['apMaterno']
            this.formNombresP=this.representanteLista['nombres']
            this.formOcupacionLaboralP=this.representanteLista['ocupacionLaboral']
            this.formComplementoP=this.representanteLista['complemento']
            this.formExpedidoP=this.representanteLista['expedido']
            this.formGradoInstruccionP=this.representanteLista['gradoInstruccion']
            this.formFechaNacimientoP=this.representanteLista['fechaNacimiento']
            this.formTelefonoP=this.representanteLista['telefono']
            this.formCelularP=this.representanteLista['celular']
          });

          this.serviceRepresentante.getRepresentanteBuscar(this.rudesLista['idRepresentanteMadre'], 1).subscribe(response=>{
            this.representanteLista=response.data;
            this.formCedulaIdentidadM=this.representanteLista['cedulaIdentidad']
            this.formParentescoM=this.representanteLista['parentesco']
            this.formIdiomaFrecuenteM=this.representanteLista['idiomaFrecuente']
            this.formApPaternoM=this.representanteLista['apPaterno']
            this.formApMaternoM=this.representanteLista['apMaterno']
            this.formNombresM=this.representanteLista['nombres']
            this.formOcupacionLaboralM=this.representanteLista['ocupacionLaboral']
            this.formComplementoM=this.representanteLista['complemento']
            this.formExpedidoM=this.representanteLista['expedido']
            this.formGradoInstruccionM=this.representanteLista['gradoInstruccion']
            this.formFechaNacimientoM=this.representanteLista['fechaNacimiento']
            this.formTelefonoM=this.representanteLista['telefono']
            this.formCelularM=this.representanteLista['celular']
          });

          this.serviceRepresentante.getRepresentanteBuscar(this.rudesLista['idRepresentanteTutor'], 1).subscribe(response=>{
            this.representanteLista=response.data;
            this.formCedulaIdentidadT=this.representanteLista['cedulaIdentidad']
            this.formParentescoT=this.representanteLista['parentesco']
            this.formIdiomaFrecuenteT=this.representanteLista['idiomaFrecuente']
            this.formApPaternoT=this.representanteLista['apPaterno']
            this.formApMaternoT=this.representanteLista['apMaterno']
            this.formNombresT=this.representanteLista['nombres']
            this.formOcupacionLaboralT=this.representanteLista['ocupacionLaboral']
            this.formComplementoT=this.representanteLista['complemento']
            this.formExpedidoT=this.representanteLista['expedido']
            this.formGradoInstruccionT=this.representanteLista['gradoInstruccion']
            this.formFechaNacimientoT=this.representanteLista['fechaNacimiento']
            this.formParentescoT=this.representanteLista['parentesco']
            this.formTelefonoT=this.representanteLista['telefono']
            this.formCelularT=this.representanteLista['celular']
          });
      });
  }

  Screen()
  {  
    var data = document.getElementById('content');  
    html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 208;   
        var pageHeight = 295;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  

        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save('RUDE.pdf'); // Generated PDF   
    });  
    var data2 = document.getElementById('content2');  
    html2canvas(data2).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 208;   
        var pageHeight = 295;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  

        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save('RUDE.pdf'); // Generated PDF   
    });  

  }

  get buscar(){ return this.form.get(this.formBuscar); }
  get id(){ return this.form.get(this.formId); }

  

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
