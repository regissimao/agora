import { Component, OnInit } from '@angular/core';
import { MeusLivrosService } from './meus-livros.service';
import { Livro } from './entidades.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-livros-comprados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livros-comprados.component.html',
  styleUrl: './livros-comprados.component.css'
})
export class LivrosCompradosComponent  implements OnInit {
  listaLivros: Livro[] = []; 

  constructor(private livroService: MeusLivrosService) {}

  ngOnInit(): void {
    this.livroService.listagem(3)
      .subscribe((livros:any) => {
        this.listaLivros = livros; 
        console.log("Livros:", this.listaLivros);
      });
  }
}
