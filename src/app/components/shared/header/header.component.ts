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
  isEditarBruja: boolean = false;
  isPerfil: boolean = false;
  isCarrito: boolean = false;
  isCompra: boolean = false;

  brujaId: string = "";
  brujaNombre: string = "";
  brujaApellido: string = "";

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

        if (val.url.includes("home")) { //pasar todos los false a un metodo cerrar o whatever sea, y llamar en cada if antes del true
          this.isHome = true;
          this.isTienda = false;
          this.isBlog = false;
          this.isNuevaBruja = false;
          this.isBruja = false;
          this.isEditarBruja = false;
          this.isPerfil = false;
          this.isCarrito = false;
          this.isCompra = false;
        } else if (val.url.includes("tienda")) {
          this.isHome = false;
          this.isTienda = true;
          this.isBlog = false;
          this.isNuevaBruja = false;
          this.isBruja = false;
          this.isEditarBruja = false;
          this.isPerfil = false;
          this.isCarrito = false;
          this.isCompra = false;
        } else if (val.url.includes("blog")) {
          this.isHome = false;
          this.isTienda = false;
          this.isBlog = true;
          this.isNuevaBruja = false;
          this.isBruja = false;
          this.isEditarBruja = false;
          this.isPerfil = false;
          this.isCarrito = false;
          this.isCompra = false;
        } else if (val.url.includes("nueva-bruja")) {
          this.isHome = false;
          this.isTienda = false;
          this.isBlog = false;
          this.isNuevaBruja = true;
          this.isBruja = false;
          this.isEditarBruja = false;
          this.isPerfil = false;
          this.isCarrito = false;
          this.isCompra = false;
        } else if (val.url.includes("editar-bruja")) { 
          this.isHome = false;
          this.isTienda = false;
          this.isBlog = false;
          this.isNuevaBruja = false;
          this.isBruja = false;
          this.isEditarBruja = true;
          this.isPerfil = false;
          this.isCarrito = false;
          this.isCompra = false;
        }else if(val.url.includes("info-bruja")){ //ademas de cambiarlos... traer a una variable el id de la bruja para despues poder buscar el nombre y apellido
          this.isHome = false;
          this.isTienda = false;
          this.isBlog = false;
          this.isNuevaBruja = false;
          this.isBruja = true;
          this.isEditarBruja = false;
          this.isPerfil = false;
          this.isCarrito = false;
          this.isCompra = false;
          this.brujaId = this.route.snapshot.paramMap.get('key')!;
          this.brujaNombre = this.route.snapshot.paramMap.get('nombre')!;
          this.brujaApellido = this.route.snapshot.paramMap.get('apellido')!;

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
