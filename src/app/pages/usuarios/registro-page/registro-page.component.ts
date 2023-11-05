import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registro-page',
  templateUrl: './registro-page.component.html',
  styleUrls: ['./registro-page.component.css']
})
export class RegistroPageComponent implements OnInit{
  
    isLogged: boolean = false;
    firebaseAuthStateReady: boolean = false;
  
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    async ngOnInit(): Promise<void> {
      await this.authenticationService.waitForFirebaseAuthentication();
      this.firebaseAuthStateReady = true;
      this.isLogged = await this.authenticationService.isUserLoggedIn();
      if (this.isLogged) {
        this.router.navigate(['/home']);
      }
      
    }

}
