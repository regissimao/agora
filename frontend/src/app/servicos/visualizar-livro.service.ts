import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from './entidades.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient) { }

  retornarLivro(isbn: string): Observable<Livro> {
    return this.http.get<Livro>(`api/livros/retornar-livro/${isbn}`);
  }
}
