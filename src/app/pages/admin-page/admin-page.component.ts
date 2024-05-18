import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{
  
  firebaseAuthenticationReady: boolean = false;
  isLogged: boolean = false;
  isAdminRole: boolean = false; 

  userId: string = "";
  userName: string = "";

  horaActual = new Date().toLocaleTimeString();
  horario: string = "";

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authenticationService.isUserLoggedIn();
    this.isAdminRole = await this.authenticationService.getCurrentUserRole() === "admin";

    this.userId = this.authenticationService.getCurrentUserId();
    this.userName = await this.authenticationService.getUserNameById(this.userId);
    console.log(this.userName);
    this.actualizarPage();
    this.saludos();
  }

  saludos(){
    if(this.horaActual < "12:00:00" && this.horaActual >= "06:00:00"){
      this.horario = "Buenos días";
    }else if(this.horaActual < "20:00:00" && this.horaActual >= "12:00:00"){
      this.horario = "Buenas tardes";
    }else{
      this.horario = "Buenas noches";
    }
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
