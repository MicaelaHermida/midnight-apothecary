import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false;
  firebaseAuthStateReady: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private AuthencationService: AuthenticationService, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async ngOnInit(): Promise<void> {
    await this.AuthencationService.waitForFirebaseAuthentication();
    this.firebaseAuthStateReady = true;
    this.isLogged = await this.AuthencationService.isUserLoggedIn();
    if (this.isLogged) {
      this.router.navigate(['/home']);
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    return await this.AuthencationService.login(email, password);
  }

  async iniciarSesion() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    const successfulLogin = await this.login(email, password);
    if (successfulLogin) {
      const verif = await this.AuthencationService.getCurrentUserRole();
      await this.manejarInicioSesionPorRol(verif);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }

  private async manejarInicioSesionPorRol(verif: string) {
    if (verif === "admin") {
      console.log("Es admin");
      const user = await this.AuthencationService.getAllCurrentUserData();
      console.log(user);
      this.router.navigate(['/home']);
    }
    else {
      console.log("No es admin");
      this.router.navigate(['/home']);
    }
  }
}
