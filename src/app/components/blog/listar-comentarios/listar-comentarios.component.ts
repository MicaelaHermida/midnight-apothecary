import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/interfaces/comentarios.interface';
import { ComentariosService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-listar-comentarios',
  templateUrl: './listar-comentarios.component.html',
  styleUrls: ['./listar-comentarios.component.css']
})
export class ListarComentariosComponent implements OnInit {

  listadoComentarios: Map<string, Comentario> = new Map();

  constructor(
    private comentariosService: ComentariosService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.mostrarComentarios();
  }

  async mostrarComentarios(): Promise<Map<string, Comentario>>{
    try {
      this.listadoComentarios = await this.comentariosService.getComentariosBruja();
    } catch (e) {
      console.log(e);
    }
    return this.listadoComentarios;
  }
  
  async eliminarComentario(id: string): Promise<void> {
    console.log(id);
    const ok = window.confirm(`¿Realmente querés eliminar el comentario de id: ${id}`);
    if (!ok) return;

    try{
      this.comentariosService.deleteComentario(id);
      await this.mostrarComentarios();
    }catch{
      console.log("No se pudo eliminar el comentario");
    }
  }

}