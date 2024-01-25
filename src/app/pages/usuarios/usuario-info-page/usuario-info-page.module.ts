import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { UsuarioInfoComponent } from 'src/app/components/usuarios/usuario-info/usuario-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioInfoPageComponent } from './usuario-info-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UsuarioInfoPageComponent, UsuarioInfoComponent],
  imports: [
    CommonModule,
    FooterModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: UsuarioInfoPageComponent }])
  ]
})
export class UsuarioInfoPageModule { }
