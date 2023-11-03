import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { InfoProductoComponent } from './components/tienda/info-producto/info-producto.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'info-producto', component: InfoProductoComponent},
  {path: "**", redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
