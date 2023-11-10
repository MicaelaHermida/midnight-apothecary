import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-info-bruja-page',
  templateUrl: './info-bruja-page.component.html',
  styleUrls: ['./info-bruja-page.component.css']
})
export class InfoBrujaPageComponent implements OnInit{
  
  isAdmin: Boolean = false;
  isLogged: Boolean = false;
  firebaseAuthenticationReady: Boolean = false;

  constructor(
    private authenticationService: AuthenticationService
  ){}

  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authenticationService.isUserLoggedIn();
    this.isAdmin = await this.authenticationService.getCurrentUserRole() === "admin";
  }

}
