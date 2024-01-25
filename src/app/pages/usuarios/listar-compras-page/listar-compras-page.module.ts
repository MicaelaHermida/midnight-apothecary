import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { ListarComprasPageComponent } from './listar-compras-page.component';
import { ListarComprasComponent } from 'src/app/components/usuarios/listar-compras/listar-compras.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListarComprasPageComponent, ListarComprasComponent],
  imports: [
    CommonModule,
    FooterModule,
    FormsModule
  ]
})
export class ListarComprasPageModule { }
