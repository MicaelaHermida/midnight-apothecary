import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{

  horaActual = new Date().toLocaleTimeString();
  horario: string = "";
  userId: string = "";
  userName: string = "";
  firebaseAuthenticationReady: boolean = false;

  constructor(
    private authService: AuthenticationService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.userId = this.authService.getCurrentUserId();
    this.userName = await this.authService.getUserNameById(this.userId);
    console.log(this.userName);
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




}
