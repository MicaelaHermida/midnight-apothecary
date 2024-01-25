import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/components/shared/footer/footer.module';
import { LoginPageComponent } from './login-page.component';
import { LoginComponent } from 'src/app/components/usuarios/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LoginPageComponent, LoginComponent],
  imports: [
    CommonModule,
    FooterModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: LoginPageComponent }])
  ]
})
export class LoginPageModule { }
