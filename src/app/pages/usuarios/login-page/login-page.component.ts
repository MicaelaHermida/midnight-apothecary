import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  isLogged: boolean = false;
  firebaseAuthStateReady: boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }
  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
    this.firebaseAuthStateReady = true;
    this.isLogged = await this.authenticationService.isUserLoggedIn();
    if (this.isLogged) {
      this.router.navigate(['/home']);
    }
  }
  
}
/*await this.AuthencationService.waitForFirebaseAuthentication();
    this.firebaseAuthStateReady = true;
    this.isLogged = await this.AuthencationService.isUserLoggedIn();
    if (this.isLogged) {
      this.router.navigate(['/home']);
    }*/