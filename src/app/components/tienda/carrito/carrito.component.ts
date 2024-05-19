import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
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
  showCart: boolean = false;

  productos: ItemCarrito[] = [];

  totalCarrito = 0;

  isLogged: boolean = false;
  firebaseAuthenticationReady: boolean = false;

  hasProductos: boolean = false;

  isCompraPage: boolean = false;


  constructor(private carritoService: CarritoService, private productosService: ProductosService,
    private authService: AuthenticationService, private router: Router, private appRef: ApplicationRef) { }

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    await this.carritoService.getCarritoFromUsuario();
    await this.cargarProductos();
    await this.mostrarCarrito();
    this.verificarUrl();
  }

/*   toggleCart(){
    this.showCart = !this.showCart;
    if(this.showCart){
      document.querySelector('.drop-carrito')?.classList.add('show');
    }else{
      document.querySelector('.drop-carrito')?.classList.remove('show');
    }
  } */

  async cargarProductos(): Promise<void> {
    for (let item of this.carritoService.getCarrito()) {
      const id_producto = item.id_producto;
      const cantidad = item.cantidad;
      const imagen = await this.productosService.getImagenProducto(id_producto);
      const precio = await this.productosService.getPrecioProducto(id_producto);
      const nombre = await this.productosService.getNombreProducto(id_producto);
      const subtotal = cantidad * precio;
      this.productos.push({ id_producto, imagen, nombre, precio, cantidad, subtotal });
    }
  }

  async mostrarCarrito(): Promise<void> {
    this.hasProductos = this.carritoService.carritoHasItems();
    this.isLogged = this.authService.isUserLoggedIn();
    await this.actualizarProductos();
    this.obtenerTotal();
  }

  async actualizarProductos(): Promise<void> {
    const carrito = this.carritoService.getCarrito();

    for (let producto of this.productos) {
      let encontrado = false;
      for (let item of carrito) {
        if (producto.id_producto === item.id_producto) {
          encontrado = true;
          if (producto.cantidad !== item.cantidad) {
            producto.cantidad = item.cantidad;
            producto.subtotal = producto.cantidad * producto.precio;
          }
          break;
        }
      }
      if (!encontrado) {
        let index = this.productos.findIndex((productoABuscar) => productoABuscar.id_producto === producto.id_producto);
        this.productos.splice(index, 1);
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
    const index = this.productos.findIndex((item) => item.id_producto === id);
    if (this.productos[index].cantidad === 0) {
      this.productos.splice(index, 1);
    }
    await this.mostrarCarrito();
  }
  async agregarProducto(id: string) {
    const producto = await this.productosService.getProducto(id);
    const index = this.productos.findIndex((item) => item.id_producto === id);
    if (producto.stock < this.productos[index].cantidad + 1) {
      alert("No hay suficiente stock");
      return;
    }
    await this.carritoService.actualizarCarrito({ id_producto: id, cantidad: 1 });
    await this.mostrarCarrito();
  };

  verificarUrl() {
    const currentURL = window.location.href;
    if (currentURL.includes("compra")) {
      this.isCompraPage = true;
    }
  }

}
