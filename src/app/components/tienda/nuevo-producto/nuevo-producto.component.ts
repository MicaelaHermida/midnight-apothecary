import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  nombreProductoExists :boolean = false;
  idPlantaExists : boolean = false;

  form : FormGroup;
  constructor(private fb : FormBuilder, private router : Router, private productoService: ProductosService,
    private authService: AuthenticationService) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      imagen: ['',[Validators.required, Validators.pattern('https?://.+')]],
      precio: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      id_planta: [0,[Validators.required]]
    });
   }

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = await this.authService.isUserLoggedIn();
    this.isAdminRole = await this.authService.getCurrentUserRole() === 'admin';
    this.form.get('nombre')?.valueChanges.subscribe(nuevoNombre => {
      this.nombreProductoExists = false;
    });
    this.form.get('id_planta')?.valueChanges.subscribe(nuevoId => {
      this.idPlantaExists = false;
    });
    if(!this.isAdminRole){
      this.router.navigate(['/home']);
    }
  }

  async agregarProducto(){
    await this.verificarNombre();
    await this.verificarIdPlanta();
    if(this.form.valid && !this.nombreProductoExists && !this.idPlantaExists){
      const producto: Producto = {
        nombre: this.form.value.nombre,
        imagen: this.form.value.imagen,
        precio: this.form.value.precio,
        stock: this.form.value.stock,
        id_planta: this.form.value.id_planta
      }
      await this.productoService.postProducto(producto);
      this.router.navigate(['/admin/listar-productos']);
    }
    else{
      alert("Complete los campos correctamente");
      this.form.markAllAsTouched();
      return;
    }
  }


  cancelar(){
    this.router.navigate(['/admin/listar-productos']);
  }

  ///val

  validate(field: string, error: string): boolean {
    const isInvalid = this.form.controls[field].hasError(error) &&
      (this.form.controls[field].touched || this.form.controls[field].dirty);

    return isInvalid;
  }

  async verificarNombre(){
    this.nombreProductoExists = await this.productoService.productoNombreExists(this.form.controls['nombre'].value, -1);
  }

  async verificarIdPlanta(){
    this.idPlantaExists = await this.productoService.plantaIdExists(this.form.controls['id_planta'].value);
  }


}
