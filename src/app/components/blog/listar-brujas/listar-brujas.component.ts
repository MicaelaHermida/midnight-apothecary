import { Component, OnInit } from '@angular/core';
import { Bruja } from 'src/app/interfaces/brujas.interface';
import { BrujasService } from 'src/app/services/brujas.service';

@Component({
  selector: 'app-listar-brujas',
  templateUrl: './listar-brujas.component.html',
  styleUrls: ['./listar-brujas.component.css']
})
export class ListarBrujasComponent implements OnInit{

  constructor(
    private brujasService:BrujasService
  ){}

  listadoBrujas:Bruja[] = [];

  ngOnInit(): void {
    this.mostrarBrujas();
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
