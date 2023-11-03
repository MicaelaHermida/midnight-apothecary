import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {


  form: FormGroup;

  constructor(private fb: FormBuilder, private AuthencationService: AuthenticationService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(email: string, password: string) {
    this.AuthencationService.login(email, password);
  }

  iniciarSesion() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.login(email, password);
  }

 
}
