import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comentario } from 'src/app/interfaces/comentarios.interface';
import { BrujasService } from 'src/app/services/brujas.service';
import { ComentariosService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-listar-comentarios',
  templateUrl: './listar-comentarios.component.html',
  styleUrls: ['./listar-comentarios.component.css']
})
export class ListarComentariosComponent implements OnInit {

  listadoComentarios: Comentario[] = [];

  constructor(
    private comentariosService: ComentariosService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  mostrarComentarios() {
    this.comentariosService.getComentarios()
      .subscribe({
        next: (comentario) =>{
          this.listadoComentarios = comentario;
        },
        error: (e) =>{
          console.log(e);
        }
      })
  }






} 
