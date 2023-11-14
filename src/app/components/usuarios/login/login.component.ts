import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isCorrect: boolean = true;
  isLogged: boolean = false;
  firebaseAuthStateReady: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private AuthencationService: AuthenticationService, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  async login(email: string, password: string): Promise<boolean> {
    this.form.get('email')?.valueChanges.subscribe((value: any) => {
      this.isCorrect = true;
    });
    this.form.get('password')?.valueChanges.subscribe((value: any) => {
      this.isCorrect = true;
    });
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
      this.form.reset();
      return;
    }
  }

  private async manejarInicioSesionPorRol(verif: string) {
    if (verif === "admin") {
      console.log("Es admin");
      const user = await this.AuthencationService.getAllCurrentUserData();
      console.log(user);

    }
    this.router.navigate(['/home']);
  }

  validate(field: string, error: string): boolean {
    const isInvalid = this.form.controls[field].hasError(error) &&
      (this.form.controls[field].touched || this.form.controls[field].dirty);

      
    return isInvalid;
  }

}
