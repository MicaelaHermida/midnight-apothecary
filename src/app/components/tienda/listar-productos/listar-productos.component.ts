import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  isAdminRole: boolean = false;
  isLogged: boolean = false;
  firebaseAuthenticationReady : boolean = false;
  

  form : FormGroup;

  
  editModeMap: Map<string, boolean> = new Map();

  productos: Map<string, Producto> = new Map();
    constructor(private productosService: ProductosService, private authenticationService: AuthenticationService, private fb: FormBuilder, private router: Router) {
      this.form = this.fb.group({
        nombre: "",
        precio: 0,
        stock: 0
      });
     }
  
    async ngOnInit(): Promise<void> {
      await this.authenticationService.waitForFirebaseAuthentication();
      this.firebaseAuthenticationReady = true;
      this.isLogged = await this.authenticationService.isUserLoggedIn();
      this.isAdminRole = await this.authenticationService.getCurrentUserRole() === "admin";
      this.mostrarProductos();
    }

    initForm(producto: Producto){
      this.form = this.fb.group({
        nombre: [producto.nombre, [Validators.required, Validators.minLength(3)]],
        precio: [producto.precio, [Validators.required, Validators.min(0)]],
        stock: [producto.stock, [Validators.required, Validators.min(0)]]
      });
    }

    async mostrarProductos(){
      this.productos = await this.productosService.getProductos();
      console.log(this.productos);
    }



    /////////////////////ADMINISTRADOR////////////////////////
    async eliminarProducto(id: string){
      const ok = confirm("¿Está seguro que desea eliminar el producto?");
      if(!ok){
        return;
      }
      await this.productosService.deleteProducto(id);
      this.mostrarProductos();
    }

    editarProducto(id:string){
      const currentEditMode = this.editModeMap.get(id);
      this.editModeMap.set(id, !currentEditMode);
      this.initForm(this.productos.get(id)!);
    }

    async guardarProducto(id: string, producto: Producto){
      
      if(this.form.controls['nombre'].valid){
        producto.nombre = this.form.value.nombre;
      }
      if(this.form.controls['precio'].valid){
        producto.precio = this.form.value.precio;
      }
      if(this.form.controls['stock'].valid){
        producto.stock = this.form.value.stock;
      }
      await this.productosService.putProducto(id, producto);
      this.editModeMap.set(id, false);
      this.mostrarProductos();
    }

    /////////////////////CLIENTE////////////////////////



}
