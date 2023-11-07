import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import { Carrito } from 'src/app/interfaces/carrito.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  isAdminRole: boolean = false;
  isLogged: boolean = false;
  firebaseAuthenticationReady: boolean = false;
  carritoProductos: Carrito[] = [];

  arrayPaginas: number[] = [];

  paginaActual: number = 1;
  productosPorPagina: number = 10;
  totalProductos: number = 0;

  lastEditKey: string = "";

  itemCarrito: Carrito = {
    id_producto: "",
    cantidad: 0
  }

  form: FormGroup;

  editModeMap: Map<string, boolean> = new Map();
  

  productos: Map<string, Producto> = new Map();
  

  constructor(private productosService: ProductosService, private authenticationService: AuthenticationService, private fb: FormBuilder, private router: Router,
    private carrito: CarritoService) {
    this.form = this.fb.group({
      nombre: "",
      precio: 0,
      stock: 0
    });
  }

  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authenticationService.isUserLoggedIn();
    this.isAdminRole = await this.authenticationService.getCurrentUserRole() === "admin";
    this.actualizarPaginas();
    await this.mostrarProductos();
    this.carritoProductos = this.carrito.getCarrito();
  }

  initForm(producto: Producto) {
    this.form = this.fb.group({
      nombre: [producto.nombre, [Validators.required, Validators.minLength(3)]],
      precio: [producto.precio, [Validators.required, Validators.min(0)]],
      stock: [producto.stock, [Validators.required, Validators.min(0)]]
    });
  }

  async mostrarProductos() {
    const start = (this.paginaActual- 1) * this.productosPorPagina;
    const end = this.paginaActual * this.productosPorPagina;
    const allProducts = await this.productosService.getProductos();
    this.totalProductos = allProducts.size;
    this.productos = new Map(Array.from(allProducts.entries()).slice(start, end));
    console.log(this.productos);
  }

  actualizarPaginas() {
    const cantidadPaginas = this.obtenerCantidadPaginas();
    this.arrayPaginas = Array.from({ length: cantidadPaginas }, (_, index) => index + 1);
  }

  cambiarPagina(pagina: number) {
    if (pagina < 1) {
      pagina = 1;
    }
    const cantidadPaginas = this.obtenerCantidadPaginas();
    if (pagina > cantidadPaginas) {
      pagina = cantidadPaginas;
    }
    this.paginaActual = pagina;
    this.mostrarProductos();
  }


  obtenerCantidadPaginas(): number {
    return Math.ceil(this.totalProductos / this.productosPorPagina);
  }

  /////////////////////ADMINISTRADOR////////////////////////
  async eliminarProducto(id: string) {
    const ok = confirm("¿Está seguro que desea eliminar el producto?");
    if (!ok) {
      return;
    }
    await this.productosService.deleteProducto(id);
    await this.mostrarProductos();
  }

  editarProducto(id: string) {
    this.editModeMap.set(this.lastEditKey, false);
    const currentEditMode = this.editModeMap.get(id);
    this.editModeMap.set(id, !currentEditMode);
    this.initForm(this.productos.get(id)!);
    this.lastEditKey = id;
  }

  async guardarProducto(id: string, producto: Producto) {
    ///quiero asegurarme de que el modo editar este activado
    const currentEditMode = this.editModeMap.get(id);
    if (!currentEditMode) {
      return;
    }
    if (this.form.controls['nombre'].valid) {
      producto.nombre = this.form.value.nombre;
    }
    if (this.form.controls['precio'].valid) {
      producto.precio = this.form.value.precio;
    }
    if (this.form.controls['stock'].valid) {
      producto.stock = this.form.value.stock;
    }
    await this.productosService.putProducto(id, producto);
    this.editModeMap.set(id, false);
    this.mostrarProductos();
  }

  /////////////////////CLIENTE////////////////////////

  async agregarAlCarrito(id: string) {
    this.editModeMap.set(id, false);
    if(this.itemCarrito.cantidad <= 0){
      alert("Debe ingresar una cantidad válida");
      return;
    }
    this.itemCarrito.id_producto = id;
    await this.carrito.actualizarCarrito(this.itemCarrito);
    this.carritoProductos = this.carrito.getCarrito();
    alert("Producto agregado al carrito");
    this.itemCarrito = {
      id_producto: "",
      cantidad: 0
    }
  }


  async aumentarCantidad(id: string) {
    this.editModeMap.set(id, false);
    const producto = await this.productosService.getProducto(id);
    if(producto.stock < this.itemCarrito.cantidad){
      alert("No hay suficiente stock");
      return;
    }
    else{
      this.itemCarrito.cantidad++;
    }
  }

  disminuirCantidad(id: string) {
    this.editModeMap.set(id, false);
    if (this.itemCarrito.cantidad > 0) {
      this.itemCarrito.cantidad--;
    }
  }

}
