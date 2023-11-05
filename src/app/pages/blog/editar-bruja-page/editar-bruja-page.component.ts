import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-editar-bruja-page',
  templateUrl: './editar-bruja-page.component.html',
  styleUrls: ['./editar-bruja-page.component.css']
})
export class EditarBrujaPageComponent implements OnInit{

  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ){  }

  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
    await this.verificarUsuario();
    console.log(`this.isAdmin: ${this.isAdmin}`);
    if (!this.isAdmin){
      this.router.navigate(['/home']);
    }
  }

  async verificarUsuario(){
    const rol = await this.authenticationService.getCurrentUserRole();
    if(rol === "admin"){
      this.isAdmin = true;
      console.log(`rol: ${rol}, admin: ${this.isAdmin}`);
    }
  }



}
