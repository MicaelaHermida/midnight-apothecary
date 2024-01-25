import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { NuevaBrujaPageComponent } from './nueva-bruja-page.component';
import { NuevaBrujaComponent } from 'src/app/components/blog/brujas/nueva-bruja/nueva-bruja.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NuevaBrujaPageComponent, NuevaBrujaComponent],
  imports: [
    CommonModule,
    FooterModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: NuevaBrujaPageComponent }])
  ]
})
export class NuevaBrujaPageModule { }
