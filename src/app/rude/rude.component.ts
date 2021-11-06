import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { RudeService } from '../services/rude.service';
import { Rude } from '../models/rude';

@Component({
  selector: 'app-rude',
  templateUrl: './rude.component.html',
  styleUrls: ['./rude.component.css']
})
export class RudeComponent implements OnInit {
  rude: Observable<Rude>;
  rudeId: number;

  constructor(private rudeServicio: RudeService, private avRoute: ActivatedRoute ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]){
      this.rudeId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit(): void {
    this.objetoRude();
  }

  objetoRude(){
    //this.producto = this.productoServicio.getProducto(this.productoId);
  }

}