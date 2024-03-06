import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/interfaces/compra.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-buscar-compras',
  templateUrl: './buscar-compras.component.html',
  styleUrls: ['./buscar-compras.component.css']
})
export class BuscarComprasComponent implements OnInit{

  isLogged: boolean = false;
  isAdminRole: boolean = false;
  firebaseAuthenticationReady: boolean = false;

  compras: Compra[] = [];
  opcionSeleccionada: string = "";
  emailBuscado: string = "";
  dniBuscado: string = "";
  fechaBuscada: string = "";
  nroCompraBuscada: string = "";

  constructor(
    private compraService: ComprasService,
    private authService: AuthenticationService
  ){}


  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authService.isUserLoggedIn();
    this.isAdminRole = await this.authService.getCurrentUserRole() === 'admin';
  }

  async buscarPorEmail(): Promise<void>{
    if(this.emailBuscado === ""){
      alert("Ingrese un email");
      return;
    }
    this.compras = await this.compraService.getComprasPorEmail(this.emailBuscado);
  }

}
