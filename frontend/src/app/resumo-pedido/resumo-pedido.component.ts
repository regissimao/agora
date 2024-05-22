import { Component, Output, EventEmitter } from '@angular/core';
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
export class ResumoPedidoComponent {
  @Output() logado = new EventEmitter<boolean>();

  pedido: Pedido;

  constructor(
    private router: Router,
    private mensagensHandlerService: MensagensHandlerService,
    private pedidoService: PedidoService,
    private logadoService: LogadoService
  ) {
    this.pedido = {
      id: 1,
      dataPedido: new Date('2023-05-21'),
      preco: 150.50,
      quantidade: 3,
      prazoEntrega: new Date('2023-06-01'),
      dataEntrega: new Date('2023-06-05'),
      observacao: "Entregar no período da tarde.",
      statusEntrega: "Pendente",
      valorFrete: "20.00",
      endereco: [
        {
          logradouro: "Rua das Flores",
          numero: "123",
          cidade: "São Paulo",
          cep: "01001-000",
          complemento: "Apt 45",
          estado: "SP"
        }
      ],
      usuario: [
        {
          email: "usuario@exemplo.com",
          senha: "senha123"
        }
      ],
      pagamento: [
        {
          id: 1,
          status: true,
          tipo: true,
          dataPedido: new Date('2023-05-21')
        }
      ],
      livro: [
        {
          id: 1,
          isbn: "978-3-16-148410-0",
          titulo: "O Grande Livro",
          autor: "João da Silva",
          sinopse: "Um livro incrível sobre grandes aventuras.",
          editora: "Editora Exemplo",
          idioma: "Português",
          categoria: "Ficção",
          numeroPagina: 320,
          dataPublicacao: new Date('2020-01-15'),
          precoFisico: 50.00,
          quantidadeEstoque: 10,
          arquivoDigital: "url_para_arquivo_digital",
          precoDigital: 30.00,
          capaLivro: "url_para_imagem_capa",
          tipoLivro: "Físico"
        }
      ]
    };
    
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
      this.pedidoService.obterPedido(this.pedido).subscribe(
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
        'Preecha os campos obrigatórios'
      );
    }
  }
}
