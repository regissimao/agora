import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compra } from './entidades.model';
import { environment } from '../../enviroments/enviroments';

const SERVER_URL = environment.serverApiUrl;

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(
    private http: HttpClient
  ) { }

  obterCompra(compra: Compra) {
    return this.http.get<Compra>(`${SERVER_URL}/compra/${compra.id}`);
  }
}
