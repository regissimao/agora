import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import {CadastrarLivroComponent} from "./cadastrar-livro/cadastrar-livro/cadastrar-livro.component";
import {AuthGuard} from "./auth/auth.guard";

export const routes: Routes = [
  {path: 'pagina-inicial', component: PaginaInicialComponent},
  {path: 'logar', component: LoginComponent},
  {path: '', redirectTo: 'logar', pathMatch: 'full'},
  {path: 'cadastrar-livro', component: CadastrarLivroComponent, canActivate: [AuthGuard]},
];
