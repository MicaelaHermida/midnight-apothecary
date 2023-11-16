import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit{

  firebaseAuthenticationReady: boolean = false;
  isLogged: boolean = false;
  isAdminRole: boolean = false;

  form : FormGroup;
  constructor(private fb : FormBuilder, private router : Router, private productoService: ProductosService,
    private authService: AuthenticationService) {
    this.form = this.fb.group({
      nombre: "",
      imagen: "",
      precio: 0,
      stock: 0,
      id_planta: 0
    });
   }

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = await this.authService.isUserLoggedIn();
    this.isAdminRole = await this.authService.getCurrentUserRole() === 'admin';
    if(!this.isAdminRole){
      this.router.navigate(['/home']);
    }
  }

  async agregarProducto(){
    if(this.form.valid){
      const producto: Producto = {
        nombre: this.form.value.nombre,
        imagen: this.form.value.imagen,
        precio: this.form.value.precio,
        stock: this.form.value.stock,
        id_planta: this.form.value.id_planta
      }
      await this.productoService.postProducto(producto);
      this.router.navigate(['/admin/listar-productos']);
    }else{
      alert("Complete todos los campos");
      return;
    }
  }


  cancelar(){
    this.router.navigate(['/admin/listar-productos']);
  }
}
