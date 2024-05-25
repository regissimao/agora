import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { ResumoPedidoComponent } from './resumo-pedido/resumo-pedido.component';
import { QuantidadeComponent } from '../componentes/quantidade/quantidade.component';
import {VisualizarLivroComponent } from './visualizar-livro/visualizar-livro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    CommonModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    LoginComponent,
    ResumoPedidoComponent,
    QuantidadeComponent,
    VisualizarLivroComponent
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'Ágora';
}
