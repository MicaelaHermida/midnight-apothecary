import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bruja } from 'src/app/interfaces/brujas.interface';
import { BrujasService } from 'src/app/services/brujas.service';

@Component({
  selector: 'app-editar-bruja',
  templateUrl: './editar-bruja.component.html',
  styleUrls: ['./editar-bruja.component.css']
})
export class EditarBrujaComponent implements OnInit {

  bruja: Bruja | any;

  formulario: FormGroup = this.formBuilder.group({
    editId: ['', Validators.required],
    editNombre: ['', Validators.required],
    editApellido: ['', Validators.required],
    editFechaNac: ['', Validators.required],
    editFechaDef: ['', Validators.required],
    editTipoMuerte: ['', Validators.required],
    editLugarNac: ['', Validators.required],
    editLugarEjec: ['', Validators.required],
    editImagen: ['', Validators.required],
    editHistoria: ['', Validators.required]
  })

  constructor(
    private brujasService: BrujasService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.route.params.subscribe(params => {
      const brujaId = +params['id'];

      if (!isNaN(brujaId)) {
        this.brujasService.getBruja(brujaId).subscribe({
          next: (bruja) => {
            console.log(bruja);
            if (bruja) {
              this.formulario = this.formBuilder.group({
                editId: [bruja.id],
                editNombre: [bruja.nombre],
                editApellido: [bruja.apellido],
                editFechaNac: [bruja.fecha_nacimiento],
                editFechaDef: [bruja.fecha_defuncion],
                editTipoMuerte: [bruja.tipo_de_muerte],
                editLugarNac: [bruja.lugar_de_nacimiento],
                editLugarEjec: [bruja.lugar_de_ejecucion],
                editImagen: [bruja.imagen],
                editHistoria: [bruja.historia]
              })
            }
          },
          error: (e) => {
            console.log(e);
          }
        })
      } else {
        console.log("ID no válido");
      }
    })
  }

  editarBruja() {
    if (this.formulario.invalid) return;

    const bruja: Bruja = {
      id: this.formulario.controls['editId'].value,
      nombre: this.formulario.controls['editNombre'].value,
      apellido: this.formulario.controls['editApellido'].value,
      fecha_nacimiento: this.formulario.controls['editFechaNac'].value,
      fecha_defuncion: this.formulario.controls['editFechaDef'].value,
      tipo_de_muerte: this.formulario.controls['editTipoMuerte'].value,
      lugar_de_nacimiento: this.formulario.controls['editLugarNac'].value,
      lugar_de_ejecucion: this.formulario.controls['editLugarEjec'].value,
      imagen: this.formulario.controls['editImagen'].value, 
      historia: this.formulario.controls['editHistoria'].value      
    }

    this.brujasService.putBruja(bruja).subscribe({
      next: () => {
        this.router.navigate(['/blog']);
      },
      error: (e) => {
        console.log(e);
      }
    });

  }








}
