import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BlogPageComponent } from './pages/blog/blog-page/blog-page.component';
import { BlogBrujaPageComponent } from './pages/blog/blog-bruja-page/blog-bruja-page.component';
import { EditarBrujaPageComponent } from './pages/blog/editar-bruja-page/editar-bruja-page.component';
import { NuevaBrujaPageComponent } from './pages/blog/nueva-bruja-page/nueva-bruja-page.component';

const routes: Routes = [
 /*  {path: 'home', component: HomePageComponent}, */
  {path: 'blog', component: BlogPageComponent},
  {path: 'blog-bruja/:id', component: BlogBrujaPageComponent},
  {path: 'editar-bruja/:id', component: EditarBrujaPageComponent},
  {path: 'nueva-bruja', component: NuevaBrujaPageComponent},

  {path: "**", redirectTo: 'blog' /* redirectTo: 'home' */}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
