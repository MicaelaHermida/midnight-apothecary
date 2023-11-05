import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RegistroComponent } from './components/usuarios/registro/registro.component';
import { EditarUsuarioComponent } from './components/usuarios/editar-usuario/editar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrujaInfoComponent } from './components/blog/bruja-info/bruja-info.component';
import { EditarBrujaComponent } from './components/blog/editar-bruja/editar-bruja.component';
import { ListarBrujasComponent } from './components/blog/listar-brujas/listar-brujas.component';
import { NuevaBrujaComponent } from './components/blog/nueva-bruja/nueva-bruja.component';
import { ListarComentariosComponent } from './components/blog/listar-comentarios/listar-comentarios.component';
import { ContactoComponent } from './components/home/contacto/contacto.component';
import { HeroComponent } from './components/home/hero/hero.component';
import { NosotrasComponent } from './components/home/nosotras/nosotras.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CarritoComponent } from './components/tienda/carrito/carrito.component';
import { ListarProductosComponent } from './components/tienda/listar-productos/listar-productos.component';
import { PasarelaPagoComponent } from './components/tienda/pasarela-pago/pasarela-pago.component';
import { InfoProductoComponent } from './components/tienda/info-producto/info-producto.component';
import { UsuarioInfoComponent } from './components/usuarios/usuario-info/usuario-info.component';
import { BlogBrujaPageComponent } from './pages/blog/blog-bruja-page/blog-bruja-page.component';
import { BlogPageComponent } from './pages/blog/blog-page/blog-page.component';
import { EditarBrujaPageComponent } from './pages/blog/editar-bruja-page/editar-bruja-page.component';
import { NuevaBrujaPageComponent } from './pages/blog/nueva-bruja-page/nueva-bruja-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CompraPageComponent } from './pages/tienda/compra-page/compra-page.component';
import { TiendaPageComponent } from './pages/tienda/tienda-page/tienda-page.component';
import { EditarUsuarioPageComponent } from './pages/usuarios/editar-usuario-page/editar-usuario-page.component';
import { LoginPageComponent } from './pages/usuarios/login-page/login-page.component';
import { RegistroPageComponent } from './pages/usuarios/registro-page/registro-page.component';
import { UsuarioInfoPageComponent } from './pages/usuarios/usuario-info-page/usuario-info-page.component';
import { NuevoComentarioComponent } from './components/blog/nuevo-comentario/nuevo-comentario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    EditarUsuarioComponent,
    BrujaInfoComponent,
    EditarBrujaComponent,
    ListarBrujasComponent,
    NuevaBrujaComponent,
    ListarComentariosComponent,
    ContactoComponent,
    HeroComponent,
    NosotrasComponent,
    FooterComponent,
    NavbarComponent,
    CarritoComponent,
    ListarProductosComponent,
    PasarelaPagoComponent,
    InfoProductoComponent,
    UsuarioInfoComponent,
    BlogBrujaPageComponent,
    BlogPageComponent,
    EditarBrujaPageComponent,
    NuevaBrujaPageComponent,
    HomePageComponent,
    CompraPageComponent,
    TiendaPageComponent,
    EditarUsuarioPageComponent,
    LoginPageComponent,
    RegistroPageComponent,
    UsuarioInfoPageComponent,
    NuevoComentarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
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
