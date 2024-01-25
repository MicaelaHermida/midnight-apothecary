import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HeroComponent } from 'src/app/components/home/hero/hero.component';
import { NosotrasComponent } from 'src/app/components/home/nosotras/nosotras.component';
import { ContactoComponent } from 'src/app/components/home/contacto/contacto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';



@NgModule({
  declarations: [HomePageComponent, HeroComponent, NosotrasComponent, ContactoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FooterModule
  ]
})
export class HomePageModule { }
