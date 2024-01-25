import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraPageComponent } from './compra-page.component';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { PasarelaPagoComponent } from 'src/app/components/tienda/pasarela-pago/pasarela-pago.component';
import { CarritoModule } from 'src/app/components/tienda/carrito/carrito.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CompraPageComponent, PasarelaPagoComponent],
  imports: [
    CommonModule,
    FooterModule,
    CarritoModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CompraPageComponent }])
  ]
})
export class CompraPageModule { }
