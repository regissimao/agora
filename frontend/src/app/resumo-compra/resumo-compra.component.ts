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
import { Compra } from '../servicos/entidades.model';
import { CompraService } from '../servicos/resumo-compra.service';
import { LogadoService } from '../servicos/logado.service';
import { QuantidadeComponent } from '../../componentes/quantidade/quantidade.component';
import { EnderecoComponent } from '../../componentes/endereco/endereco.component';

@Component({
  selector: 'app-resumo-compra',
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
  templateUrl: './resumo-compra.component.html',
  styleUrls: ['./resumo-compra.component.css'],
})
export class ResumoCompraComponent {
  @Output() logado = new EventEmitter<boolean>();

  compra: Compra;

  constructor(
    private router: Router,
    private mensagensHandlerService: MensagensHandlerService,
    private compraService: CompraService,
    private logadoService: LogadoService
  ) {
    this.compra = {
      id: 1,
      autor: 'Everton Araújo',
      titulo: 'A volta dos que não foram',
      isbn: '123-456-789',
      imagemUrl: 'https://via.placeholder.com/200x200',
      preco: '25',
      quantidade: 1,
      endereco: [
        {
          logradouro: 'Rua Teste',
          numero: '242',
          cidade: 'Fortaleza',
          cep: '6048850',
          complemento: 'Rua fechada',
          estado: 'CE',
        },
      ],
    };
  }

  get total(): string {
    let valorTotal = Number(this.compra.preco) * this.compra.quantidade;
    return valorTotal === 0 ? valorTotal.toString() : `R$${valorTotal}`;
  }

  adicionarNovoEndereco() {
    this.compra.endereco.push({
      logradouro: '',
      numero: '',
      cidade: '',
      cep: '',
      complemento: '',
      estado: '',
    });
  }

  removerEndereco(index: number) {
    this.compra.endereco.splice(index, 1);
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
      this.compraService.obterCompra(this.compra).subscribe(
        (compra) => {
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
