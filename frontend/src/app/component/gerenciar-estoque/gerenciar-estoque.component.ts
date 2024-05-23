import { Component, OnInit, ViewChild } from '@angular/core';
import { LivroService } from '../../servicos/livro/livro.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from '../../shared/custom-paginator-intl';

@Component({
  selector: 'app-gerenciar-estoque',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterModule
  ],
  templateUrl: './gerenciar-estoque.component.html',
  styleUrls: ['./gerenciar-estoque.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl } // Fornecer a classe personalizada
  ]
})
export class GerenciarEstoqueComponent implements OnInit {
  livros: any[] = [];
  displayedColumns: string[] = ['titulo', 'autor', 'acoes'];
  totalItems: number = 0;
  pageSize: number = 20;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(pageIndex: number = 0, pageSize: number = 20) {
    this.livroService.listar(pageIndex, pageSize).subscribe((response: any) => {
      this.livros = response.livros;
      this.totalItems = response.totalItems;
      if (this.paginator) {
        this.paginator.pageIndex = pageIndex;
        this.paginator.pageSize = pageSize;
      }
    });
  }

  editarLivro(livro: any) {
    // Lógica para editar livro
  }

  removerLivro(livro: any) {
    this.livroService.remover(livro.id).subscribe(() => {
      this.carregarLivros(this.paginator.pageIndex, this.paginator.pageSize);
    });
  }

  onPageChange(event: any) {
    this.carregarLivros(event.pageIndex, event.pageSize);
  }
}
