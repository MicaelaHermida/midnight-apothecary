import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bruja } from 'src/app/interfaces/brujas.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BrujasService } from 'src/app/services/brujas.service';
import { ComentariosService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-bruja-info',
  templateUrl: './bruja-info.component.html',
  styleUrls: ['./bruja-info.component.css']
})
export class BrujaInfoComponent implements OnInit {

  editMode: boolean = false;
  isAdminRole: boolean = false;
  firebaseAuthenticationReady: boolean = false;
  bruja!: Bruja;
  brujaId: string = "";
  brujaCargada: boolean = false;

  formulario: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private brujasService: BrujasService,
    private comentariosService: ComentariosService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) { 
    this.formulario= this.formBuilder.group({
      editNombre: [''],
      editApellido: [''],
      editFechaNac: [''],
      editFechaDef: [''],
      editTipoMuerte: [''],
      editLugarNac: [''],
      editLugarEjec: [''],
      editImagen: [''],
      editHistoria: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    await this.authService.waitForFirebaseAuthentication();
    this.firebaseAuthenticationReady = true;
    this.isAdminRole = await this.authService.getCurrentUserRole() === 'admin';
    await this.initBio();
    await this.initForm();

  }

  async initForm() {
    this.route.params.subscribe(async params => {
      this.brujaId = params['key'];
      console.log(this.brujaId);

      if (this.brujaId) {
        this.bruja = await this.brujasService.getBruja(this.brujaId);
        console.log(this.bruja.nombre);

        if (this.bruja) {
          this.formulario = this.formBuilder.group({
            editNombre: [this.bruja.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern("[a-zA-Z' ]*")]],
            editApellido: [this.bruja.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern("[a-zA-Z' ]*")]] ,
            editFechaNac: [this.bruja.fecha_nacimiento, [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9/]*')]] ,
            editFechaDef: [this.bruja.fecha_defuncion, [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9/]*')]] ,
            editTipoMuerte: [this.bruja.tipo_de_muerte, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]] ,
            editLugarNac: [this.bruja.lugar_de_nacimiento, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]] ,
            editLugarEjec: [this.bruja.lugar_de_ejecucion, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
            editImagen: [this.bruja.imagen, [Validators.required, Validators.pattern('https?://.+')]],
            editHistoria: [this.bruja.historia, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
          });
        }
      }

    });
  }

  async initBio() {
    this.route.params.subscribe(async params => {
      const brujaId = params['key'];
      this.bruja = await this.brujasService.getBruja(brujaId);

      if (this.bruja) {
        this.comentariosService.brujaId = brujaId;
        this.brujaCargada = true;
        console.log(this.bruja);
      } else {
        console.log("error al cargar el ID");
      }

    })
  }

  async actualizarBruja(): Promise<void> {
    console.log(this.formulario.valid);
    if (this.formulario.invalid) return;

    this.bruja.nombre = this.formulario.controls['editNombre'].value;
    this.bruja.apellido = this.formulario.controls['editApellido'].value;
    this.bruja.fecha_nacimiento = this.formulario.controls['editFechaNac'].value;
    this.bruja.fecha_defuncion = this.formulario.controls['editFechaDef'].value;
    this.bruja.tipo_de_muerte = this.formulario.controls['editTipoMuerte'].value;
    this.bruja.lugar_de_nacimiento = this.formulario.controls['editLugarNac'].value;
    this.bruja.lugar_de_ejecucion = this.formulario.controls['editLugarEjec'].value;
    this.bruja.imagen = this.formulario.controls['editImagen'].value;
    this.bruja.historia = this.formulario.controls['editHistoria'].value;

    /*  const bruja: Bruja = {
       nombre: this.formulario.controls['editNombre'].value,
       apellido: this.formulario.controls['editApellido'].value,
       fecha_nacimiento: this.formulario.controls['editFechaNac'].value,
       fecha_defuncion: this.formulario.controls['editFechaDef'].value,
       tipo_de_muerte: this.formulario.controls['editTipoMuerte'].value,
       lugar_de_nacimiento: this.formulario.controls['editLugarNac'].value,
       lugar_de_ejecucion: this.formulario.controls['editLugarEjec'].value,
       imagen: this.formulario.controls['editImagen'].value, 
       historia: this.formulario.controls['editHistoria'].value      
     } */

    await this.brujasService.putBruja(this.brujaId, this.bruja);
    this.editMode = false;
    //reload page
    this.initBio();
    this.initForm();

  }

  activarEditMode() {
    this.editMode = true;
  }

  cancelarCambios() {
    this.initForm();
    this.editMode = false;
    return;
  }

  validate(field: string, error: string): boolean {
    const isInvalid = this.formulario.controls[field].hasError(error) &&
      (this.formulario.controls[field].touched || this.formulario.controls[field].dirty);

    return isInvalid;
  }

}

