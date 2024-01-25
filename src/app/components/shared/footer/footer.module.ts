import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
