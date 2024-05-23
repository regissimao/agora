import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LivroService } from '../../servicos/livro/livro.service';
import { MensagensHandlerService } from '../../mensagens-handler/mensagens-handler.service';
import { NgIf } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OnlyNumbersDirective } from '../../directive/only-numbers.directive';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-livro',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgIf,
    MatSnackBarModule,
    OnlyNumbersDirective
  ],
  templateUrl: './cadastrar-livro.component.html',
  styleUrls: ['./cadastrar-livro.component.css']
})
export class CadastrarLivroComponent {
  capaLivro: File | null = null;
  arquivoDigital: File | null = null;
  capaLivroError: string | null = null;
  pdfLivroError: string | null = null;


  constructor(
    private router: Router,
    private livroService: LivroService,
    private mensagensHandlerService: MensagensHandlerService,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(field: string, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (field === 'capaLivro') {
        if (file.type.startsWith('image/')) {
          this.capaLivro = file;
          this.capaLivroError = null;
        } else {
          this.capaLivroError = 'Por favor, selecione um arquivo de imagem válido.';
          this.capaLivro = null;
        }
      } else if (field === 'arquivoDigital') {
        if (file.type === 'application/pdf') {
          this.arquivoDigital = file;
          this.pdfLivroError = null;
        } else {
          this.pdfLivroError = 'Por favor, selecione um arquivo PDF válido.';
          this.arquivoDigital = null;
        }
      }
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid && form.value.isbn.length === 13) {
      const formData = new FormData();
      formData.append('isbn', form.value.isbn);
      formData.append('titulo', form.value.titulo);
      formData.append('autor', form.value.autor);
      formData.append('editora', form.value.editora);
      formData.append('categoria', form.value.categoria);
      formData.append('sinopse', form.value.sinopse);
      formData.append('idioma', form.value.idioma);
      formData.append('dataPublicacao', form.value.dataPublicacao);
      formData.append('tipoLivro', form.value.tipoLivro);
      formData.append('precoDigital', form.value.precoDigital);
      formData.append('precoFisico', form.value.precoFisico);
      formData.append('numeroPagina', form.value.numeroPagina);
      formData.append('quantidadeEstoque', form.value.quantidadeEstoque);
      if (this.capaLivro) {
        formData.append('capaLivro', this.capaLivro);
      }
      if (this.arquivoDigital) {
        formData.append('arquivoDigital', this.arquivoDigital);
      }

      this.livroService.cadastrar(formData).subscribe({
        next: () => {
          this.mensagensHandlerService.mostrarMensagemDeSucesso('Livro cadastrado com sucesso!');
          form.resetForm();
          this.resetFiles();
          this.router.navigate(['/pagina-inicial']);
        },
        error: (erro) => {
          // Aqui você pode fazer a verificação de erros específicos
          console.log(erro);
          if (erro.status === 500) {
            this.mensagensHandlerService.mostrarMensagemDeErro('Erro desconhecido ao cadastrar livro');
          } else {
            this.mensagensHandlerService.mostrarMensagemDeErro(erro.error.titulo || 'Erro ao cadastrar livro');
          }
        }
      });
    } else {
      this.snackBar.open('O ISBN deve ter exatamente 13 caracteres.', 'Fechar', { duration: 3000 });
    }
  }

  voltar() {
    this.router.navigate(['/gerenciar-estoque']); // Atualize com a rota correta para a listagem de livros
  }

  limparFormulario(form: NgForm) {
    form.resetForm();
    this.resetFiles();
  }

  private resetFiles() {
    this.capaLivro = null;
    this.arquivoDigital = null;
    this.capaLivroError = null;
    this.pdfLivroError = null;
  }
}
