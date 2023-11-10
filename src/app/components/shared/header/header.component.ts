import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BrujasService } from 'src/app/services/brujas.service';

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
  brujaNombre: String = "";
  brujaApellido: String = "";

  ngOnInit(): void {
    this.verificarRuta();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brujasService: BrujasService
  ) { }

  verificarRuta(){
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        console.log(this.router.url);
        
        this.brujaId = this.router.url.padEnd(11, " ").slice(11, 48).trim();
        console.log(this.brujaId);

        this.falsearPaginas();
        
        if(this.router.url.includes("home")) this.isHome = true;
        else if(this.router.url.includes("tienda")) this.isTienda = true;
        else if(this.router.url.includes("carrito")) this.isCarrito = true;
        else if(this.router.url.includes("compra")) this.isCompra = true;
        else if(this.router.url.includes("blog")) this.isBlog = true;
        else if(this.router.url.includes("nueva-bruja")) this.isNuevaBruja = true;  
        else if(this.router.url.includes("editar-bruja")) this.isEditarBruja = true;
        else if(this.router.url.includes("info-bruja")){
          this.isBruja = true;
          this.traerBruja(this.brujaId);
        }
      }
    });
  }

  async traerBruja(id: string){
      const bruja = await this.brujasService.getBruja(this.brujaId);

      if (bruja){
        this.brujaNombre = bruja.nombre;
        this.brujaApellido = bruja.apellido;
      }

      console.log(`Nombre: ${this.brujaNombre} Apellido: ${this.brujaApellido}`);
  }



/* 
  verificarRuta() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        console.log(val.url);
        this.falsearPaginas();

        if(val.url.includes("home")) this.isHome = true;
        else if (val.url.includes("tienda")) this.isTienda = true;
        else if (val.url.includes("carrito")) this.isCarrito = true;
        else if(val.url.includes("compra")) this.isCompra = true;
        else if(val.url.includes("blog")) this.isBlog = true;
        else if(val.url.includes("nueva-bruja")) this.isNuevaBruja = true;
        else if(val.url.includes("editar-bruja")) this.isEditarBruja = false;
        else if(val.url.includes("info-bruja")){ //ademas de cambiarlos... traer a una variable el id de la bruja para despues poder buscar el nombre y apellido
          this.isBruja = true;

          this.brujaId = this.route.snapshot.paramMap.get('key')!;
          console.log(this.brujaId);
          this.brujaNombre = this.route.snapshot.paramMap.get('nombre')!;
          this.brujaApellido = this.route.snapshot.paramMap.get('apellido')!;
        }else if(val.url.includes("perfil")) this.isPerfil = true;
      }
    });
  } */

  falsearPaginas(){
    this.isHome = false;
    this.isTienda = false;
    this.isCarrito = false;
    this.isCompra = false;
    this.isBlog = false;
    this.isBruja = false;
    this.isNuevaBruja = false;  
    this.isEditarBruja = false;
    this.isPerfil = false;
  }

}
