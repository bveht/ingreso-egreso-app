import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private authSv:AuthService,private route:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.authSv.logout().then(()=>{
      this.route.navigate(['/login']);
    });
  }

}
