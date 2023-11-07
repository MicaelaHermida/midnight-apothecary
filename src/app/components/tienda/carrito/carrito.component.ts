import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/interfaces/carrito.interface';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{

  carrito: Carrito[] = [];

  productos : ItemCarrito [] = [];

  totalCarrito = 0;

  isLogged: boolean = false;
  firebaseAuthenticationReady: boolean = false;

  constructor(private carritoService: CarritoService, private productosService: ProductosService, private authService: AuthenticationService) { }

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authService.isUserLoggedIn();
    await this.mostrarCarrito();
  }

  async mostrarCarrito(){
    
    await this.carritoService.getCarritoFromUsuario();
    this.carrito = this.carritoService.getCarrito();
    await this.obtenerSubtotal();
    this.obtenerTotal();
  }

  async obtenerSubtotal(){
    
    for(let item of this.carrito){
      const id = item.id_producto;
      const cantidad = item.cantidad;
      const precio = await this.productosService.getPrecioProducto(id);
      const nombre = await this.productosService.getNombreProducto(id);
      const subtotal = cantidad * precio;
      this.productos.push({nombre, precio, cantidad, subtotal});
    }
  }

  obtenerTotal(){
    for(let producto of this.productos){
      this.totalCarrito += producto.subtotal;
    }
  }
}
