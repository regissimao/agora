import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ResumoCompraComponent } from './resumo-compra/resumo-compra.component';

export const routes: Routes = [
  {path: 'pagina-inicial', component: PaginaInicialComponent},
  {path: 'logar', component: LoginComponent},
  {path: 'resumo-compra', component: ResumoCompraComponent},
  {path: '', redirectTo: 'logar', pathMatch: 'full'}
];
