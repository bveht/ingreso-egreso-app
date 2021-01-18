import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as IngresoEgreso from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../service/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit,OnDestroy {

  userSubs: Subscription;
  ingresosSubs: Subscription;

  constructor(private store:Store<AppState>,
              private ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(
      filter( auth => auth.user !== null)
    )
    .subscribe(({user}) => {
      
      this.ingresosSubs = this.ingresoEgresoService.initIngresoEgresosListener(user.uid)
          .subscribe( ingresosEgresosFB => {            
              this.store.dispatch(IngresoEgreso.setItems({items:ingresosEgresosFB}))
          });

    });
  }
  ngOnDestroy(){
    this.userSubs?.unsubscribe();
    this.ingresosSubs?.unsubscribe();
  }

}
