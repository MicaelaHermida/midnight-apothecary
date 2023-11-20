import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, UrlSegment } from '@angular/router';
import { BrujasService } from 'src/app/services/brujas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isHome: boolean = false;
  isLogin: boolean = false;
  isRegister: boolean = false;
  isTienda: boolean = false;
  isProducto: boolean = false;
  isNuevoProducto: boolean = false;
  isBlog: boolean = false;
  isNuevaBruja: boolean = false;
  isBruja: boolean = false;
  isEditarBruja: boolean = false;
  isPerfil: boolean = false;
  isCarrito: boolean = false;
  isCompra: boolean = false;
  isCompras: boolean = false;

  brujaId: string = "";
  inicialNombre: string = "";
  restoNombre: string = "";
  brujaNombre: String = "";
  inicialApellido: string = "";
  restoApellido: string = "";
  brujaApellido: String = "";

  ngOnInit(): void {
    this.verificarRuta();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brujasService: BrujasService
  ) { }

  verificarRuta() {
    this.router.events.subscribe(async (val) => {
      if (val instanceof NavigationEnd) {
        console.log(this.router.url);

        this.brujaId = this.router.url.padEnd(11, " ").slice(11, 48).trim();
        console.log(this.brujaId);

        this.falsearPaginas();

        if (this.router.url.includes("home")) this.isHome = true;
        else if (this.router.url.includes("usuario")) this.isPerfil = true;
        else if (this.router.url.includes("login")) this.isLogin = true;
        else if (this.router.url.includes("register")) this.isRegister = true;
        else if (this.router.url.includes("tienda")) this.isTienda = true;
        else if (this.router.url.includes("nuevo-producto")) this.isNuevoProducto = true;
        else if (this.router.url.includes("producto")) this.isProducto = true;
        else if (this.router.url.includes("carrito")) this.isCarrito = true;
        else if (this.router.url.includes("compras")) this.isCompras = true;
        else if (this.router.url.includes("compra")) this.isCompra = true;
        else if (this.router.url.includes("blog")) this.isBlog = true;
        else if (this.router.url.includes("nueva-bruja")) this.isNuevaBruja = true;
        else if (this.router.url.includes("info-bruja")) {
          this.isBruja = true;
          await this.traerBruja(this.brujaId);
          this.desglosarBruja();
        }
      }
    });
  }

  async traerBruja(id: string) {
    const bruja = await this.brujasService.getBruja(this.brujaId);

    if (bruja) {
      this.brujaNombre = bruja.nombre;
      this.brujaApellido = bruja.apellido;
    }

    console.log(`Nombre: ${this.brujaNombre} Apellido: ${this.brujaApellido}`);
  }

  desglosarBruja() {
    this.inicialNombre = this.brujaNombre.slice(0, 1);
    this.restoNombre = this.brujaNombre.slice(1, this.brujaNombre.length);
    this.inicialApellido = this.brujaApellido.slice(0, 1);
    this.restoApellido = this.brujaApellido.slice(1, this.brujaApellido.length);
    console.log(`Nombre: ${this.inicialNombre} ${this.restoNombre} Apellido: ${this.inicialApellido} ${this.restoApellido}`)
  }

  falsearPaginas() {
    this.isHome = false;
    this.isLogin = false;
    this.isRegister = false;
    this.isTienda = false;
    this.isProducto = false;
    this.isNuevoProducto = false;
    this.isCarrito = false;
    this.isCompra = false;
    this.isCompras = false;
    this.isBlog = false;
    this.isBruja = false;
    this.isNuevaBruja = false;
    this.isEditarBruja = false;
    this.isPerfil = false;
  }

}
