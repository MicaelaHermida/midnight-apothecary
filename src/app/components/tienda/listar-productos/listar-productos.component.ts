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
  arrayOrdenamiento: string[] = ['Nombre', 'Precio', 'Stock'];
  ordenSeleccionado: string = 'Nombre';
  arrayFiltrado: string[] = ['Hasta $1000', '$1000-$3000', '$3000-$5000', '$5000-$7000', 'Más de $7000', 'Todos'];
  filtroSeleccionado: string = 'Todos';
  busqueda: string = '';
  busquedaFinalizada: boolean = false;
  ////paginacion
  arrayPaginas: number[] = [];
  paginaActual: number = 1;
  productosPorPagina: number = 8;
  totalProductos: number = 0;

  ////edicion de productos por admin
  editModeMap: Map<number, boolean> = new Map();
  lastEditKey: number = -1;

  nombreExiste: boolean = false;
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
  arrayOrdenado: Producto[] = [];
  arrayFiltradoOrdenado: Producto[] = [];

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
    this.initialArray();
    this.carritoProductos = this.carrito.getCarrito();
    this.onOrderChangeEvent();
  }
 
  initForm(producto: Producto) {
    this.form = this.fb.group({
      nombre: [producto.nombre, [Validators.required, Validators.minLength(3)]],
      precio: [producto.precio, [Validators.required, Validators.min(1)]],
      stock: [producto.stock, [Validators.required, Validators.min(0)]]
    });
  }

  initialArray(){
    for(let entry of this.allProducts.entries()){
      if(entry[1].stock <= 0 && !this.isAdminRole){
        this.allProducts.delete(entry[0]);
      }
    }
    this.arrayProductos = Array.from(this.allProducts.values());
    console.log(this.arrayProductos);
  }

  /*onFilterChangeEvent() {
    this.filtradoReady = false;
    this.ordenarArrayProductos();
    this.filtrarArrayProductos();
    this.actualizarPaginas();
    this.mostrarArrayProductos();
  }*/

  /*async filtrarProductos() {
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
  }*/

  onOrderChangeEvent() {
    /*this.filtradoReady = false;*/
    console.log(this.ordenSeleccionado);
    console.log(this.filtroSeleccionado);
    console.log(this.arrayProductos);
    this.ordenarArrayProductos();
    console.log(this.arrayOrdenado);
    this.filtrarArrayProductos();
    console.log(this.arrayFiltradoOrdenado);
    this.actualizarPaginas();
    this.mostrarArrayProductos();
  }

  filtrarArrayProductos(){
    if(this.filtroSeleccionado === 'Hasta $1000'){
      this.arrayFiltradoOrdenado = this.arrayOrdenado.filter(producto => producto.precio <= 1000);
    }
    else if(this.filtroSeleccionado === '$1000-$3000'){
      this.arrayFiltradoOrdenado = this.arrayOrdenado.filter(producto => producto.precio >= 1000 && producto.precio <= 3000);
    }
    else if(this.filtroSeleccionado === '$3000-$5000'){
      this.arrayFiltradoOrdenado = this.arrayOrdenado.filter(producto => producto.precio >= 3000 && producto.precio <= 5000);
    }
    else if(this.filtroSeleccionado === '$5000-$7000'){
      this.arrayFiltradoOrdenado = this.arrayOrdenado.filter(producto => producto.precio >= 5000 && producto.precio <= 7000);
    }
    else if(this.filtroSeleccionado === 'Más de $7000'){
      this.arrayFiltradoOrdenado = this.arrayOrdenado.filter(producto => producto.precio >= 7000);
    }
    else{
      this.arrayFiltradoOrdenado = this.arrayOrdenado;
    }
  }
  
  mostrarArrayProductos() {
    /*for(let entry of this.allProducts.entries()){
      if(entry[1].stock <= 0 && !this.isAdminRole){
        this.allProducts.delete(entry[0]);
      }
    }*/
    const start = (this.paginaActual - 1) * this.productosPorPagina;
    const end = this.paginaActual * this.productosPorPagina;
    this.totalProductos = this.arrayFiltradoOrdenado.length;
    this.productosPagina = this.arrayFiltradoOrdenado.slice(start, end);
    this.filtradoReady = true;

  }
  ordenarArrayProductos() {
    if (this.ordenSeleccionado === 'Nombre') {
      this.arrayOrdenado = this.arrayProductos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    else if (this.ordenSeleccionado === 'Precio') {
      this.arrayOrdenado = this.arrayProductos.sort((a, b) => a.precio - b.precio);
    }
    else if (this.ordenSeleccionado === 'Stock') {
      this.arrayOrdenado = this.arrayProductos.sort((a, b) => a.stock - b.stock);
    }
  }

  async buscarProductoPorNombre() : Promise<void> {
    this.busquedaFinalizada = false;
    this.allProducts = new Map();
    this.allProducts = await this.productosService.getProductosPorNombre(this.busqueda);
    for(let entry of this.allProducts.entries()){
      if(entry[1].stock <= 0 && !this.isAdminRole){
        this.allProducts.delete(entry[0]);
      }
    }
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
    return Math.ceil(this.arrayFiltradoOrdenado.length / this.productosPorPagina);
    /*return Math.ceil(this.allProducts.size / this.productosPorPagina);*/
  }

  /////////////////////ADMINISTRADOR////////////////////////
  async eliminarProducto(id_planta: number) : Promise<void>{
    const id_producto = this.verificarIdProducto(id_planta);
    const ok = confirm("¿Está seguro que desea eliminar el producto?");
    if (!ok) {
      return;
    }
    this.allProducts.delete(id_producto);
    await this.productosService.deleteProducto(id_producto);
    this.ordenarArrayProductos();
    this.mostrarArrayProductos();
  }

  editarProducto(id_planta: number) {
    const id_producto = this.verificarIdProducto(Number(id_planta));
    this.editModeMap.set(this.lastEditKey, false);
    const currentEditMode = this.editModeMap.get(id_planta);
    this.editModeMap.set(id_planta, !currentEditMode);
    this.initForm(this.allProducts.get(id_producto)!);
    this.lastEditKey = id_planta;
  }

  async guardarProducto(producto: Producto):Promise<void> {
    this.nombreExiste = await this.productosService.productoNombreExists(this.form.controls['nombre'].value, producto.id_planta);  
    if (this.nombreExiste) {
      alert("Ya existe un producto con ese nombre");
      return;
    }
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


  cancelarEdicion(){
    this.editModeMap.set(this.lastEditKey, false);
  }
  /////////////////////CLIENTE////////////////////////

  

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

  

  verDetalleProducto(id_planta : number){
    const id_producto = this.verificarIdProducto(id_planta);
    this.router.navigate(['/producto', id_producto]);
  }


  ///val

  validate(field: string, error: string): boolean {
    const isInvalid = this.form.controls[field].hasError(error) &&
      (this.form.controls[field].touched || this.form.controls[field].dirty);

    return isInvalid;
  }
}
