import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { RegistroPageComponent } from './registro-page.component';
import { RegistroComponent } from 'src/app/components/usuarios/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [RegistroPageComponent, RegistroComponent],
  imports: [
    CommonModule,
    FooterModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: RegistroPageComponent }])
  ]
})
export class RegistroPageModule { }
