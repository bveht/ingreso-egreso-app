import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private fb:FormBuilder,private auth:AuthService,private route:Router ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
  }
  loginUsuario(){

    

    Swal.fire({
      title: 'Espere por favor....',
      didOpen: () => {
        Swal.showLoading(); 
      },
    });

    const {email,password} = this.loginForm.value;

    this.auth.loginUsuario(email,password)
    .then(response => {
        console.log(response);
        Swal.close();  
        this.route.navigate(['/']);                
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
