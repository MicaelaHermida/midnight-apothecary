import { Component, OnInit } from '@angular/core';
import { reload } from 'firebase/auth';
import { Compra } from 'src/app/interfaces/compra.interface';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-listar-compras',
  templateUrl: './listar-compras.component.html',
  styleUrls: ['./listar-compras.component.css']
})
export class ListarComprasComponent implements OnInit{

  productos: ItemCarrito[] = [];
  compras: Compra[] = [];

  isLogged: boolean = false;
  isAdminRole: boolean = false;
  firebaseAuthenticationReady: boolean = false;

  existeUsuario: boolean = true;
  tieneCompras: boolean = true;
  emailBuscado: string = "";

  constructor(private compraService: ComprasService, private authService: AuthenticationService){}

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authService.isUserLoggedIn();
    this.isAdminRole = await this.authService.getCurrentUserRole() === 'admin';
    if(!this.isAdminRole){
      this.listarCompras(this.authService.getCurrentUserId());
    }
  }

  async listarCompras(id: string){
    this.compras = await this.compraService.getComprasPorUsuario(id);
    this.ordenarComprasPorFecha();
  }

  ordenarComprasPorFecha(){
    this.compras.sort((a,b) => {
      let dateA = new Date(a.fecha);
      let dateB = new Date(b.fecha);
      return dateB.getTime() - dateA.getTime();
    });
  }

  async finalizarEstadoCompra(id:string){
    const ok = confirm("¿Desea finalizar la compra?");
    if(!ok){
      return;
    }
    await this.compraService.cambiarEstadoCompra(id, "finalizada");
    alert("Compra finalizada");
    this.compras = await this.compraService.getComprasPorEmail(this.emailBuscado);
  }


  async buscarPorEmail():Promise<void>{
    if(this.emailBuscado === ""){
      alert("Ingrese un email");
      return;
    }
    this.compras = await this.compraService.getComprasPorEmail(this.emailBuscado);
    await this.validarUsuario();
    await this.validarCompras();
    this.ordenarComprasPorFecha();
  };

  async validarUsuario():Promise<void>{
    const id_user = await this.authService.getUserIdByEmail(this.emailBuscado);
    if(id_user === ""){
      this.existeUsuario = false;
    }else{
      this.existeUsuario =  true;
    }
  }

  async validarCompras():Promise<void>{
    if(this.compras.length === 0){
      this.tieneCompras = false;
    }else{
      this.tieneCompras = true;
    }
  }
}
