import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments';
import { Usuario } from './entidades.model';

const SERVER_URL = environment.serverApiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  cadastrarUsuario(userData: any): Observable<any> {
    return this.http.post<any>(`${SERVER_URL}/usuario/cadastrar`, userData);
  }

  logar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${SERVER_URL}/usuario/logar`, usuario);
  }
}