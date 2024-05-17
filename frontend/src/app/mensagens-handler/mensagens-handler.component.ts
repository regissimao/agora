import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MensagensHandlerService } from './mensagens-handler.service';
import { Mensagem } from './mensagem.model';

@Component({
  selector: 'app-mensagens-handler',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './mensagens-handler.component.html',
  styleUrl: './mensagens-handler.component.css'
})
export class MensagensHandlerComponent implements OnInit, OnDestroy {

  @Output() atualizar = new EventEmitter();

  mensagem: Mensagem = new Mensagem();
  subscriptionMensagens$: Subscription | undefined;

  constructor(
    private mensagensHandlerService: MensagensHandlerService
  ) { }

  ngOnInit() {

    this.subscriptionMensagens$ =
      this.mensagensHandlerService.mensagemEmiter.
        subscribe(dados => {
            this.mensagem = dados;
        });
  }

  resetMensagens() {
    this.mensagensHandlerService.resetMensagens();
  }

  ngOnDestroy() {
    if (this.subscriptionMensagens$) {
      this.subscriptionMensagens$.unsubscribe();
    }
  }
}
