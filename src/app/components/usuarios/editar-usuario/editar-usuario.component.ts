import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{

  editMode: boolean = false;
  userId!: string;
  isLogged: boolean = false;
  isAdminRole: boolean = false;
  firebaseAuthenticationReady: boolean = false;

  usuarioLogueado!: User;

  formularioUsuario : FormGroup = this.fb.group({
    nombre: '',
    apellido: '',
    telefono: '',
    provincia: '',
    ciudad: '',
    direccion: '',
    depto: '',
    codigoPostal: '',
    dni: ''
  });

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {}

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authService.isUserLoggedIn();
    this.usuarioLogueado = await this.authService.getAllCurrentUserData();
    this.isAdminRole = await this.authService.getCurrentUserRole() === 'admin';
    this.userId = this.authService.getCurrentUserId();
    this.initForm();
  }

  initForm(){
    this.formularioUsuario = this.fb.group({
      nombre: [this.usuarioLogueado.nombre, [Validators.required, Validators.minLength(3)]],
      apellido: [this.usuarioLogueado.apellido, [Validators.required, Validators.minLength(3)]],
      telefono: [this.usuarioLogueado.telefono, [Validators.required, Validators.minLength(9)]],
      provincia: [this.usuarioLogueado.provincia, [Validators.required, Validators.minLength(3)]],
      ciudad: [this.usuarioLogueado.ciudad, [Validators.required, Validators.minLength(3)]],
      direccion: [this.usuarioLogueado.direccion,[Validators.required, Validators.minLength(5)]],
      depto: [this.usuarioLogueado.depto],
      codigoPostal: [this.usuarioLogueado.codigoPostal,[Validators.required, Validators.minLength(4)]],
      dni: [this.usuarioLogueado.dni,[Validators.required, Validators.minLength(9)]]
    });
  }

  async actualizarDatosUsuario():Promise<void>{
    if(this.formularioUsuario.valid){
      this.usuarioLogueado.nombre = this.formularioUsuario.value.nombre;
      this.usuarioLogueado.apellido = this.formularioUsuario.value.apellido;
      this.usuarioLogueado.telefono = this.formularioUsuario.value.telefono;
      this.usuarioLogueado.provincia = this.formularioUsuario.value.provincia;
      this.usuarioLogueado.ciudad = this.formularioUsuario.value.ciudad;
      this.usuarioLogueado.direccion = this.formularioUsuario.value.direccion;
      this.usuarioLogueado.depto = this.formularioUsuario.value.depto;
      this.usuarioLogueado.codigoPostal = this.formularioUsuario.value.codigoPostal;
      this.usuarioLogueado.dni = this.formularioUsuario.value.dni;
      await this.authService.updateUserData(this.userId, this.usuarioLogueado);
      this.editMode = false;
    }
    else{
      alert("Datos incorrectos o incompletos");
    }
  }; 

  activarEditMode(){
    this.editMode = true;
  }

  cancelarCambios(){
    this.editMode = false;
    return;
  }
}
