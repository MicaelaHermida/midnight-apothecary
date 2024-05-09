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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrujaInfoComponent } from './components/blog/brujas/bruja-info/bruja-info.component';
import { ListarBrujasComponent } from './components/blog/brujas/listar-brujas/listar-brujas.component';
import { NuevaBrujaComponent } from './components/blog/brujas/nueva-bruja/nueva-bruja.component';
import { ListarComentariosComponent } from './components/blog/comentarios/listar-comentarios/listar-comentarios.component';
import { ContactoComponent } from './components/home/contacto/contacto.component';
import { NosotrasComponent } from './components/home/nosotras/nosotras.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CarritoComponent } from './components/tienda/carrito/carrito.component';
import { ListarProductosComponent } from './components/tienda/listar-productos/listar-productos.component';
import { PasarelaPagoComponent } from './components/tienda/pasarela-pago/pasarela-pago.component';
import { InfoProductoComponent } from './components/tienda/info-producto/info-producto.component';
import { UsuarioInfoComponent } from './components/usuarios/usuario-info/usuario-info.component';
import { InfoBrujaPageComponent } from './pages/blog/info-bruja-page/info-bruja-page.component';
import { BlogPageComponent } from './pages/blog/blog-page/blog-page.component';
import { NuevaBrujaPageComponent } from './pages/blog/nueva-bruja-page/nueva-bruja-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CompraPageComponent } from './pages/tienda/compra-page/compra-page.component';
import { TiendaPageComponent } from './pages/tienda/tienda-page/tienda-page.component';
import { LoginPageComponent } from './pages/usuarios/login-page/login-page.component';
import { RegistroPageComponent } from './pages/usuarios/registro-page/registro-page.component';
import { UsuarioInfoPageComponent } from './pages/usuarios/usuario-info-page/usuario-info-page.component';
import { ProductoInfoPageComponent } from './pages/tienda/producto-info-page/producto-info-page.component';
import { NuevoComentarioComponent } from './components/blog/comentarios/nuevo-comentario/nuevo-comentario.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { CarritoPageComponent } from './pages/tienda/carrito-page/carrito-page.component';
import { ListarComprasComponent } from './components/usuarios/listar-compras/listar-compras.component';
import { ListarComprasPageComponent } from './pages/usuarios/listar-compras-page/listar-compras-page.component';
import { HeroComponent } from './components/home/hero/hero.component';
import { NuevoProductoComponent } from './components/tienda/nuevo-producto/nuevo-producto.component';
import { NuevoProductoPageComponent } from './pages/tienda/nuevo-producto-page/nuevo-producto-page.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { environment } from './environment/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    BrujaInfoComponent,
    ListarBrujasComponent,
    NuevaBrujaComponent,
    ListarComentariosComponent,
    ContactoComponent,
    NosotrasComponent,
    FooterComponent,
    NavbarComponent,
    CarritoComponent,
    ListarProductosComponent,
    PasarelaPagoComponent,
    InfoProductoComponent,
    UsuarioInfoComponent,
    InfoBrujaPageComponent,
    BlogPageComponent,
    NuevaBrujaPageComponent,
    HomePageComponent,
    CompraPageComponent,
    TiendaPageComponent,
    LoginPageComponent,
    RegistroPageComponent,
    UsuarioInfoPageComponent,
    ProductoInfoPageComponent,
    NuevoComentarioComponent,
    HeaderComponent,
    CarritoPageComponent,
    ListarComprasComponent,
    ListarComprasPageComponent,
    HeroComponent,
    NuevoProductoComponent,
    NuevoProductoPageComponent,
    AdminComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: environment.PROJECT_API_KEY,
      authDomain: environment.AUTH_DOMAIN,
      projectId: environment.PROJECT_ID,
      storageBucket: environment.STORAGE_BUCKET,
      messagingSenderId: environment.MESSAGING_SENDER_ID,
      appId: environment.APP_ID
    })),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
