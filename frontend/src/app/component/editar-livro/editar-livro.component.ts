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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-livro',
  templateUrl: './editar-livro.component.html',
  styleUrls: ['./editar-livro.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private livroService: LivroService,
    private fb: FormBuilder,
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
      dataPublicacao: [''],
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
        formData.append(key, this.livroForm.value[key]);
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
          this.snackBar.open('Erro ao atualizar livro', 'Fechar', { duration: 3000 });
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
}
