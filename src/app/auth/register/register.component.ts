import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import * as ui from 'src/app/shared/ui.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit,OnDestroy {

  registroForm: FormGroup;
  isLoading: boolean = false;
  uiSuscription: Subscription;

  constructor(private fb:FormBuilder,
              private atuhSv:AuthService,
              private router:Router,
              private store:Store<AppState>) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre:   ['',Validators.required],
      correo:   ['',[Validators.required,Validators.email]],
      password: ['',Validators.required] 
    });

    this.uiSuscription = this.store.select('ui').subscribe(ui => { this.isLoading = ui.isLoading
      console.log('cargando sub');
      });
  

  }
  ngOnDestroy(){
    this.uiSuscription.unsubscribe();
  }
  crearUsuario(){

    // Swal.fire({
    //   title: 'Espere por favor....',
    //   didOpen: () => {
    //     Swal.showLoading(); 
    //   },
    // });

    this.store.dispatch(ui.isLoading());

    const {nombre,correo,password} = this.registroForm.value;
    this.atuhSv.crearUsuario(nombre,correo,password)
      .then(credenciales => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
        console.log(credenciales);
      })
      .catch(error=> {
        Swal.fire({
          icon:'error',
          title:'Oppss....',
          text:error.message                    
        });
      });
  }

}
