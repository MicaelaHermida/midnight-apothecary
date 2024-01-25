import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { ProductoInfoPageComponent } from './producto-info-page.component';
import { InfoProductoComponent } from 'src/app/components/tienda/info-producto/info-producto.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProductoInfoPageComponent, InfoProductoComponent],
  imports: [
    CommonModule,
    FooterModule,
    FormsModule
  ]
})
export class ProductoInfoPageModule { }
