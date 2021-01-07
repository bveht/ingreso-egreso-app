import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private fb:FormBuilder,private atuhSv:AuthService,private router:Router) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre:   ['',Validators.required],
      correo:   ['',[Validators.required,Validators.email]],
      password: ['',Validators.required] 
    });

  }
  crearUsuario(){

    Swal.fire({
      title: 'Espere por favor....',
      didOpen: () => {
        Swal.showLoading(); 
      },
    });

    const {nombre,correo,password} = this.registroForm.value;
    this.atuhSv.crearUsuario(nombre,correo,password)
      .then(credenciales => {
        Swal.close();
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
