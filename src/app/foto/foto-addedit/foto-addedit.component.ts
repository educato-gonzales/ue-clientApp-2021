import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FotoService } from '../../services/foto.service';
import { Fotos } from '../../models/fotos';
import { Observable } from 'rxjs';
import { EstudianteService } from '../../services/estudiante.service';


@Component({
  selector: 'app-foto-addedit',
  templateUrl: './foto-addedit.component.html',
  styleUrls: ['./foto-addedit.component.css']
})
export class FotoAddeditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formDescripcion: string;
  formPathImg: string;
  formIdEstudiante: string;
  fotoId: number;
  errorMessage: any;
  foto: [];
  public listaSelectEstudiante: any[];
  

  constructor( private fotoService: FotoService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router,
    private serviceEstudiante: EstudianteService,) {

    const idParam = 'id';
    this.actionType = 'Add';
    this.formDescripcion = 'descripcion';
    this.formPathImg = 'pathImg';
    this.formIdEstudiante = 'idEstudiante';

    if (this.avRoute.snapshot.params[idParam]){
      this.fotoId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {//esto es para registrar lo de la vista que se necesita
        fotoId: 0,
        descripcion: ['', [Validators.required]],
        pathImg: ['', [Validators.required]],
        idEstudiante: ['', [Validators.required]],
      }
    )

  }

  ngOnInit(): void {
    if (this.fotoId > 0){
      this.actionType = 'Edit';
      this.fotoService.getFoto(this.fotoId)
      .subscribe(response => (
        this.foto = response.data,
        this.form.controls[this.formDescripcion].setValue(this.foto['descripcion']),
        this.form.controls[this.formPathImg].setValue(this.foto['pathImg']),
        this.form.controls[this.formIdEstudiante].setValue(this.foto['idEstudiante'])
        ));
    }
    this.ListaSelectEstudiante();
  }

  save(){
    if (!this.form.valid){
      return;
    }
    if (this.actionType === 'Add'){
      const foto: Fotos = {
        descripcion: this.form.get(this.formDescripcion).value,
        pathImg: this.form.get(this.formPathImg).value,
        idEstudiante: Number(this.form.get(this.formIdEstudiante).value),
        estadoSql: 1
      };
      
      this.fotoService.saveFoto(foto)
      .subscribe((data) => {
        this.router.navigate(['/fotos']);
      });
    }
    if(this.actionType === 'Edit'){
      const foto: Fotos = {
        id: this.foto['id'],
        descripcion: this.form.get(this.formDescripcion).value,
        pathImg: this.form.get(this.formPathImg).value,
        idEstudiante: this.form.get(this.formIdEstudiante).value,
        estadoSql: this.foto['estadoSql']
      };
      this.fotoService.updateFoto(foto.id, foto)
        .subscribe((data) => {
          this.router.navigate(['/fotos']);
        });
    }
    this.ListaSelectEstudiante();
  }

  cancel(){
    this.router.navigate(['/fotos']);
  }
  get descripcion(){ return this.form.get(this.formDescripcion); }
  get pathImg(){ return this.form.get(this.formPathImg); }
  get idEstudiante(){ return this.form.get(this.formIdEstudiante); }

  ListaSelectEstudiante(){
    this.serviceEstudiante.getEstudiantes().subscribe(response=>{
      this.listaSelectEstudiante=response.data;
    });
  }

}
