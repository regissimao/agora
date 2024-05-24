import { Injectable, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Mensagens } from './mensagens.model';

@Injectable({
  providedIn: 'root'
})
export class MensagensHandlerService {

  mensagensDeErroEmiter = new EventEmitter<String[]>();
  mensagemDeSucessoEmiter = new EventEmitter<String>();

  mensagensEmiter = new EventEmitter<Mensagens>();

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

  mostrarMensagensDeSucesso(mensagens: string[]) {
    this.emitirMensagens(1, mensagens);
  }

  mostrarMensagensDeErro(mensagens: string[]) {
    this.emitirMensagens(2, mensagens);
  }

  mostrarMensagensDeAlerta(mensagens: string[]) {
    this.emitirMensagens(3, mensagens);
  }

  private emitirMensagens(tipo: number, mensagens: string[]) {

    const mensagensModel = new Mensagens();
    mensagensModel.tipo = tipo;
    mensagensModel.mensagens = mensagens;
    this.mensagensEmiter.emit(mensagensModel);
  }

  resetMensagens() {

    this.mensagensDeErroEmiter.emit([]);
    this.mensagemDeSucessoEmiter.emit("");

    const mensagensModel = new Mensagens();
    mensagensModel.tipo = 0;
    mensagensModel.mensagens = [];
    this.mensagensEmiter.emit(mensagensModel);
  }
}
