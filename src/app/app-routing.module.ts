import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BlogPageComponent } from './pages/blog/blog-page/blog-page.component';
import { InfoBrujaPageComponent } from './pages/blog/info-bruja-page/info-bruja-page.component';
import { NuevaBrujaPageComponent } from './pages/blog/nueva-bruja-page/nueva-bruja-page.component';
import { LoginPageComponent } from './pages/usuarios/login-page/login-page.component';
import { RegistroPageComponent } from './pages/usuarios/registro-page/registro-page.component';
import { TiendaPageComponent } from './pages/tienda/tienda-page/tienda-page.component';
import { ProductoInfoPageComponent } from './pages/tienda/producto-info-page/producto-info-page.component';
import { CompraPageComponent } from './pages/tienda/compra-page/compra-page.component';
import { CarritoPageComponent } from './pages/tienda/carrito-page/carrito-page.component';
import { UsuarioInfoPageComponent } from './pages/usuarios/usuario-info-page/usuario-info-page.component';
import { ListarComprasPageComponent } from './pages/usuarios/listar-compras-page/listar-compras-page.component';
import { NuevoProductoPageComponent } from './pages/tienda/nuevo-producto-page/nuevo-producto-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { VentasPageComponent } from './pages/admin-page/ventas-page/ventas-page.component';

const routes: Routes = [
  {path: 'admin', component: AdminPageComponent},
  {path: 'blog', component: BlogPageComponent},
  {path: 'info-bruja/:key', component: InfoBrujaPageComponent},
  {path: 'nueva-bruja', component: NuevaBrujaPageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegistroPageComponent},
  {path: 'tienda', component: TiendaPageComponent},
  {path: 'producto/:key', component: ProductoInfoPageComponent},
  {path: 'carrito', component: CarritoPageComponent},
  {path: 'compra', component: CompraPageComponent},
  {path: 'usuario', component: UsuarioInfoPageComponent},
  {path: 'compras', component: ListarComprasPageComponent},
  {path: 'ventas', component: VentasPageComponent},
  {path: 'nuevo-producto', component: NuevoProductoPageComponent},
  {path: "**", redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
