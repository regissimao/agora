import { Component } from '@angular/core';
import {MensagensHandlerComponent} from "../mensagens-handler/mensagens-handler.component";
import {MensagensHandlerService} from "../mensagens-handler/mensagens-handler.service";

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    MensagensHandlerComponent
  ],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent {

  constructor( private mensagensHandlerService: MensagensHandlerService ) {}

  ngOnInit() {
    const state = window.history.state;
    if (state && state.mensagemSucesso) {
      // this.snackBar.open(state.mensagemSucesso, 'Fechar', { duration: 3000 });
      // this.mensagensHandlerService.mostrarMensagemDeSucesso(state.mensagemSucesso);
    }
  }

}
