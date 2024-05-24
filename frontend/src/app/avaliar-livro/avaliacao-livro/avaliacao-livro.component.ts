import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-avaliacao-livro',
  standalone: true,
  imports: [],
  templateUrl: './avaliacao-livro.component.html',
  styleUrl: './avaliacao-livro.component.css'
})
export class AvaliacaoLivroComponent implements OnInit{
  idLivro: string = '';
  livroTitulo: string = '';
  livroISBN: string = '';
  livroAutor: string = '';
  avaliar: number = 1;
  comentario: string = '';

  constructor(private route: ActivatedRoute, private router: Route) {}

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
          this.idLivro = params['idLivro'];
      });
  }
  voltar(){
    
  }
  avaliarLivro(){

  }
}