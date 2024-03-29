import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { BlogPageComponent } from './blog-page.component';
import { ListarBrujasComponent } from 'src/app/components/blog/brujas/listar-brujas/listar-brujas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BlogPageComponent, ListarBrujasComponent],
  imports: [CommonModule, FooterModule, ReactiveFormsModule, RouterModule.forChild([{ path: '', component: BlogPageComponent }])],
})
export class BlogPageModule {}
