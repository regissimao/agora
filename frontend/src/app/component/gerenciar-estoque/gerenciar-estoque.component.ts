import { Component, OnInit, ViewChild } from '@angular/core';
import { LivroService } from '../../servicos/livro/livro.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from '../../shared/custom-paginator-intl';
import { Livro } from '../../model/livro.model';
import { ConfirmDialogService } from "../../servicos/confirm-dialog.service";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { NgxMaskDirective, NgxMaskPipe } from "ngx-mask";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MensagensHandlerComponent} from "../../mensagens-handler/mensagens-handler.component";
import {MensagensHandlerService} from "../../mensagens-handler/mensagens-handler.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-gerenciar-estoque',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MensagensHandlerComponent
  ],
  templateUrl: './gerenciar-estoque.component.html',
  styleUrls: ['./gerenciar-estoque.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class GerenciarEstoqueComponent implements OnInit {
  livros: Livro[] = [];
  filteredLivros: Livro[] = [];
  displayedColumns: string[] = ['titulo', 'isbn', 'autor', 'precoFisico', 'precoDigital', 'acoes'];
  totalItems: number = 0;
  pageSize: number = 20;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private livroService: LivroService,
    private confirmDialogService: ConfirmDialogService,
    private mensagensHandlerService: MensagensHandlerService,
  ) {}

  ngOnInit(): void {
    this.carregarLivros();

    const state = window.history.state;
    if (state && state.mensagemSucesso) {
      this.snackBar.open(state.mensagemSucesso, 'Fechar', { duration: 3000 });
    }
  }

  carregarLivros(pageIndex: number = 0, pageSize: number = 20) {
    this.livroService.listar(pageIndex, pageSize).subscribe((response: any) => {
      this.livros = response.livros.map((livroData: any) => new Livro(livroData));
      this.filteredLivros = this.livros;
      this.totalItems = response.totalItems;
      if (this.paginator) {
        this.paginator.pageIndex = pageIndex;
        this.paginator.pageSize = pageSize;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredLivros = this.livros.filter(livro => livro.titulo.toLowerCase().includes(filterValue)|| livro.isbn.toLowerCase().includes(filterValue) || livro.autor.toLowerCase().includes(filterValue));
  }

  editarLivro(livro: Livro) {
    this.router.navigate(['/editar-livro', livro.id]);
  }

  async removerLivro(livro: Livro) {
    const confirm = await this.confirmDialogService.confirm(
      'Confirmação',
      'Tem certeza que deseja remover este livro?'
    );

    if (confirm) {
      this.livroService.remover(livro.id!).subscribe(() => {
        this.carregarLivros(this.paginator.pageIndex, this.paginator.pageSize);
      });
    }
  }

  onPageChange(event: any) {
    this.carregarLivros(event.pageIndex, event.pageSize);
  }

  visualizarLivro(isbn: any) {
    this.router.navigate(['/visualizar-livro', isbn]);
  }
}
