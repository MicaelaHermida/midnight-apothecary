import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaPageComponent } from './tienda-page.component';
import { ListarProductosComponent } from 'src/app/components/tienda/listar-productos/listar-productos.component';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TiendaPageComponent, ListarProductosComponent],
  imports: [
    CommonModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: TiendaPageComponent }])
  ],
  exports: [CommonModule]
})
export class TiendaPageModule { }
