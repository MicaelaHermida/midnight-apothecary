import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  
  form: FormGroup;

  constructor(private fb: FormBuilder, private AuthencationService: AuthenticationService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required]
    })
  }
  register(email: string, password: string, nombre: string, apellido: string) {
    this.AuthencationService.register(email, password, nombre, apellido);
  }
  registrarse(){
    const email = this.form.value.email;
    const password = this.form.value.password;
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    this.register(email, password, nombre, apellido);
  }
}
