import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ViewChild } from '@angular/core';
import { CarritoComponent } from '../../tienda/carrito/carrito.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  @ViewChild(CarritoComponent) carritoComponent: CarritoComponent | undefined;
  carritoVisible: boolean = false;

  isLogged: boolean = false;
  isAdminRole: boolean = false;
  firebaseAuthenticationReady : boolean = false;
  constructor(private authenticationService: AuthenticationService,
     private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authenticationService.isUserLoggedIn();
    this.isAdminRole = await this.authenticationService.getCurrentUserRole() === "admin";
    this.actualizarNavbar();
  }

  async cerrarSesion(){
    await this.authenticationService.logout();
    this.router.navigate(['/home']);
    this.isLogged = false;
  }

  actualizarNavbar(){
    this.router.events.subscribe(async (val) => {
      if(val instanceof NavigationEnd){
        this.isLogged = this.authenticationService.isUserLoggedIn();
        this.isAdminRole = await this.authenticationService.getCurrentUserRole() === "admin";
      }
    });
  }

  clickCarrito(){
    if(this.carritoVisible){
      this.carritoVisible = false;
    }else{
      this.carritoVisible = true;
    }
  }
  
}
