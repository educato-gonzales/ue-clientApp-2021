import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteMateriaService } from '../../services/estudiante-materia.service';
import { EstudianteMateria } from '../../models/estudianteMateria';
import { Observable } from 'rxjs';
import { MateriaService } from '../../services/materia.service';
import { EstudianteService } from '../../services/estudiante.service';
import { HorarioService } from '../../services/horario.service';
import { PeriodoService } from '../../services/periodo.service';


@Component({
  selector: 'app-estudiante-materia-addedit',
  templateUrl: './estudiante-materia-addedit.component.html',
  styleUrls: ['./estudiante-materia-addedit.component.css']
})
export class EstudianteMateriaAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formIdMateria;
  formIdEstudiante;
  formIdHorario;
  formIdPeriodo;
  estudianteMateriaId: number;
  errorMessage: any;
  estudianteMateria: [];
  public listaSelectEstudiante: any[];
  public listaSelectMateria: any[];
  public listaSelectHorario: any[];
  public listaSelectPeriodo: any[];

  constructor( private estudianteMateriaService: EstudianteMateriaService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router, 
    private serviceEstudiante: EstudianteService,
    private serviceMateria: MateriaService,
    private serviceHorario: HorarioService,
    private servicePeriodo: PeriodoService) { 


    const idParam = 'id';
    this.actionType = 'Add';
    this.formIdMateria = 'idMateria';
    this.formIdEstudiante = 'idEstudiante';
    this.formIdHorario = 'idHorario';
    this.formIdPeriodo = 'idPeriodo';

    if (this.avRoute.snapshot.params[idParam]){
      this.estudianteMateriaId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        estudianteMateriaId: 0,
        idMateria: ['', [Validators.required]],
        idEstudiante: ['', [Validators.required]],
        idHorario: ['', [Validators.required]],
        idPeriodo: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.estudianteMateriaId > 0){
      this.actionType = 'Edit';
      this.estudianteMateriaService.getEstudianteMateria(this.estudianteMateriaId)
      .subscribe(response => (
        this.estudianteMateria = response.data,
        this.form.controls[this.formIdMateria].setValue(this.estudianteMateria['idMateria']),
        this.form.controls[this.formIdEstudiante].setValue(this.estudianteMateria['idEstudiante']),
        this.form.controls[this.formIdHorario].setValue(this.estudianteMateria['idHorario']),
        this.form.controls[this.formIdPeriodo].setValue(this.estudianteMateria['idPeriodo'])
        ));
    }
    this.ListaSelectEstudiante();
    this.ListaSelectMateria();
    this.ListaSelectHorario();
    this.ListaSelectPeriodo();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const estudianteMateria: EstudianteMateria = {
        idMateria: Number(this.form.get(this.formIdMateria).value),
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        idHorario: Number(this.form.get(this.formIdHorario).value),
        idPeriodo: Number(this.form.get(this.formIdPeriodo).value),
        estadoSql: 1
      };
      
      this.estudianteMateriaService.saveEstudianteMateria(estudianteMateria)
      .subscribe((data) => {
        this.router.navigate(['/estudianteMateria']);
      });
    }
    if(this.actionType === 'Edit'){
      const estudianteMateria: EstudianteMateria = {
        id: this.estudianteMateria['id'],
        idMateria: this.form.get(this.formIdMateria).value,
        idEstudiante: this.form.get(this.formIdEstudiante).value,
        idHorario: this.form.get(this.formIdHorario).value,
        idPeriodo: this.form.get(this.formIdPeriodo).value,
        estadoSql: this.estudianteMateria['estadoSql']
      };
      this.estudianteMateriaService.updateEstudianteMateria(estudianteMateria.id, estudianteMateria)
        .subscribe((data) => {
          this.router.navigate(['/estudianteMateria']);
        });
    }
  }

  cancel(){
    this.router.navigate(['/estudianteMateria']);
  }
  get idMateria(){ return this.form.get(this.formIdMateria); }
  get idEstudiante(){ return this.form.get(this.formIdEstudiante); }
  get idHorario(){ return this.form.get(this.formIdHorario); }
  get idPeriodo(){ return this.form.get(this.formIdPeriodo); }

  ListaSelectMateria(){
      this.serviceMateria.getMaterias().subscribe(response=>{
        this.listaSelectMateria=response.data;
      });
    }
  ListaSelectEstudiante(){
      this.serviceEstudiante.getEstudiantes().subscribe(response=>{
        this.listaSelectEstudiante=response.data;
      });
    }
  ListaSelectHorario(){
      this.serviceHorario.getHorarios().subscribe(response=>{
        this.listaSelectHorario=response.data;
      });
    }
  ListaSelectPeriodo(){
      this.servicePeriodo.getPeriodos().subscribe(response=>{
        this.listaSelectPeriodo=response.data;
      });
    }
}
