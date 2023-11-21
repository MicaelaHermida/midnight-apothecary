import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bruja } from 'src/app/interfaces/brujas.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BrujasService } from 'src/app/services/brujas.service';

@Component({
  selector: 'app-listar-brujas',
  templateUrl: './listar-brujas.component.html',
  styleUrls: ['./listar-brujas.component.css']
})
export class ListarBrujasComponent implements OnInit {

  isAdmin: boolean = false;

  listadoBrujas: Map<string, Bruja> = new Map();

  formulario: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fecha_nacimiento: ['', Validators.required],
    fecha_defuncion: ['', Validators.required],
    tipo_de_muerte: ['', Validators.required],
    lugar_de_nacimiento: ['', Validators.required],
    lugar_de_ejecucion: ['', Validators.required],
  });

  constructor(
    private brujasService: BrujasService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    await this.authenticationService.waitForFirebaseAuthentication();
    this.verificarUsuario();
    await this.mostrarBrujas();
  }

  async verificarUsuario() {
    const rol = await this.authenticationService.getCurrentUserRole();
    if (rol === "admin") {
      this.isAdmin = true;
    }
  }

  initForm(bruja: Bruja) {
    if (bruja) {
      this.formulario = this.formBuilder.group({
        nombre: [bruja.nombre],
        apellido: [bruja.apellido],
        fecha_nacimiento: [bruja.fecha_nacimiento],
        fecha_defuncion: [bruja.fecha_defuncion],
        tipo_de_muerte: [bruja.tipo_de_muerte],
        lugar_de_nacimiento: [bruja.lugar_de_nacimiento],
        lugar_de_ejecucion: [bruja.lugar_de_ejecucion],
      });
    }
  }

  async mostrarBrujas() {
    this.listadoBrujas = await this.brujasService.getBrujas();
    console.log(this.listadoBrujas);
  }

  async eliminarBruja(id: string) {
    const ok = confirm("¿Está seguro que desea eliminar la bruja?");
    if (!ok) return;

    await this.brujasService.deleteBruja(id);
    await this.mostrarBrujas();
  }

}

