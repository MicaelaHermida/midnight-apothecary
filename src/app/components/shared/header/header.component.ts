import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isHome: boolean = false;
  isTienda: boolean = false;
  isBlog: boolean = false;  
  isPerfil: boolean = false;
  isCarrito: boolean = false;

  ngOnInit(): void {
    this.verificarRuta();
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  verificarRuta(){  
    if(this.router.url === "/home"){
      this.isHome = true;
    }else if(this.router.url === "/tienda"){
      this.isTienda = true;
    }else if(this.router.url === "/blog"){
      this.isBlog = true;
    }else if(this.router.url === "/perfil"){
      this.isPerfil = true;
    }else{
      console.log("No se encuentra en ninguna ruta");
    }

  }

}
