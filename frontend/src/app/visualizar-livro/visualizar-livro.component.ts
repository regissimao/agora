import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MensagensHandlerComponent } from '../mensagens-handler/mensagens-handler.component';
import { MensagensHandlerService } from '../mensagens-handler/mensagens-handler.service';
import { Livro } from '../servicos/entidades.model';
import { LivroService } from '../servicos/visualizar-livro.service';
import { LogadoService } from '../servicos/logado.service';
import { QuantidadeComponent } from '../../componentes/quantidade/quantidade.component';
import { EnderecoComponent } from '../../componentes/endereco/endereco.component';

@Component({
  selector: 'app-visualizar-livro',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MensagensHandlerComponent,
    QuantidadeComponent,
    MatCardModule,
    EnderecoComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './visualizar-livro.component.html',
  styleUrls: ['./visualizar-livro.component.css'],
})
export class VisualizarLivroComponent implements OnInit {
  @Output() logado = new EventEmitter<boolean>();

  livro?: Livro;

  constructor(
    private router: Router,
    private mensagensHandlerService: MensagensHandlerService,
    private livroService: LivroService,
    private logadoService: LogadoService
  ) {}

  ngOnInit() {
    const isbn = "1234567891111";
    this.livroService.retornarLivro(isbn).subscribe(
      (livro) => {
        this.livro = livro;
      },
      (erro) => {
        console.error(erro);
        this.mensagensHandlerService.mostrarMensagemDeErro('Erro ao carregar o Livro.');
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.livro) {
      this.livroService.retornarLivro(this.livro.isbn).subscribe(
        (livro) => {
          this.logadoService.informarLogado(true);
          this.router.navigate(['/pagina-inicial']);
          form.reset();
        },
        (erro) => {
          console.log(erro);
          console.log(erro.error.titulo);
          this.mensagensHandlerService.mostrarMensagemDeErro(erro.error.titulo);
        }
      );
    } else {
      this.mensagensHandlerService.mostrarMensagemDeErro(
        'Preencha os campos obrigatórios'
      );
    }
  }
}
