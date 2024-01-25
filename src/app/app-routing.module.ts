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

const routes: Routes = [
  {path: 'blog', loadChildren: () => import('./pages/blog/blog-page/blog-page.module').then(m => m.BlogPageModule)},
  {path: 'info-bruja/:key', loadChildren: () => import('./pages/blog/info-bruja-page/info-bruja-page.module').then(m => m.InfoBrujaPageModule)},
  {path: 'nueva-bruja', loadChildren: () => import('./pages/blog/nueva-bruja-page/nueva-bruja-page.module').then(m => m.NuevaBrujaPageModule)},
  {path: 'home', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)},
  {path: 'login', loadChildren: () => import('./pages/usuarios/login-page/login-page.module').then(m => m.LoginPageModule)},
  {path: 'register', loadChildren: () => import('./pages/usuarios/registro-page/registro-page.module').then(m => m.RegistroPageModule)},
  {path: 'tienda', loadChildren: () => import('./pages/tienda/tienda-page/tienda-page.module').then(m => m.TiendaPageModule)},
  {path: 'producto/:key', loadChildren: () => import('./pages/tienda/producto-info-page/producto-info-page.module').then(m => m.ProductoInfoPageModule)},
  {path: 'carrito', loadChildren: () => import('./pages/tienda/carrito-page/carrito-page.module').then(m => m.CarritoPageModule)},
  {path: 'compra', loadChildren: () => import('./pages/tienda/compra-page/compra-page.module').then(m => m.CompraPageModule)},
  {path: 'usuario', loadChildren: () => import('./pages/usuarios/usuario-info-page/usuario-info-page.module').then(m => m.UsuarioInfoPageModule)},
  {path: 'compras', loadChildren: () => import('./pages/usuarios/listar-compras-page/listar-compras-page.module').then(m => m.ListarComprasPageModule)},
  {path: 'nuevo-producto', loadChildren: () => import('./pages/tienda/nuevo-producto-page/nuevo-producto-page.module').then(m => m.NuevoProductoPageModule)},
  {path: "**", redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
