import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro'; 

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  livros: Livro[] = []; 

  constructor() { }

  ngOnInit(): void {
    
  }

  submitAvaliacao(livro: Livro, isbn: string): void {
    console.log('ISBN:', isbn);
  }
}