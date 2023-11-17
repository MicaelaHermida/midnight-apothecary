import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  formulario: FormGroup = this.formBuilder.group({
    email: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {  }


  suscribirse():void{
    this.formulario.reset();
    alert('Gracias por suscribirte! ♥');
    
  }

}
