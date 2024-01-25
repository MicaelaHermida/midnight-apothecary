import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { HomePageModule } from './pages/home-page/home-page.module';
import { BlogPageModule } from './pages/blog/blog-page/blog-page.module';
import { InfoBrujaPageModule } from './pages/blog/info-bruja-page/info-bruja-page.module';
import { NuevaBrujaPageModule } from './pages/blog/nueva-bruja-page/nueva-bruja-page.module';
import { CarritoPageModule } from './pages/tienda/carrito-page/carrito-page.module';
import { CompraPageModule } from './pages/tienda/compra-page/compra-page.module';
import { NuevoProductoPageModule } from './pages/tienda/nuevo-producto-page/nuevo-producto-page.module';
import { ProductoInfoPageModule } from './pages/tienda/producto-info-page/producto-info-page.module';
import { TiendaPageModule } from './pages/tienda/tienda-page/tienda-page.module';
import { ListarComprasPageModule } from './pages/usuarios/listar-compras-page/listar-compras-page.module';
import { LoginPageModule } from './pages/usuarios/login-page/login-page.module';
import { RegistroPageModule } from './pages/usuarios/registro-page/registro-page.module';
import { UsuarioInfoPageModule } from './pages/usuarios/usuario-info-page/usuario-info-page.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomePageModule,
    BlogPageModule,
    InfoBrujaPageModule,
    NuevaBrujaPageModule,
    CarritoPageModule,
    CompraPageModule,
    NuevoProductoPageModule,
    ProductoInfoPageModule,
    TiendaPageModule,
    ListarComprasPageModule,
    LoginPageModule,
    RegistroPageModule,
    UsuarioInfoPageModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyATu1q9xijreEeDRChL_u7mSDXibkuLHXc",
      authDomain: "midnight-apothecary.firebaseapp.com",
      projectId: "midnight-apothecary",
      storageBucket: "midnight-apothecary.appspot.com",
      messagingSenderId: "645627604949",
      appId: "1:645627604949:web:2ed2e0e6a4522bf60c175c"
    })),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
