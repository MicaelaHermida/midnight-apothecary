import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto } from 'src/app/interfaces/contacto.interface';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactoService: ContactoService
  ) {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.maxLength(30)],
      mensaje: ['', [Validators.required, Validators.maxLength(150)]]
    });
  }

  enviarContacto() {
    if (this.formulario.invalid){
      alert('Debe completar los campos requeridos');
      this.formulario.markAllAsTouched();
      return;
    }

    const contacto = this.formulario.value;

    console.log(contacto);
    this.contactoService.guardarContacto(contacto)
    .subscribe({
      next: () => {
        alert('Consulta enviada con éxito');
        this.formulario.reset();
      },
      error: (e) =>{
        console.log(e);
        alert('Error al enviar la consulta');
      }
    }); 
  }

  validate(field: string, error: string): boolean {
    const isInvalid = this.formulario.controls[field].hasError(error) &&
      (this.formulario.controls[field].touched || this.formulario.controls[field].dirty);

      
    return isInvalid;
  }

}
