import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ResumoPedidoComponent } from './resumo-pedido/resumo-pedido.component';
import {VisualizarLivroComponent } from './visualizar-livro/visualizar-livro.component';

export const routes: Routes = [
  {path: 'pagina-inicial', component: PaginaInicialComponent},
  {path: 'logar', component: LoginComponent},
  {path: 'resumo-pedido', component: ResumoPedidoComponent},
  {path: 'visualizar-livro', component: VisualizarLivroComponent},
  {path: '', redirectTo: 'logar', pathMatch: 'full'}
];
