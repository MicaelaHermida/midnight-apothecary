import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isHome: boolean = false;
  isTienda: boolean = false;
  isBlog: boolean = false;
  isNuevaBruja: boolean = false;
  isBruja: boolean = false;
  isPerfil: boolean = false;
  isCarrito: boolean = false;
  isCompra: boolean = false;

  ngOnInit(): void {
    this.verificarRuta();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  verificarRuta() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        console.log(val.url);

        if (val.url.includes("home")) {
          this.isHome = true;
          this.isTienda = false;
          this.isBlog = false;
          this.isNuevaBruja = false;
          this.isBruja = false;
          this.isPerfil = false;
          this.isCarrito = false;
          this.isCompra = false;
        } else if (val.url.includes("tienda")) {
          this.isHome = false;
          this.isTienda = true;
          this.isBlog = false;
          this.isNuevaBruja = false;
          this.isBruja = false;
          this.isPerfil = false;
          this.isCarrito = false;
          this.isCompra = false;
        } else if (val.url.match("blog")) {
          this.isHome = false;
          this.isTienda = false;
          this.isBlog = true;
          this.isNuevaBruja = false;
          this.isBruja = false;
          this.isPerfil = false;
          this.isCarrito = false;
          this.isCompra = false;
        } else if (val.url.includes("nueva-bruja")) {
          this.isHome = false;
          this.isTienda = false;
          this.isBlog = false;
          this.isNuevaBruja = true;
          this.isBruja = false;
          this.isPerfil = false;
          this.isCarrito = false;
          this.isCompra = false;
        } else if (val.url.match("blog-bruja") || val.url.includes("editar-bruja")) { //solucionar el de blog-bruja...
          this.isHome = false;
          this.isTienda = false;
          this.isBlog = false;
          this.isNuevaBruja = false;
          this.isBruja = true;
          this.isPerfil = false;
          this.isCarrito = false;
          this.isCompra = false;
        } else if (val.url.includes("perfil")) {
          this.isHome = false;
          this.isTienda = false;
          this.isBlog = false;
          this.isNuevaBruja = false;
          this.isBruja = false;
          this.isPerfil = true;
          this.isCarrito = false;
          this.isCompra = false;
        } else if (val.url.includes("carrito")) {
          this.isHome = false;
          this.isTienda = false;
          this.isBlog = false;
          this.isNuevaBruja = false;
          this.isBruja = false;
          this.isPerfil = false;
          this.isCarrito = true;
          this.isCompra = false;
        } else if (val.url.includes("compra")) {
          this.isHome = false;
          this.isTienda = false;
          this.isBlog = false;
          this.isNuevaBruja = false;
          this.isBruja = false;
          this.isPerfil = false;
          this.isCarrito = false;
          this.isCompra = true;
        }
      }
    });


  }


}
