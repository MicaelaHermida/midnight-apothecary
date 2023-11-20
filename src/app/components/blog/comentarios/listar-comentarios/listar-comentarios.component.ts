import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comentario } from 'src/app/interfaces/comentarios.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ComentariosService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-listar-comentarios',
  templateUrl: './listar-comentarios.component.html',
  styleUrls: ['./listar-comentarios.component.css']
})

export class ListarComentariosComponent implements OnInit {

  listadoComentarios: Map<string, Comentario> = new Map();
  comentariosOrdenados: Comentario[] = [];

  isAdmin: boolean = false;
  isLogged: boolean = false;
  firebaseAuthenticationReady: boolean = false;
  currentMapEditIndex: string = "";

  formulario: FormGroup = this.formBuilder.group({
    editComentario: ['', Validators.required]
  });

  editModeMap: Map<string, boolean> = new Map();
  constructor(
    private comentariosService: ComentariosService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isLogged = this.authenticationService.isUserLoggedIn();
    this.isAdmin = await this.authenticationService.getCurrentUserRole() === "admin";
    await this.mostrarComentarios();
  }

  initForm(comentario: Comentario) {
    this.formulario = this.formBuilder.group({
      editComentario: [comentario.comentario]
    });
  }

  async mostrarComentarios(): Promise<void> {
    this.listadoComentarios = await this.comentariosService.getComentariosBruja();
    this.ordenarComentarios();

    for (let comentario of this.comentariosOrdenados) {
      comentario.nombreUsuario = await this.authenticationService.getUserNameById(comentario.userId);
      this.editModeMap.set(comentario.id, false);
    }
  }

  ordenarComentarios(): void{
    this.comentariosOrdenados = [];
    for(let comentario of this.listadoComentarios.entries()){
      const coment = comentario[1];
      coment.id = comentario[0];
      this.comentariosOrdenados.push(coment);
    }
    console.log(this.comentariosOrdenados);

    this.comentariosOrdenados.sort((a, b) =>{
      const fechaA = new Date(a.fecha).getTime();
      const fechaB = new Date(b.fecha).getTime();
      return fechaA - fechaB;
    });

    console.log(this.comentariosOrdenados);
  }


  esUsuario(id: string): boolean {
    if (this.authenticationService.getCurrentUserId() === id) {
      return true;
    }
    return false;
  }


  //ADMIN Y USER DEL COMENTARIO
  async eliminarComentario(id: string): Promise<void> {
    console.log(id);
    const ok = confirm(`¿Realmente querés eliminar el comentario de id: ${id}`);
    if (!ok) return;

    await this.comentariosService.deleteComentario(id);
    console.log('comentario eliminado')
    await this.mostrarComentarios();
  }

  //USER DEL COMENTARIO
  editarComentario(id: string): void {
    this.editModeMap.set(this.currentMapEditIndex, false);
    this.currentMapEditIndex = id;
    this.cerrarTextAreaComentario();
    this.editModeMap.set(id, true);
    this.initForm(this.listadoComentarios.get(id)!);

    
    /* this.currentMapEditIndex = id;
    const currentEditMode = this.editModeMap.get(id);
    this.editModeMap.set(id, !currentEditMode);
    this.initForm(this.listadoComentarios.get(id)!); */
  }

  async guardarComentario(id: string): Promise<void> {
    const currentEditMode = this.editModeMap.get(id);
    let comentario: Comentario = await this.comentariosService.getComentario(id);

    if (!currentEditMode) return;

    if (this.formulario.controls['editComentario'].valid) {
      comentario.comentario = this.formulario.value.editComentario;
      await this.comentariosService.putComentario(id, comentario);
      this.editModeMap.set(id, false);
      await this.mostrarComentarios();
    }

  }

  cerrarTextAreaComentario() {
    this.editModeMap.set(this.currentMapEditIndex, false);
  }

  cancelarCambios(id: string): void{
    this.editModeMap.set(id, false);
  }



}