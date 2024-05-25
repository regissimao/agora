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
import { Pedido } from '../servicos/entidades.model';
import { PedidoService } from '../servicos/resumo-pedido.service';
import { LogadoService } from '../servicos/logado.service';
import { QuantidadeComponent } from '../../componentes/quantidade/quantidade.component';
import { EnderecoComponent } from '../../componentes/endereco/endereco.component';

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

  pedido!: Pedido;

  constructor(
    private router: Router,
    private mensagensHandlerService: MensagensHandlerService,
    private pedidoService: PedidoService,
    private logadoService: LogadoService
  ) {}

  ngOnInit() {
    const pedidoId = 3; // Testando pedido
    this.pedidoService.obterPedido(pedidoId).subscribe(
      (pedido) => {
        this.pedido = pedido;
      },
      (erro) => {
        console.error(erro);
        this.mensagensHandlerService.mostrarMensagemDeErro('Erro ao carregar o pedido.');
      }
    );
  }

  get total(): string {
    let valorTotal = Number(this.pedido.preco) * this.pedido.quantidade;
    return valorTotal === 0 ? valorTotal.toString() : `R$${valorTotal}`;
  }

  adicionarNovoEndereco() {
    this.pedido.endereco.push({
      logradouro: '',
      numero: '',
      cidade: '',
      cep: '',
      complemento: '',
      estado: '',
    });
  }

  removerEndereco(index: number) {
    this.pedido.endereco.splice(index, 1);
  }

  voltar() {
    this.router.navigate(['/pagina-anterior']); // Adjust the route as necessary
  }

  realizarPagamento() {
    console.log('');
  }

  removerItem() {
    console.log('');
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
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
