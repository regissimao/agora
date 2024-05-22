import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  cadastrar(livro: FormData): Observable<any> {
    return this.http.post(this.baseUrl + "/api/livro/cadastrar", livro);
  }
}
