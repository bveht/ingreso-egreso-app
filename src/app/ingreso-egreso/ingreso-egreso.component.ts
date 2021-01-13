import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../service/ingreso-egreso.service';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit,OnDestroy {

  ingresoFrom: FormGroup;
  tipo: string = "egreso";
  isLoading: boolean = false;
  suscripcion: Subscription;

  constructor(private fb: FormBuilder,
              private ingresoEgresoService:IngresoEgresoService,
              private store:Store<AppState>) { }

  ngOnInit(): void {
      this.ingresoFrom = this.fb.group({
        descripcion:['',Validators.required],
        monto:['',Validators.required]
      });

      this.suscripcion = this.store.select('ui')
                        .subscribe(state => this.isLoading = state.isLoading);


  }
  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }

  guardar(){

    
    if (this.ingresoFrom.invalid) {return};

    this.store.dispatch(ui.isLoading());

    const {descripcion,monto} = this.ingresoFrom.value;

    const ingresoEgreso = new IngresoEgreso(descripcion,monto,this.tipo);

    this.ingresoEgresoService
        .crearIngresoEgreso(ingresoEgreso)
        .then(()=>{
          this.store.dispatch(ui.stopLoading());
          this.ingresoFrom.reset();
          Swal.fire('Registro Creado',descripcion,'success');
        })
        .catch((error) => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire('Error',error.message,'error');
        });
  }

}
