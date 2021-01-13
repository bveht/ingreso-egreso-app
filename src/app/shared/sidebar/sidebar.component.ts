import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit,OnDestroy {
  nombre: string;
  susUser:Subscription;
  constructor(private authSv:AuthService,
              private store:Store<AppState>,
              private route:Router) { }

  ngOnInit(): void {
     this.susUser = this.store.select('user')
    .pipe(
      filter(({user}) => user !== null)
    )
    .subscribe(({user}) => this.nombre = user.nombre); 
  }
  ngOnDestroy(){
    this.susUser.unsubscribe();
  }
  logout(){
    this.authSv.logout().then(()=>{
      this.route.navigate(['/login']);
    });
  }

}
