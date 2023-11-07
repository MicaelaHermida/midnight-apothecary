import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-pasarela-pago',
  templateUrl: './pasarela-pago.component.html',
  styleUrls: ['./pasarela-pago.component.css']
})
export class PasarelaPagoComponent implements OnInit{
  

  isLogged: boolean = false;
  firebaseAuthenticationReady: boolean = false;
  usuarioLogueado!: User;

  editMode: boolean = false;
  userId!: string;

  formularioUsuario : FormGroup = this.fb.group({
    nombre: '',
    apellido: '',
    telefono: '',
    provincia: '',
    ciudad: '',
    direccion: '',
    codigoPostal: '',
    dni: ''
  });

  formularioPago: FormGroup = this.fb.group({
    titular: '',
    numeroTarjeta: '',
    fechaCaducidad: '',
    dniTitular: ''
  });

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router : Router, private carritoService: CarritoService) { }

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authService.isUserLoggedIn();
    this.usuarioLogueado = await this.authService.getAllCurrentUserData();
    this.userId = this.authService.getCurrentUserId();
    
    this.initFormUsuario();
    if(!this.verificarCamposUsuario()){
      this.editMode = true;
    }
  
  }

  initFormUsuario(){
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

  verificarCamposUsuario(){
    if(this.usuarioLogueado.ciudad === ''){
      return false;
    }
    else{
      return true;
    }
  }


  activarEditMode(){
    this.editMode = true;
  }

  actualizarDatosUsuario(){
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
      this.authService.updateUserData(this.userId, this.usuarioLogueado);
      this.editMode = false;

    }
    else{
      alert("Datos incorrectos o incompletos");
    }
  }; //TODO

  comprobarDatosTarjeta(): boolean{
    if(!this.formularioPago.valid){
      alert("Datos incorrectos o incompletos");
      return false;
    }
    else{
      return true;
    }
  }

  async realizarCompra(): Promise<void>{
    const ok = confirm("¿Está seguro que desea realizar la compra?");
    if(this.comprobarDatosTarjeta() && ok){
      alert("Compra realizada con éxito!");
      await this.carritoService.deleteCarrito();
      this.router.navigate(['/home']);
    }
  }; //TODO
}
