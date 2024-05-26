import { Injectable, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Mensagem } from './mensagem.model';

@Injectable({
  providedIn: 'root'
})
export class MensagensHandlerService {

  mensagemDeErroEmiter = new EventEmitter<Mensagem>();
  mensagemDeSucessoEmiter = new EventEmitter<Mensagem>();

  mensagemEmiter = new EventEmitter<Mensagem>();

  constructor(
    private router: Router
  ) {}

  handleError = (error: HttpErrorResponse): Observable<HttpErrorResponse> => {

    const errorArr = error.error;
    console.log(error.status);

    if (error.status === 440 || error.status === 401 || error.status === 503 || error.status === 406) { // Erro de Negócio
      throw errorArr;
    } else {
      this.router.navigateByUrl('/erro-geral');
      throw null;
    }
  }

  mostrarMensagemDeSucesso(mensagem: string) {
    this.emitirMensagem(1, mensagem);
  }

  mostrarMensagemDeErro(mensagem: string) {
    this.emitirMensagem(2, mensagem);
  }

  mostrarMensagemDeAlerta(mensagem: string) {
    this.emitirMensagem(3, mensagem);
  }

  private emitirMensagem(tipo: number, mensagem: string) {

    const mensagemModel = new Mensagem();
    mensagemModel.tipo = tipo;
    mensagemModel.mensagem = mensagem;
    this.mensagemEmiter.emit(mensagemModel);
  }

  resetMensagens() {

    this.mensagemDeErroEmiter.emit(new Mensagem());
    this.mensagemDeSucessoEmiter.emit(new Mensagem());

    const mensagemModel = new Mensagem();
    mensagemModel.tipo = 0;
    mensagemModel.mensagem = "";
    this.mensagemEmiter.emit(mensagemModel);
  }
}
