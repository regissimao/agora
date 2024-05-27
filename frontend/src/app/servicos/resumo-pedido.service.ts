import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  obterPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${SERVER_URL}/pedido/obter/${id}`, );
  }
  obterPedidoPorIsbn(isbn: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${SERVER_URL}/pedido/obterPorIsbn/${isbn}`, );
  }
}
