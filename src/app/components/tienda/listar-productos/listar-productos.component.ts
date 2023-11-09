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

  ////filtrado
  arrayOrdenamiento: string[] = ['nombre', 'precio', 'stock'];
  ordenSeleccionado: string = '';
  arrayFiltrado: string[] = ['hasta $1000', '$1000-$3000', '$3000-$5000', '$5000-$7000', 'más de $7000', 'todos'];
  filtroSeleccionado: string = '';
  busqueda: string = '';
  busquedaFinalizada: boolean = false;
  ////paginacion
  arrayPaginas: number[] = [];
  paginaActual: number = 1;
  productosPorPagina: number = 10;
  totalProductos: number = 0;

  ////edicion de productos por admin
  editModeMap: Map<number, boolean> = new Map();
  lastEditKey: number = -1;

  ////cliente
  carritoProductos: Carrito[] = [];
  itemCarrito: Carrito = {
    id_producto: "",
    cantidad: 0
  }
  cantidadItems: number = 0;

  form: FormGroup;

  allProducts: Map<string, Producto> = new Map();
  filtradoReady: boolean = false;

  productosPagina: Producto[] = [];
  arrayProductos: Producto[] = [];

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
    this.allProducts = await this.productosService.getProductos();
    this.ordenarArrayProductos();
    this.actualizarPaginas();
    this.mostrarArrayProductos();
    this.carritoProductos = this.carrito.getCarrito();
    this.ordenSeleccionado = 'nombre';
    this.onOrderChangeEvent();
    this.filtroSeleccionado = 'todos';
  }

  initForm(producto: Producto) {
    this.form = this.fb.group({
      nombre: [producto.nombre, [Validators.required, Validators.minLength(3)]],
      precio: [producto.precio, [Validators.required, Validators.min(0)]],
      stock: [producto.stock, [Validators.required, Validators.min(0)]]
    });
  }

  async onFilterChangeEvent(): Promise<void> {
    this.filtradoReady = false;
    await this.filtrarProductos();
    this.ordenarArrayProductos();
    this.actualizarPaginas();
    this.mostrarArrayProductos();
  }

  async filtrarProductos() {
    this.allProducts = new Map();
    if (this.filtroSeleccionado === 'hasta $1000') {
      this.allProducts = await this.productosService.getProductosDentroDeRango(0, 1000);
    }
    else if (this.filtroSeleccionado === '$1000-$3000') {
      this.allProducts = await this.productosService.getProductosDentroDeRango(1000, 3000);
    }
    else if (this.filtroSeleccionado === '$3000-$5000') {
      this.allProducts = await this.productosService.getProductosDentroDeRango(3000, 5000);
    }
    else if (this.filtroSeleccionado === '$5000-$7000') {
      this.allProducts = await this.productosService.getProductosDentroDeRango(5000, 7000);
    }
    else if (this.filtroSeleccionado === 'más de $7000') {
      this.allProducts = await this.productosService.getProductosDentroDeRango(7000, 100000);
    }
    else {
      this.allProducts = await this.productosService.getProductos();
    }
  }
  onOrderChangeEvent() {
    this.filtradoReady = false;
    this.ordenarArrayProductos();
    // Optional: Refrescar el paginado.
    this.mostrarArrayProductos();
  }

  mostrarArrayProductos() {
    const start = (this.paginaActual - 1) * this.productosPorPagina;
    const end = this.paginaActual * this.productosPorPagina;
    this.totalProductos = this.arrayProductos.length;
    this.productosPagina = this.arrayProductos.slice(start, end);
    this.filtradoReady = true;

  }
  ordenarArrayProductos() {
    this.arrayProductos = Array.from(this.allProducts.values());
    if (this.ordenSeleccionado === 'nombre') {
      this.arrayProductos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    else if (this.ordenSeleccionado === 'precio') {
      this.arrayProductos.sort((a, b) => a.precio - b.precio);
    }
    else if (this.ordenSeleccionado === 'stock') {
      this.arrayProductos.sort((a, b) => a.stock - b.stock);
    }
  }

  async buscarProductoPorNombre() {
    this.busquedaFinalizada = false;
    this.allProducts = new Map();
    this.allProducts = await this.productosService.getProductosPorNombre(this.busqueda);
    console.log(this.allProducts);
    this.ordenarArrayProductos();
    this.actualizarPaginas();
    this.mostrarArrayProductos();
    this.busquedaFinalizada = true;
    
  }
  ////////////////////////PAGINADO///////////////////////
  actualizarPaginas() {
    this.arrayPaginas = [];
    const cantidadPaginas = this.obtenerCantidadPaginas();
    console.log(cantidadPaginas)
    for (let i = 0; i < cantidadPaginas; i++) {
      this.arrayPaginas.push(i + 1);
    }
    console.log(this.arrayPaginas.length)
  }

  async cambiarPagina(pagina: number): Promise<void> {
    if (pagina < 1) {
      pagina = 1;
    }
    const cantidadPaginas = this.obtenerCantidadPaginas();
    console.log(cantidadPaginas);
    if (pagina > cantidadPaginas) {
      pagina = cantidadPaginas;
    }
    this.paginaActual = pagina;
    this.mostrarArrayProductos();
  }


  obtenerCantidadPaginas(): number {
    return Math.ceil(this.allProducts.size / this.productosPorPagina);
  }

  /////////////////////ADMINISTRADOR////////////////////////
  async eliminarProducto(id_planta: number) {
    const id_producto = this.verificarIdProducto(id_planta);
    const ok = confirm("¿Está seguro que desea eliminar el producto?");
    if (!ok) {
      return;
    }
    await this.productosService.deleteProducto(id_producto);
    this.ordenarArrayProductos();
  }

  editarProducto(id_planta: number) {
    const id_producto = this.verificarIdProducto(Number(id_planta));
    this.editModeMap.set(this.lastEditKey, false);
    const currentEditMode = this.editModeMap.get(id_planta);
    this.editModeMap.set(id_planta, !currentEditMode);
    this.initForm(this.allProducts.get(id_producto)!);
    this.lastEditKey = id_planta;
  }

  async guardarProducto(producto: Producto) {
    ///quiero asegurarme de que el modo editar este activado
    const id_producto = this.verificarIdProducto(producto.id_planta);
    const currentEditMode = this.editModeMap.get(producto.id_planta);
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
    await this.productosService.putProducto(id_producto, producto);
    this.editModeMap.set(producto.id_planta, false);
    this.ordenarArrayProductos();
  }

  /////////////////////CLIENTE////////////////////////

  async agregarAlCarrito(id_planta: number) {
    const id_producto = this.verificarIdProducto(id_planta);
    this.editModeMap.set(id_planta, false);
    if (this.itemCarrito.cantidad <= 0) {
      alert("Debe ingresar una cantidad válida");
      return;
    }
    this.itemCarrito.id_producto = id_producto;
    await this.carrito.actualizarCarrito(this.itemCarrito);
    this.carritoProductos = this.carrito.getCarrito();
    alert("Producto agregado al carrito");
    this.itemCarrito = {
      id_producto: "",
      cantidad: 0
    }
  }

  verificarIdProducto(id_planta: number): string {
    let id_producto: string = '';
    for (let entry of this.allProducts.entries()) {
      if (entry[1].id_planta === id_planta) {
        id_producto = entry[0];
        break;
      }
    }
    return id_producto;
  }

  async aumentarCantidad(id_planta: number) {
    const id_producto = this.verificarIdProducto(id_planta);
    this.editModeMap.set(id_planta, false);
    const producto = await this.productosService.getProducto(id_producto);
    if (producto.stock < this.itemCarrito.cantidad) {
      alert("No hay suficiente stock");
      return;
    }
    else {
      this.itemCarrito.cantidad++;
    }
  }

  disminuirCantidad(id_planta: number) {
    this.editModeMap.set(id_planta, false);
    if (this.itemCarrito.cantidad > 0) {
      this.itemCarrito.cantidad--;
    }
  }

  verDetalleProducto(id_planta : number){
    const id_producto = this.verificarIdProducto(id_planta);
    this.router.navigate(['/producto', id_producto]);
  }

}
