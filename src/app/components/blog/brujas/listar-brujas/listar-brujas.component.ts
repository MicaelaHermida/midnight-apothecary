import { Component, OnInit } from '@angular/core';
import { Bruja } from 'src/app/interfaces/brujas.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BrujasService } from 'src/app/services/brujas.service';

@Component({
  selector: 'app-listar-brujas',
  templateUrl: './listar-brujas.component.html',
  styleUrls: ['./listar-brujas.component.css']
})
export class ListarBrujasComponent implements OnInit{

  constructor(
    private brujasService:BrujasService,
    private authenticationService: AuthenticationService
  ){}

  listadoBrujas:Bruja[] = [];
  isAdmin: boolean = false;

  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
    this.verificarUsuario();
    this.mostrarBrujas();
  }

  async verificarUsuario(){
    const rol = await this.authenticationService.getCurrentUserRole();
    if(rol === "admin"){
      this.isAdmin = true;}
  }

  mostrarBrujas(){
    this.brujasService.getBrujas()
    .subscribe({
      next: (brujas) =>{
        this.listadoBrujas = brujas;
      }, 
      error:(e)=>{
        console.log(e);
      }
    })
  }

  eliminarBruja(id:number){
    const ok = window.confirm(`¿Realmente querés eliminar la bruja de id: ${id}`);
    if (!ok) return;

    this.brujasService.deleteBruja(id).subscribe({
      next: (bruja) =>{
        alert(`Se eliminó a: ${bruja.nombre}/${bruja.apellido}`);
      }, 
      error: (e)=>{
        console.log(e);
      }
    })
  }


}
