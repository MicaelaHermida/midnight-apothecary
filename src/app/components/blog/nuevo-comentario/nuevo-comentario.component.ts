import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
  }


 /*  async verificarAdmin(){
    const rol = await this.authenticationService.getCurrentUserRole();
    if( rol === "admin"){
      return true;
    }else{
      return false;
    }
  } */

  async guardarComentario(){
    const userId = await this.authenticationService.getCurrentUserId();
    const comentario = this.formulario.controls['comentario'].value;

    this.comentariosService.postComentario(comentario, userId)
  }

}
