import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { InfoBrujaPageComponent } from './info-bruja-page.component';
import { BrujaInfoComponent } from 'src/app/components/blog/brujas/bruja-info/bruja-info.component';
import { NuevoComentarioComponent } from 'src/app/components/blog/comentarios/nuevo-comentario/nuevo-comentario.component';
import { ListarComentariosComponent } from 'src/app/components/blog/comentarios/listar-comentarios/listar-comentarios.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [InfoBrujaPageComponent, BrujaInfoComponent, NuevoComentarioComponent, ListarComentariosComponent],
  imports: [
    CommonModule,
    FooterModule,
    ReactiveFormsModule
  ]
})
export class InfoBrujaPageModule { }
