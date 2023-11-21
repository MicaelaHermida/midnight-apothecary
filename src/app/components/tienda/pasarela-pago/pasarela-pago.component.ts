import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Compra } from 'src/app/interfaces/compra.interface';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ComprasService } from 'src/app/services/compras.service';
import { ProductosService } from 'src/app/services/productos.service';

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

  productos : ItemCarrito [] = [];


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

  formularioPago: FormGroup = this.fb.group({
    titular: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern("[a-zA-Z' ]*")]],
    numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('[0-9]*')]],
    fechaCaducidad: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9/]*')]],
    cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
    dniTitular: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')]]
  });

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router : Router, private carritoService: CarritoService,
    private compraService: ComprasService, private productoService: ProductosService) { }

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authService.isUserLoggedIn();
    this.usuarioLogueado = await this.authService.getAllCurrentUserData();
    this.userId = this.authService.getCurrentUserId();
    await this.obtenerProductos();
    this.initFormUsuario();
    if(!this.verificarCamposUsuario()){
      this.editMode = true;
    }
  
  }

  initFormUsuario(){
    this.formularioUsuario = this.fb.group({
      nombre: [this.usuarioLogueado.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern("[a-zA-Z' ]*")]],
      apellido: [this.usuarioLogueado.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern("[a-zA-Z' ]*")]],
      telefono: [this.usuarioLogueado.telefono, [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[0-9]*')]],
      provincia: [this.usuarioLogueado.provincia, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
      ciudad: [this.usuarioLogueado.ciudad, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
      direccion: [this.usuarioLogueado.direccion,[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      depto: [this.usuarioLogueado.depto],
      codigoPostal: [this.usuarioLogueado.codigoPostal,[Validators.required, Validators.minLength(4)]],
      dni: [this.usuarioLogueado.dni,[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')]]
    });
  }

  validatePago(field: string, error: string): boolean {
    const isInvalid = this.formularioPago.controls[field].hasError(error) &&
      (this.formularioPago.controls[field].touched || this.formularioPago.controls[field].dirty);

    return isInvalid;
  }

  validateUsuario(field: string, error: string): boolean {
    const isInvalid = this.formularioUsuario.controls[field].hasError(error) &&
      (this.formularioUsuario.controls[field].touched || this.formularioUsuario.controls[field].dirty);
    return isInvalid;
  }
  verificarCamposUsuario(){
    if(this.usuarioLogueado.ciudad === '' || this.usuarioLogueado.codigoPostal === '' || this.usuarioLogueado.direccion === '' 
    || this.usuarioLogueado.dni === '' || this.usuarioLogueado.nombre === '' || this.usuarioLogueado.apellido === '' 
    || this.usuarioLogueado.provincia === '' || this.usuarioLogueado.telefono === ''){
      return false;
    }
    else{
      return true;
    }
  }

  activarEditMode(){
    this.editMode = true;
  }

  async actualizarDatosUsuario() : Promise<void>{
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

  comprobarDatosTarjeta(): boolean{
    if(!this.formularioPago.valid){
      alert("Datos incorrectos o incompletos");
      return false;
    }
    else if(!this.formularioUsuario.valid){
      alert('Debe completar los datos de facturación');
      return false;
    }
    else{
      return true;
    }
  }

  async realizarCompra(): Promise<void>{
    const ok = confirm("¿Está seguro que desea realizar la compra?");
    if(this.comprobarDatosTarjeta() && ok){
      const compra : Compra = {
        userId: this.userId,
        fecha: '',
        items: this.productos,
        total: this.obtenerTotal(),
        estado: "pendiente"
      }
      const compraRealizada = await this.compraService.postCompra(compra);
      if(compraRealizada){
        await this.carritoService.deleteCarrito();
        alert("Compra realizada con éxito");
        this.router.navigate(['/home']);
      }
    }
  }; 

  async obtenerProductos() : Promise<void>{
    await this.carritoService.getCarritoFromUsuario();
    const carrito = this.carritoService.getCarrito();
    for (let item of carrito) {
      const id_producto = item.id_producto;
      const cantidad = item.cantidad;
      const precio = await this.productoService.getPrecioProducto(id_producto);
      const nombre = await this.productoService.getNombreProducto(id_producto);
      const subtotal = cantidad * precio;
      this.productos.push({ id_producto, nombre, precio, cantidad, subtotal });
    }
  }

  obtenerTotal(): number {
    let total = 0;
    for (let producto of this.productos) {
      total += producto.subtotal;
    }
    return total;
  }

  cancelarEdicion(){
    this.editMode = false;
    this.initFormUsuario();
    return;
  }
  
}
