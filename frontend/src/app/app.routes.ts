import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ResumoPedidoComponent } from './resumo-pedido/resumo-pedido.component';
import {VisualizarLivroComponent } from './visualizar-livro/visualizar-livro.component';
import { CadastrarLivroComponent } from './component/cadastrar-livro/cadastrar-livro.component';
import {AuthGuard} from "./auth/auth.guard";
import { GerenciarEstoqueComponent } from './component/gerenciar-estoque/gerenciar-estoque.component';
import { EditarLivroComponent } from './component/editar-livro/editar-livro.component';

export const routes: Routes = [
  {path: 'pagina-inicial', component: PaginaInicialComponent},
  {path: 'logar', component: LoginComponent},
  {path: 'resumo-pedido', component: ResumoPedidoComponent},
  {path: 'visualizar-livro/:isbn', component: VisualizarLivroComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'logar', pathMatch: 'full'},
  { path: 'cadastrar-livro', component: CadastrarLivroComponent, canActivate: [AuthGuard] },
  { path: 'gerenciar-estoque', component: GerenciarEstoqueComponent, canActivate: [AuthGuard] },
  { path: 'editar-livro/:id', component: EditarLivroComponent, canActivate: [AuthGuard] }
];
