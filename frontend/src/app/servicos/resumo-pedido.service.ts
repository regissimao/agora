import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from './entidades.model';
import { environment } from '../../enviroments/enviroments';

const SERVER_URL = environment.serverApiUrl;

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    private http: HttpClient
  ) { }

  obterPedido(pedido: Pedido) {
    return this.http.get<Pedido>(`${SERVER_URL}/pedido/obter/${pedido.id}`);
  }
}
