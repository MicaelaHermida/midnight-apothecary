import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-compra-page',
  templateUrl: './compra-page.component.html',
  styleUrls: ['./compra-page.component.css']
})
export class CompraPageComponent implements OnInit{
  
  hasProductos: boolean = false;
  firebaseAuthenticationReady: boolean = false;

    constructor(private carritoService: CarritoService, private router: Router, private authService: AuthenticationService) { }
  
    async ngOnInit(): Promise<void> {
      await this.authService.waitForFirebaseAuthentication();
      this.firebaseAuthenticationReady = true;
      await this.carritoService.getCarritoFromUsuario();
      this.hasProductos = this.carritoService.carritoHasItems();
      if(!this.hasProductos){
        this.router.navigate(['/home']);
      }
    }

}
