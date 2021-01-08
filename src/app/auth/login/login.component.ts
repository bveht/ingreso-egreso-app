import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean = false;
  uiSuscription: Subscription;

  constructor(private fb:FormBuilder,
              private auth:AuthService,
              private store:Store<AppState>,
              private route:Router ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });

    this.uiSuscription = this.store.select('ui').subscribe(ui => {this.isLoading = ui.isLoading
    console.log('cargando sub');
    });

  }
  ngOnDestroy(){
    this.uiSuscription.unsubscribe();
  }
  loginUsuario(){

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Espere por favor....',
    //   didOpen: () => {
    //     Swal.showLoading(); 
    //   },
    // });

    const {email,password} = this.loginForm.value;

    this.auth.loginUsuario(email,password)
    .then(response => {
        console.log(response);
        // Swal.close();  
        this.store.dispatch(ui.stopLoading());
        this.route.navigate(['/']);                
    })
    .catch(error=> {
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        icon:'error',
        title:'Oppss....',
        text:error.message                    
      });
    });    
  }


}
