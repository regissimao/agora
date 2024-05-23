import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  cadastrar(livro: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/livro/cadastrar`, livro);
  }

  listar(pagina: number = 0, quantidade: number = 20): Observable<any> {
    let params = new HttpParams().set('pagina', pagina.toString()).set('quantidade', quantidade.toString());
    return this.http.get<any>(`${this.baseUrl}/api/livro/listar`, { params });
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/livro/remover/${id}`);
  }
}
