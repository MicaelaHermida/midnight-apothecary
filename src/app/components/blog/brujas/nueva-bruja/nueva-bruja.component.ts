import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bruja } from 'src/app/interfaces/brujas.interface';
import { BrujasService } from 'src/app/services/brujas.service';

@Component({
  selector: 'app-nueva-bruja',
  templateUrl: './nueva-bruja.component.html',
  styleUrls: ['./nueva-bruja.component.css']
})
export class NuevaBrujaComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private brujasService: BrujasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
   
  }


  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      apellido: ['', [Validators.required, Validators.maxLength(30)]],
      fecha_nacimiento: [''],
      fecha_defuncion: [''],
      tipo_de_muerte: ['', [Validators.required, Validators.maxLength(30)]],
      lugar_de_nacimiento: ['', [Validators.required, Validators.maxLength(30)]],
      lugar_de_ejecucion: ['', [Validators.required, Validators.maxLength(30)]],
      imagen: [''],
      historia: ['']
    });
  }

  async guardarBruja(){
    if (this.formulario.invalid) return;
    this.fechaPorDefecto();

    if (this.formulario.invalid){
      alert('Debe completar los campos requeridos');
      this.formulario.markAllAsTouched();
      return;
    }
    await this.brujasService.postBruja(this.formulario.value);

    alert('Bruja agregada con éxito');
    this.router.navigate(['/blog']);
  }

  validate(field: string, error: string): boolean {
    const isInvalid = this.formulario.controls[field].hasError(error) &&
      (this.formulario.controls[field].touched || this.formulario.controls[field].dirty);

    return isInvalid;
  }

  fechaPorDefecto(){ 
    if(this.formulario.value.fecha_nacimiento == ""){
      this.formulario.value.fecha_nacimiento = "n/a";
    }
    if(this.formulario.value.fecha_defuncion == ""){
      this.formulario.value.fecha_defuncion = "n/a";
    }
  }

}


/*   guardarBruja() {
    if (this.formulario.invalid) return;

    this.brujasService.postBruja(this.formulario.value)
    .subscribe({
      next: (bruja) => {
        alert(`${bruja.nombre} ${bruja.apellido} se agregó con éxito.`);
        this.router.navigate(['/blog']);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
 */