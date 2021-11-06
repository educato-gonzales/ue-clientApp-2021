import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionService } from '../../services/notificacion.service';
import { Notificacion } from '../../models/notificacion';
import { Observable } from 'rxjs';
import { CursoService } from '../../services/curso.service';
import { ProfesorService } from '../../services/profesor.service';


@Component({
  selector: 'app-notificacion-addedit',
  templateUrl: './notificacion-addedit.component.html',
  styleUrls: ['./notificacion-addedit.component.css']
})
export class NotificacionAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formNombre: string;
  formDescripcion: string;
  formfecha: string;
  formIdCurso;
  formIdProfesor;
  notificacionId: number;
  errorMessage: any;
  notificacion: [];
  public listaSelectCurso: any[];
  public listaSelectProfesor: any[];

  constructor( private notificacionService: NotificacionService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private serviceCurso: CursoService,
    private serviceProfesor: ProfesorService) {

    const idParam = 'id';
    this.actionType = 'Add';
    this.formNombre = 'nombre';
    this.formDescripcion = 'descripcion';
    this.formfecha = 'fecha';
    this.formIdCurso = 'idCurso';
    this.formIdProfesor = 'idProfesor';

    if (this.avRoute.snapshot.params[idParam]){
      this.notificacionId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        notificacionId: 0,
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        fecha: ['', [Validators.required]],
        idCurso: ['', [Validators.required]],
        idProfesor: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.notificacionId > 0){
      this.actionType = 'Edit';
      this.notificacionService.getNotificacion(this.notificacionId)
      .subscribe(response => (
        this.notificacion = response.data,
        this.form.controls[this.formNombre].setValue(this.notificacion['nombre']),
        this.form.controls[this.formDescripcion].setValue(this.notificacion['descripcion']),
        this.form.controls[this.formfecha].setValue(this.notificacion['fecha']),
        this.form.controls[this.formIdCurso].setValue(this.notificacion['idCurso']),
        this.form.controls[this.formIdProfesor].setValue(this.notificacion['idProfesor'])
        ));
    }
    this.ListaSelectCurso();
    this.ListaSelectProfesor();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const notificacion: Notificacion = {
        nombre: this.form.get(this.formNombre).value,
        descripcion: this.form.get(this.formDescripcion).value,
        fecha: this.form.get(this.formfecha).value,
        idCurso: Number(this.form.get(this.formIdCurso).value),
        idProfesor: Number(this.form.get(this.formIdProfesor).value),
        estadoSql: 1
      };
      
      this.notificacionService.saveNotificacion(notificacion)
      .subscribe((data) => {
        this.router.navigate(['/notificacion']);
      });
    }
    if(this.actionType === 'Edit'){
      const notificacion: Notificacion = {
        id: this.notificacion['id'],
        nombre: this.form.get(this.formNombre).value,
        descripcion: this.form.get(this.formDescripcion).value,
        fecha: this.form.get(this.formfecha).value,
        idCurso: this.form.get(this.formIdCurso).value,
        idProfesor: this.form.get(this.formIdProfesor).value,
        estadoSql: this.notificacion['estadoSql']
      };
      this.notificacionService.updateNotificacion(notificacion.id, notificacion)
        .subscribe((data) => {
          this.router.navigate(['/notificacion']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/notificacion']);
  }
  get nombre(){ return this.form.get(this.formNombre); }
  get descripcion(){ return this.form.get(this.formDescripcion); }
  get fecha(){ return this.form.get(this.formfecha); }
  get idCurso(){ return this.form.get(this.formIdCurso); }
  get idProfesor(){ return this.form.get(this.formIdProfesor); }

   ListaSelectCurso(){
      this.serviceCurso.getCursos().subscribe(response=>{
        this.listaSelectCurso=response.data;
      });
    }
     ListaSelectProfesor(){
      this.serviceProfesor.getProfesores().subscribe(response=>{
        this.listaSelectProfesor=response.data;
      });
    }

}
