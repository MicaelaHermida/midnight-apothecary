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
export class CarritoComponent implements OnInit {

  productos: ItemCarrito[] = [];

  totalCarrito = 0;

  isLogged: boolean = false;
  firebaseAuthenticationReady: boolean = false;

  hasProductos: boolean = false;

  isCompraPage: boolean = false;


  constructor(private carritoService: CarritoService, private productosService: ProductosService, private authService: AuthenticationService) { }

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    await this.carritoService.getCarritoFromUsuario();
    await this.cargarProductos();
    this.hasProductos = this.carritoService.carritoHasItems();
    this.isLogged = this.authService.isUserLoggedIn();
    await this.mostrarCarrito();
  }

  async cargarProductos():Promise<void>{
    for (let item of this.carritoService.getCarrito()) {
      const id_producto = item.id_producto;
      const cantidad = item.cantidad;
      const precio = await this.productosService.getPrecioProducto(id_producto);
      const nombre = await this.productosService.getNombreProducto(id_producto);
      const subtotal = cantidad * precio;
      this.productos.push({ id_producto, nombre, precio, cantidad, subtotal });
    }
  }

  async mostrarCarrito():Promise<void>{
    await this.actualizarProductos();
    this.obtenerTotal();
  }

  async actualizarProductos():Promise<void>{

    const carrito = this.carritoService.getCarrito();
    for (let item of carrito) {
      const id_producto = item.id_producto;
      for (let producto of this.productos) {
        if (id_producto === producto.id_producto) {
          if (item.cantidad !== producto.cantidad) {
            producto.cantidad = item.cantidad;
            producto.subtotal = producto.cantidad * producto.precio;
          }
          break;
        }
      }
    }
  }

  obtenerTotal() {
    this.totalCarrito = 0;
    for (let producto of this.productos) {
      this.totalCarrito += producto.subtotal;
    }
  }

  async eliminarProducto(id: string) {
    await this.carritoService.deleteProductoCarrito(id, 1);
    this.mostrarCarrito();
  }
  async agregarProducto(id: string) {
    const producto = await this.productosService.getProducto(id);
    const index = this.productos.findIndex((item) => item.id_producto === id);
    if(producto.stock < this.productos[index].cantidad + 1){
      alert("No hay suficiente stock");
      return;
    }
    await this.carritoService.actualizarCarrito({ id_producto: id, cantidad: 1 });
    this.mostrarCarrito();
  };

  verificarUrl(){
    if(window.location.href.includes("compra")){
      this.isCompraPage = true;
    }
    else{
      this.isCompraPage = false;
    }
  }
}
