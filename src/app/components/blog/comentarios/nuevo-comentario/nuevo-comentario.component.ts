import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ComentariosService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-nuevo-comentario',
  templateUrl: './nuevo-comentario.component.html',
  styleUrls: ['./nuevo-comentario.component.css']
})

export class NuevoComentarioComponent implements OnInit {

  formulario: FormGroup = this.formBuilder.group({
    comentario: ['', Validators.required]
  })

  constructor(
    private authenticationService: AuthenticationService,
    private comentariosService: ComentariosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
  }

  async guardarComentario() {
    const userId = this.authenticationService.getCurrentUserId();//obtiene el id del usuario

    const comentario = this.formulario.controls['comentario'].value;//obtiene el comentario
    if (comentario == "") {
      alert("No se puede enviar un comentario vacio");
      return;
    }

    await this.comentariosService.postComentario(comentario, userId);//guarda el comentario en la base de datos
    console.log('comentario guardado');
    location.reload();
  }

}