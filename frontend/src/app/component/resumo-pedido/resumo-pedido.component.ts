import { Pedido } from './../../servicos/entidades.model';
import { AuthService } from './../../auth/auth.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MensagensHandlerComponent } from '../../mensagens-handler/mensagens-handler.component';
import { MensagensHandlerService } from '../../mensagens-handler/mensagens-handler.service';
import { PedidoService } from '../../servicos/resumo-pedido.service';
import { LogadoService } from '../../servicos/logado.service';
import { QuantidadeComponent } from '../../../componentes/quantidade/quantidade.component';
import { EnderecoComponent } from '../../../componentes/endereco/endereco.component';

@Component({
  selector: 'app-resumo-pedido',
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
  templateUrl: './resumo-pedido.component.html',
  styleUrls: ['./resumo-pedido.component.css'],
})
export class ResumoPedidoComponent implements OnInit {
  @Output() logado = new EventEmitter<boolean>();
  readonly API_URL = 'http://localhost:8080/api/livro/';
  pedido?: Pedido;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mensagensHandlerService: MensagensHandlerService,
    private pedidoService: PedidoService,
    private logadoService: LogadoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const isbn = this.route.snapshot.params['isbn'];
    const usuario = this.authService.getCurrentUser();
    if (usuario) {
      this.pedidoService.criarPedido(isbn, usuario).subscribe(
        (pedidoCriado) => {
          this.pedido = pedidoCriado;
          this.pedidoService.obterPedido(pedidoCriado.id).subscribe(
            (pedido) => {
              this.pedido = pedido;
              console.log(pedido);
            },
            (erro) => {
              console.error(erro);
              this.mensagensHandlerService.mostrarMensagemDeErro('Erro ao carregar o pedido.');
            }
          );
        },
        (erro) => {
          console.error(erro);
          this.mensagensHandlerService.mostrarMensagemDeErro('Erro ao criar o pedido.');
        }
      );
    } else {
      this.mensagensHandlerService.mostrarMensagemDeErro('Usuário não autenticado.');
      this.router.navigate(['/logar']);
    }
  }

  get total(): string {
    if (!this.pedido) {
      return 'R$0';
    }
    return String(this.pedido.livro.precoDigital);
  }

  adicionarNovoEndereco() {
    if (this.pedido) {
      this.pedido.endereco.push({
        logradouro: '',
        numero: 0,
        cidade: '',
        cep: '',
        complemento: '',
        estado: '',
      });
    }
  }

  removerEndereco(index: number) {
    if (this.pedido) {
      this.pedido.endereco.splice(index, 1);
    }
  }

  voltar() {
    this.router.navigate(['/visualizar-livro', this.pedido?.livro.isbn]); // Adjust the route as necessary
  }

  realizarPagamento() {
    console.log('');
  }

  removerItem() {
    console.log('');
  }


  onSubmit(form: NgForm) {
    if (form.valid && this.pedido) {
      this.pedidoService.obterPedido(this.pedido.id).subscribe(
        (pedido) => {
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