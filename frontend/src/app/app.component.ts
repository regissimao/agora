import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './component/login/login.component';
import { ResumoPedidoComponent } from './component/resumo-pedido/resumo-pedido.component';
import { QuantidadeComponent } from '../componentes/quantidade/quantidade.component';
import {VisualizarLivroComponent } from './component/visualizar-livro/visualizar-livro.component';
import {NavigationComponent} from "./navigation/navigation.component";
import {MensagensHandlerComponent} from "./mensagens-handler/mensagens-handler.component";

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
    VisualizarLivroComponent,
    NavigationComponent,
    MensagensHandlerComponent
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'Ágora';
}
