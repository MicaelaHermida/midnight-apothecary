import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CarritoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CarritoComponent]
})
export class CarritoModule { }
