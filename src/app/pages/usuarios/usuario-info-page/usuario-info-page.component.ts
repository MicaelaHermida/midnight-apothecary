import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-usuario-info-page',
  templateUrl: './usuario-info-page.component.html',
  styleUrls: ['./usuario-info-page.component.css']
})
export class UsuarioInfoPageComponent implements OnInit{

  isLogged: boolean = false;
  isAdminRole: boolean = false;
  firebaseAuthenticationReady: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router   
  ){}

  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authenticationService.isUserLoggedIn();
    this.isAdminRole = await this.authenticationService.getCurrentUserRole() === "admin"; 
    this.actualizarPage();
  }

  actualizarPage(){
    this.router.events.subscribe(async (val) =>{
      if(val instanceof NavigationEnd){
        this.isLogged = this.authenticationService.isUserLoggedIn();
        this.isAdminRole = await this.authenticationService.getCurrentUserRole() === "admin";
      }
    })
  }

}
