import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../../servicos/livro/livro.service';
import { Livro } from '../../model/livro.model';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, NgIf } from '@angular/common';
import { OnlyNumbersDirective } from "../../directive/only-numbers.directive";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import {MensagensHandlerService} from "../../mensagens-handler/mensagens-handler.service";
import {MensagensHandlerComponent} from "../../mensagens-handler/mensagens-handler.component";

@Component({
  selector: 'app-editar-livro',
  templateUrl: './editar-livro.component.html',
  styleUrls: ['./editar-livro.component.css'],
  standalone: true,
  providers: [provideNgxMask()],
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
    OnlyNumbersDirective,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    MensagensHandlerComponent,

  ]
})
export class EditarLivroComponent implements OnInit {
  livroForm!: FormGroup;
  livroId!: number;
  livro!: Livro;
  capaLivroUrl: string = 'assets/img/atpve_teste.png';
  capaLivro: File | null = null;
  arquivoDigital: File | null = null;
  capaLivroError: string | null = null;
  pdfLivroError: string | null = null;

  readonly API_URL = 'http://localhost:8080/api/livro/';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private livroService: LivroService,
    private fb: FormBuilder,
    private mensagensHandlerService: MensagensHandlerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.livroId = this.route.snapshot.params['id'];

    this.livroForm = this.fb.group({
      id: [''],
      isbn: ['', Validators.required],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      sinopse: [''],
      editora: ['', Validators.required],
      idioma: ['', Validators.required],
      categoria: ['', Validators.required],
      numeroPagina: ['', Validators.required],
      dataPublicacao: ['', Validators.required],
      precoFisico: [''],
      quantidadeEstoque: [0],
      arquivoDigital: [''],
      precoDigital: [''],
      capaLivro: [''],
      tipoLivro: ['', Validators.required]
    });

    this.livroService.obterPorId(this.livroId).subscribe((livro: Livro) => {
      this.livro = livro;
      this.livroForm.patchValue({
        id: livro.id,
        isbn: livro.isbn,
        titulo: livro.titulo,
        autor: livro.autor,
        sinopse: livro.sinopse,
        editora: livro.editora,
        idioma: livro.idioma,
        categoria: livro.categoria,
        numeroPagina: livro.numeroPagina,
        dataPublicacao: livro.dataPublicacao,
        precoFisico: livro.precoFisico,
        quantidadeEstoque: livro.quantidadeEstoque,
        arquivoDigital: livro.arquivoDigital,
        precoDigital: livro.precoDigital,
        capaLivro: livro.capaLivro,
        tipoLivro: livro.tipoLivro
      });
      if (livro.capaLivro) {
        this.capaLivroUrl = `${this.API_URL}${livro.isbn}/downloadCapa?${new Date().getTime()}`;
      }
    });
  }

  onFileSelected(field: string, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (field === 'capaLivro') {
        if (file.type.startsWith('image/')) {
          this.capaLivro = file;
          this.capaLivroError = null;
          // Atualize a URL da imagem para bustar o cache
          this.capaLivroUrl = `${this.API_URL}${this.livroForm.get('isbn')?.value}/downloadCapa?${new Date().getTime()}`;
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


  onSubmit() {
    if (this.livroForm.valid) {
      const formData = new FormData();
      Object.keys(this.livroForm.value).forEach(key => {
        if (key === 'dataPublicacao') {
          const data = new Date(this.livroForm.value[key]);
          formData.append(key, this.formatarDataSimples(data));
        } else if (key !== 'capaLivro' && key !== 'arquivoDigital') {
          formData.append(key, this.livroForm.value[key]);
        }
      });

      if (this.capaLivro) {
        formData.append('capaLivro', this.capaLivro);
      }

      if (this.arquivoDigital) {
        formData.append('arquivoDigital', this.arquivoDigital);
      }

      this.livroService.atualizar(formData).subscribe({
        next: () => {
          this.snackBar.open('Livro atualizado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/gerenciar-estoque']);
        },
        error: (erro) => {
          console.error(erro);
          const titulo = erro.error.titulo || 'Erro ao atualizar livro';
          const campos = erro.error.campos || [];
          this.mensagensHandlerService.mostrarMensagemDeErroCampos(titulo, campos);
        }
      });
    }
  }

  voltar() {
    this.router.navigate(['/gerenciar-estoque']);
  }

  loadLivro(): void {
    this.capaLivroUrl = 'assets/img/atpve_teste.png';
  }

  formatarDataSimples(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }
}
