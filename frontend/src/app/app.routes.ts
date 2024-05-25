import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro.component';

export const routes: Routes = [
  {path: 'pagina-inicial', component: PaginaInicialComponent},
  {path: 'logar', component: LoginComponent},
  {path: '', redirectTo: 'logar', pathMatch: 'full'},
  {path: 'cadastro-usuario', component: CadastroUsuarioComponent},
];
