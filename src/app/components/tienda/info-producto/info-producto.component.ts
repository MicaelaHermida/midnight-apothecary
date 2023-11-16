import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrito } from 'src/app/interfaces/carrito.interface';
import { PlantaInfo } from 'src/app/interfaces/planta-info.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { PlantasService } from 'src/app/services/plantas.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.component.html',
  styleUrls: ['./info-producto.component.css']
})
export class InfoProductoComponent implements OnInit{

    producto!: Producto;
    plantaInfo! : PlantaInfo;

    isLogged: boolean = false;
    firebaseAuthenticationReady: boolean = false;
    isAdminRole: boolean = false;

    cantidadItems: number = 1;
    productoID: string = "";
  
    constructor(private activatedRoute: ActivatedRoute, private productosService: ProductosService, 
      private plantasService: PlantasService, private carrito: CarritoService, private authService: AuthenticationService,
      private router: Router){ }

    async ngOnInit(): Promise<void> {
      await this.authService.waitForFirebaseAuthentication();
      await this.mostrarInfoProducto();
      this.isLogged = this.authService.isUserLoggedIn();
      this.isAdminRole = await this.authService.getCurrentUserRole() === 'admin';
      this.firebaseAuthenticationReady = true; 
    }

    async mostrarInfoProducto() : Promise<void>{
      this.activatedRoute.params.subscribe(async params =>{
        this.productoID= params['key'];
        this.producto= await this.productosService.getProducto(this.productoID);
        if(this.producto){
          this.plantasService.getPlantDetails(this.producto.id_planta).subscribe(data => {
            this.plantaInfo = data;
            console.log(this.plantaInfo);
          });
        }
      });
    }

    aumentar(){
      if(this.producto.stock > this.cantidadItems){
        this.cantidadItems ++;
      }else{
        alert("No hay suficiente stock");
        return;
      }
    }

    disminuir(){
      if(this.cantidadItems > 1){
        this.cantidadItems --;
      }
    }


    async agregarAlCarrito() : Promise<void>{
      if(this.cantidadItems <= 0){
        alert("Debe ingresar una cantidad válida");
        return;
      }
      if(this.cantidadItems > this.producto.stock){
        alert("No hay suficiente stock");
        return;
      }
      const carrito: Carrito = {
        id_producto: this.productoID,
        cantidad: this.cantidadItems
      }
      //quiero corroborar que en el carrito no haya una cantidad mayor o igual al stock del producto
      const carritoActual = this.carrito.getCarrito();
      for(let item of carritoActual){
        if(item.id_producto === this.productoID){
          if(item.cantidad + this.cantidadItems > this.producto.stock){
            alert(`El producto se encuentra en tu carrito y no hay suficiente stock`);
            return;
          }
        }
      }
      await this.carrito.actualizarCarrito(carrito);
      alert("Producto agregado al carrito!");
      this.cantidadItems = 1;
      this.router.navigate(['/tienda']);
    }

    /*async agregarAlCarrito(id_planta: number) {
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
  */
}
