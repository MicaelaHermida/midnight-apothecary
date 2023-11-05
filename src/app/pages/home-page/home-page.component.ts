import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'firebase/auth';
import { PlantaInfo } from 'src/app/interfaces/planta-info.interface';
import { Planta } from 'src/app/interfaces/planta.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PlantasService } from 'src/app/services/plantas.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  form : FormGroup;
  isAdminRole: boolean = false;
  constructor(private plantasService: PlantasService, private authencationService: AuthenticationService, private fb: FormBuilder, private productosService: ProductosService) {
    this.form = this.fb.group({
      id_planta: "",
      nombre: "",
      imagen: "",
      precio: "",
      stock: ""
    });
  }

  async ngOnInit(): Promise<void> {
    console.log(this.authencationService.isUserLoggedIn());
    this.isAdminRole = await this.authencationService.getCurrentUserRole() === "admin";
    /*this.plantasService.getEdiblePlantList().subscribe({
      next: (data: Planta[]) => console.log(data),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });*/

    /*this.plantasService.getPlantDetails('1').subscribe({
      next: (data : PlantaInfo) => console.log(data),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });*/
  }
  /*onMostrarClientes() {
    this.clienteService.getClientesHttp()
      .subscribe(
        {
          next: (cli) => {
            this.listaClientes = cli
          },
          error: (error) => {
            console.error(error)
          }
        }
      )

  }*/

  async cerrarSesion() {
    this.authencationService.logout();
    const user = await this.authencationService.getAllCurrentUserData();
    console.log(user);
  }

  /*async agregarProducto(){
    const producto : Producto = this.form.value;
    await this.productosService.postProducto(producto);
    console.log("Producto agregado");
  }*/
}
