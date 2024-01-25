import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { LoginPageComponent } from './login-page.component';
import { LoginComponent } from 'src/app/components/usuarios/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginPageComponent, LoginComponent],
  imports: [
    CommonModule,
    FooterModule,
    ReactiveFormsModule
  ]
})
export class LoginPageModule { }
