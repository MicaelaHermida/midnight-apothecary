import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { CarritoPageComponent } from './carrito-page.component';
import { CarritoModule } from 'src/app/components/tienda/carrito/carrito.module';



@NgModule({
  declarations: [CarritoPageComponent],
  imports: [
    CommonModule,
    FooterModule,
    CarritoModule
  ]
})
export class CarritoPageModule { }
