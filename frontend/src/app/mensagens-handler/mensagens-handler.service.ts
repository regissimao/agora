import { Injectable, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Mensagem } from './mensagem.model';

@Injectable({
  providedIn: 'root'
})
export class MensagensHandlerService {
  mensagemEmiter = new EventEmitter<Mensagem>();

  constructor(private router: Router) {}

  handleError(error: HttpErrorResponse): Observable<never> {
    const errorArr = error.error;
    console.log(error.status);

    if ([440, 401, 503, 406].includes(error.status)) {
      return throwError(() => errorArr);
    } else {
      this.router.navigateByUrl('/erro-geral');
      return throwError(() => null);
    }
  }

  mostrarMensagemDeErroCampos(titulo: string, campos: any[] = []) {
    let mensagemCompleta = `<strong>${titulo}</strong>`;
    if (campos.length > 0) {
      mensagemCompleta += '<ul>';
      campos.forEach(campo => {
        mensagemCompleta += `<li>${campo.nome}: ${campo.message}</li>`;
      });
      mensagemCompleta += '</ul>';
    }
    this.emitirMensagem(2, mensagemCompleta);
  }

  mostrarMensagemDeErro(mensagem: string) {
    this.emitirMensagem(2, mensagem);
  }

  mostrarMensagemDeSucesso(mensagem: string) {
    this.emitirMensagem(1, mensagem);
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
    this.mensagemEmiter.emit(new Mensagem());
  }
}
