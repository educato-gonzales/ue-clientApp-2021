import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import {RolService} from '../services/rol.service';
import {Rol} from '../models/rol';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  
  rol: Observable<Rol>;
  rolId: number;

  constructor(private rolServicio: RolService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.rolId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoRol();
  }

  objetoRol(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}
