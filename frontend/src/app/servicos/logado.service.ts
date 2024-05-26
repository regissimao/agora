import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogadoService {

  logadoEmiter = new EventEmitter<boolean>();

  constructor() { }

  informarLogado(logado: boolean) {
    this.logadoEmiter.emit(logado);
  }
}
