import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { LivrosCompradosComponent } from './livros-comprados/livros-comprados.component';

export const routes: Routes = [
  {path: 'pagina-inicial', component: PaginaInicialComponent},
  {path: 'livros-comprados', component: LivrosCompradosComponent},
  {path: 'logar', component: LoginComponent},
  {path: '', redirectTo: 'logar', pathMatch: 'full'}
];
