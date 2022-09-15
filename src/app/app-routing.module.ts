import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { Pagina1Component } from './components/pagina1/pagina1.component';
import { Pagina2Component } from './components/pagina2/pagina2.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaPrincipalComponent,
    data: { title: 'Página Principal' }
  },
  {
    path: 'pagina1',
    component: Pagina1Component,
    data: { title: 'Pagina 1' }
  },
  {
    path: 'pagina2',
    component: Pagina2Component,
    data: { title: 'Página 2' }
  }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
