import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from './entidades.model';
import { environment } from '../../enviroments/enviroments';

const SERVER_URL = environment.serverApiUrl;

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient) { }

  retornarLivro(isbn: string): Observable<Livro> {
    return this.http.get<Livro>(`${SERVER_URL}/livro/retornar-livro/${isbn}`, );
  }
}
