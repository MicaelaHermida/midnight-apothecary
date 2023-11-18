import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuscripcionService } from 'src/app/services/suscripcion.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  formulario: FormGroup = this.formBuilder.group({
    email: ['', Validators.email]
  });

  constructor(
    private formBuilder: FormBuilder,
    private suscripcionService: SuscripcionService
  ) { }


  suscribirse(): void {
    if (this.formulario.invalid){
      this.formulario.reset();
      alert('Email inválido. :(.');
      return;
    } 
    const suscripcion = this.formulario.value;

    this.suscripcionService.postSuscripcion(suscripcion).subscribe({
      next: () => {
        this.formulario.reset();
        alert('¡Gracias por suscribirte! ♥');
      },
      error: (e) => {
        console.log(e);
        alert('Email inválido. Intente nuevamente.');
      }
    });
  } 


}


