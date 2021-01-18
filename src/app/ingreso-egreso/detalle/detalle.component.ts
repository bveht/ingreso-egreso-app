import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { error } from 'protractor';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/service/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit,OnDestroy {

  ingresoEgreso: IngresoEgreso[] = [];
  subsIngresoEgreso: Subscription;

  constructor(private store:Store<AppStateWithIngreso>,
              private ingresoEgresoService:IngresoEgresoService ) { }

  ngOnInit(): void {
    this.subsIngresoEgreso = this.store.select('ingresosEgresos')
              .subscribe(({items}) => this.ingresoEgreso = items);
  }

  ngOnDestroy(){
    this.subsIngresoEgreso.unsubscribe();
  }

  borrar(uid:string){
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
        .then(()=> Swal.fire('Borrado','Item Borrado','success'))
        .catch(error => Swal.fire('Error',error.messge,'error'));
  }

}
