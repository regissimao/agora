import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido, Usuario } from './entidades.model';
import { environment } from '../../enviroments/enviroments';

const SERVER_URL = environment.serverApiUrl;

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    private http: HttpClient
  ) { }

  criarPedido(isbn: string, usuario: Object): Observable<Pedido> {
    const pedidoData = { isbn, usuario };
    return this.http.post<Pedido>(`${SERVER_URL}/pedido/criar`, pedidoData);
  }

  obterPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${SERVER_URL}/pedido/obter/${id}`, );
  }
  obterPedidoPorIsbn(isbn: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${SERVER_URL}/pedido/obterPorIsbn/${isbn}`, );
  }
}