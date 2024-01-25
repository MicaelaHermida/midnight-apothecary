import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { NuevoProductoPageComponent } from './nuevo-producto-page.component';
import { NuevoProductoComponent } from 'src/app/components/tienda/nuevo-producto/nuevo-producto.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [NuevoProductoPageComponent, NuevoProductoComponent],
  imports: [
    CommonModule,
    FooterModule,
    ReactiveFormsModule
  ]
})
export class NuevoProductoPageModule { }
