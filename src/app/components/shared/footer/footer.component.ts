import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private suscripcionService: SuscripcionService,
    private router: Router
  ) { }


  suscribirse(): void {
    if (this.formulario.invalid){
      this.formulario.reset();
      alert('Email inválido. :(.');
      return;
    } 
    const suscripcion = this.formulario.value;

    this.suscripcionService.postSuscripcion(suscripcion).subscribe({
      next: (suscripcion:any) => {
        this.formulario.reset();
        alert('¡Gracias por suscribirte! ♥');
      },
      error: (e:any) => {
        console.log(e);
        alert('Email inválido. Intente nuevamente.');
      }
    });
  } 

  onLinkClick(route: string): void{
    console.log('Clic en enlace:', route);

    this.router.navigateByUrl(`/${route}`)
    .then(() => {
      window.location.href = window.location.href;
    })
    .catch(error =>{
      console.log('error de navegación:', error);
    });
  }

}


