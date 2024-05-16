import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/interfaces/compra.interface';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  //---[ VARIABLES ]

  //auth
  isLogged: boolean = false;
  isAdminRole: boolean = false;
  firebaseAuthenticationReady: boolean = false;

  //validación
  existeUsuario: boolean = true;
  hayVentas: boolean = true;

  //busqueda
  busqueda: boolean = false;
  datoBuscado: string = "";

  //visualización
  clientes: Map<string, string> = new Map();
  estadoAmpliacion: { [key: string]: boolean } = {};
  arrayEstados: string[] = ['Pendiente de pago', 'Pago confirmado', 'Pedido empaquetado', 'Envío notificado', 'Pedido entregado', 'Archivado', 'Cancelado'];


  //filtros
  filtroEstado: string = "";
  fechaDesde: string = "";
  fechaHasta: string = "";

  //ventas
  ventas: Compra[] = [];
  venta: Compra = {} as Compra;
  productos: ItemCarrito[] = [];

  //seleccion
  checkVentas: { [key: string]: boolean } = {};
  accionSeleccionada: string = "";
  inputSeleccionado: boolean = false;


  constructor(
    private compraService: ComprasService,
    private authService: AuthenticationService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authService.isUserLoggedIn();
    this.isAdminRole = await this.authService.getCurrentUserRole() === 'admin';
  }

  //---[ METODOS ]

  //Validación y correccion de datos
  async validarUsuario(email: string): Promise<void> {
    const id_user = await this.authService.getUserIdByEmail(email);
    this.existeUsuario = !!id_user;
  }

  async validarVentas(): Promise<void> {
    this.hayVentas = !!this.ventas.length;
  }

  corregirFecha(fecha: string): string {
    return fecha.replace(/-/g, "/");
  }


  //Ordenacion
  ordenarVentasPorFecha() {
    this.ventas.sort((a, b) => {
      let dateA = new Date(a.fecha);
      let dateB = new Date(b.fecha);
      return dateB.getTime() - dateA.getTime();
    })
  }


  //Visualización y listar
  verificarInput(): void{
    if(!this.datoBuscado){
      this.busqueda = false;
    }
  }

  async verClientePorVenta() {
    for (let venta of this.ventas) {
      const cliente = await this.authService.getUserNameById(venta.userId);
      this.clientes.set(venta.userId, cliente);
    }
  }

  async inicializarAmpliacion(): Promise<void> {
    for(const venta of this.ventas){
      this.estadoAmpliacion[venta.idDoc!] = false;
    }
  }

  ampliarVenta(idVenta: string | undefined): void {
    this.estadoAmpliacion[idVenta!] = !this.estadoAmpliacion[idVenta!];
  }


  //Filtrado
  filtrarPorEstado() {
    this.ventas = this.ventas.filter(venta => venta.estado === this.filtroEstado);
  }

  filtrarPorFecha() {
    if (this.fechaDesde === "" && this.fechaHasta === "") {
      alert("Ingrese un rango de fechas");
      return;
    }
    const fechaDesde = this.corregirFecha(this.fechaDesde);
    const fechaHasta = this.corregirFecha(this.fechaHasta);

    this.ventas = this.ventas.filter(venta => {
      const fechaVenta = this.corregirFecha(venta.fecha);
      return fechaVenta >= fechaDesde && fechaVenta <= fechaHasta;
    });
  }

  aplicarFiltros() {
    if (this.filtroEstado !== "" && this.filtroEstado !== 'Todas') {
      this.filtrarPorEstado();
    }
    if (this.fechaDesde !== "" && this.fechaHasta !== "") {
      this.filtrarPorFecha();
    }
  }


  //Búsqueda
  async buscarPorEmail(email: string): Promise<void> {
    this.ventas = await this.compraService.getComprasPorEmail(email);
    await this.validarUsuario(email);
  }

  async buscarPorDNI(dni: string): Promise<void> {
    const id_user = await this.authService.getUserIdByDni(dni);
    if (id_user === "") {
      this.existeUsuario = false;
    }
    this.ventas = await this.compraService.getComprasPorUsuario(id_user);
  }

  async buscarPorNro(nroVenta: string): Promise<void> {
    this.venta = await this.compraService.getComprasPorNroCompra(nroVenta);
    this.ventas = this.venta ? [this.venta] : [];
  }

  async buscarVentas(): Promise<void> {
    this.busqueda = true;

    if (this.datoBuscado === "") {
      this.ventas = await this.compraService.getCompras();
      if (this.filtroEstado !== 'Archivado') {
        this.ventas = this.ventas.filter(venta => venta.estado !== 'Archivado');
      }
    } else if (this.datoBuscado.includes('@') && this.datoBuscado.includes('.')) {
      await this.buscarPorEmail(this.datoBuscado);
    } else if (!isNaN(Number(this.datoBuscado)) && this.datoBuscado.length === 8) {
      await this.buscarPorDNI(this.datoBuscado);
    } else {
      await this.buscarPorNro(this.datoBuscado);
    }

    this.validarVentas();
    this.aplicarFiltros();
    this.verClientePorVenta();
    this.ordenarVentasPorFecha();

    await this.inicializarAmpliacion();
  }


  //Seleccion de ventas

  actualizarVentasSeleccionadas(): void{
    for(const venta of this.ventas){
      if(this.checkVentas[venta.idDoc!]){
        this.checkVentas[venta.idDoc!] = true;
      } else{
        this.checkVentas[venta.idDoc!] = false;
      }
    }
  }

  hayVentasSeleccionadas(): boolean{
    return Object.values(this.checkVentas).some(checked => checked);
  }

  checkAll(event: any){
    const isChecked = event.target.checked;
    for(let venta of this.ventas){
      this.checkVentas[venta.idDoc!] = isChecked;
    }
  }


  //Cambio de estado. 

  async cambiarEstado(id: string, estado: string): Promise<void>{
    await this.compraService.cambiarEstadoCompra(id, estado);
    await this.buscarVentas();
  }

  async cambiarEstados(estado: string): Promise<void>{
    if(this.accionSeleccionada === ""){
      alert("Seleccione una acción");
      return;
    }
    for(const [id, checked] of Object.entries(this.checkVentas)){
      if(checked){
        await this.compraService.cambiarEstadoCompra(id, estado);
      }
    }
    await this.buscarVentas();
  }

}