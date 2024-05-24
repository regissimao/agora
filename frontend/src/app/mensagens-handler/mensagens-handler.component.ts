import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MensagensHandlerService } from './mensagens-handler.service';
import { Mensagens } from './mensagens.model';

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

  mensagens: Mensagens = new Mensagens();
  subscriptionMensagens$: Subscription | undefined;

  constructor(
    private router: Router,
    private mensagensHandlerService: MensagensHandlerService
  ) { }

  ngOnInit() {

    this.subscriptionMensagens$ =
      this.mensagensHandlerService.mensagensEmiter.
        subscribe(dados => {
            this.mensagens = dados;
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
