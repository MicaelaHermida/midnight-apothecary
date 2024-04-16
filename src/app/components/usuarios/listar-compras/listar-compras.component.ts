import { compileDeclareDirectiveFromMetadata } from '@angular/compiler';
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
  compra: Compra = {} as Compra;

  isLogged: boolean = false;
  isAdminRole: boolean = false;
  firebaseAuthenticationReady: boolean = false;

  existeUsuario: boolean = true;
  tieneCompras: boolean = true;
  
  opcionSeleccionada: string = "";
  emailBuscado: string = "";
  dniBuscado: string = "";
  fechaBuscada: string = "";
  nroCompraBuscada: string = "";
  filtroEstado: string = "";
  fechaDesde: string = "";
  fechaHasta: string = "";


  constructor(
    private compraService: ComprasService,
    private authService: AuthenticationService
  ){}

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authService.isUserLoggedIn();
    this.isAdminRole = await this.authService.getCurrentUserRole() === 'admin';
    if(!this.isAdminRole){
      this.listarCompras(this.authService.getCurrentUserId());
    }
  }

  //Métodos de validación.

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

  //Métodos de ordenación y corrección de datos.

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

  corregirFecha(fecha: string): string{
    let fechaCorregida = fecha.replace(/-/g, "/");
    return fechaCorregida;
  }

  //Métodos de búsqueda.

  async buscarTodas(): Promise<void>{
    this.compras = await this.compraService.getCompras();
    this.aplicarFiltros();
    this.ordenarComprasPorFecha();
  }

  async buscarPorEmail():Promise<void>{
    if(this.emailBuscado === ""){
      alert("Ingrese un email");
      return;
    }
    this.compras = await this.compraService.getComprasPorEmail(this.emailBuscado);
    await this.validarUsuario();
    await this.validarCompras();
    this.aplicarFiltros();
    this.ordenarComprasPorFecha();
  };

  async buscarPorDni(): Promise<void>{
    if(this.dniBuscado === ""){
      alert("Ingrese un DNI");
      return;
    }
    const id_user = await this.authService.getUserIdByDni(this.dniBuscado);
    if(id_user === ""){
      this.existeUsuario = false;
    }
    this.compras = await this.compraService.getComprasPorUsuario(id_user);
    await this.validarCompras();
    this.aplicarFiltros();
    this.ordenarComprasPorFecha();
  }

  async buscarPorFecha(): Promise<void>{
    const fecha = this.corregirFecha(this.fechaBuscada);
    console.log(fecha);
    if(fecha === ""){
      alert("Ingrese una fecha");
      return;
    }
    this.compras = await this.compraService.getComprasPorFecha(fecha);
    console.log(this.compras);
    
    this.aplicarFiltros();
    await this.validarCompras();
    this.ordenarComprasPorFecha();
  }

  async buscarPorNroCompra(): Promise<void>{
    if(this.nroCompraBuscada === ""){
      alert("Ingrese un número de compra");
      return;
    }
    this.compra = await this.compraService.getComprasPorNroCompra(this.nroCompraBuscada);
    this.compras = [];
    if(this.compra !== null){
      this.compras.push(this.compra);
    }
    this.aplicarFiltros();
    this.ordenarComprasPorFecha();
  }

  //Métodos de filtrado. 
  //Agregar filtros por estado de compra, rango de fecha, monto, etc. 

  filtrarPorEstado(estado: string){
    this.compras = this.compras.filter(compra => compra.estado === estado);
  }

  filtrarPorFecha(){
    if(this.fechaDesde === "" && this.fechaHasta === ""){
      alert("Ingrese un rango de fechas");
      return;
    }
    let fechaDesde = this.corregirFecha(this.fechaDesde);
    let fechaHasta = this.corregirFecha(this.fechaHasta);
    
    this.compras = this.compras.filter(compra => {
      let fechaCompra = this.corregirFecha(compra.fecha);
      
      return fechaCompra >= fechaDesde && fechaCompra <= fechaHasta;
    });
}

aplicarFiltros(){
  if(this.filtroEstado !== ""){
    this.filtrarPorEstado(this.filtroEstado);
  }
  if(this.fechaDesde !== "" && this.fechaHasta !== ""){
    this.filtrarPorFecha();
  }
}



  //Métodos de cambio de estado. 
/*faltaría agregar estados:
    -Pendiente de pago. 
    -Pago confirmado. 
    -Empaquetado.
    -Notificar envío (mandar mail con enlace de seguimiento)
    -Entregado/Retirado. 
    -Archivar
    -Cancelar. (devolver stock y dinero al usuario)
    )*/
  async finalizarEstadoCompra(id:string){
    const ok = confirm("¿Desea finalizar la compra?");
    if(!ok){
      return;
    }
    await this.compraService.cambiarEstadoCompra(id, "finalizada");
    alert("Compra finalizada");
    this.compras = await this.compraService.getComprasPorEmail(this.emailBuscado);
  }


  







}



