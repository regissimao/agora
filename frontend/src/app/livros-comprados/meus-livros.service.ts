import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';

const SERVER_URL = environment.serverApiUrl;

@Injectable({
  providedIn: 'root'
})
export class MeusLivrosService {

  constructor(private http: HttpClient) { }

  listagem(idUsuario: number) {
    return this.http.get(`${SERVER_URL}/livro/meusLivros/${idUsuario}`);
  }
}
