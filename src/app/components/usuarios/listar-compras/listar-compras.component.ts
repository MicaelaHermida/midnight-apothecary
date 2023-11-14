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

  constructor(private compraService: ComprasService, private authService: AuthenticationService){}

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authService.isUserLoggedIn();
    this.isAdminRole = await this.authService.getCurrentUserRole() === 'admin';
    await this.listarCompras();
  }

  async listarCompras(){
    this.compras = await this.compraService.getComprasPorUsuario(this.authService.getCurrentUserId());
  }

  async finalizarEstadoCompra(id:string){
    const ok = confirm("¿Desea finalizar la compra?");
    if(!ok){
      return;
    }
    await this.compraService.cambiarEstadoCompra(id, "finalizada");
    alert("Compra finalizada");
    window.location.reload();
  }
}
