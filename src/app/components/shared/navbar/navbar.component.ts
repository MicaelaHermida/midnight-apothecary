import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLogged: boolean = false;
  isAdminRole: boolean = false;
  firebaseAuthenticationReady : boolean = false;
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = await this.authenticationService.isUserLoggedIn();
    this.isAdminRole = await this.authenticationService.getCurrentUserRole() === "admin";
  }

  async cerrarSesion(){
    await this.authenticationService.logout();
    this.router.navigate(['/home']);
  }
}
