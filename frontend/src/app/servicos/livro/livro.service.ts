import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Livro } from '../../model/livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  cadastrar(livro: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/livro/cadastrar`, livro);
  }

  listar(pagina: number = 0, quantidade: number = 20): Observable<{ livros: Livro[], totalItems: number }> {
    let params = new HttpParams().set('pagina', pagina.toString()).set('quantidade', quantidade.toString());
    return this.http.get<any>(`${this.baseUrl}/api/livro/listar`, { params }).pipe(
      map(response => {
        return {
          livros: response.livros.map((livroData: any) => new Livro(livroData)),
          totalItems: response.totalItems
        };
      })
    );
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/livro/remover/${id}`);
  }

  obterPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.baseUrl}/api/livro/${id}`).pipe(
      map(livroData => new Livro(livroData))
    );
  }

  atualizar(livro: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/livro/atualizar`, livro);
  }
}
