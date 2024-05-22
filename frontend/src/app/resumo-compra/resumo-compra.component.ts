import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MensagensHandlerComponent } from '../mensagens-handler/mensagens-handler.component';
import { MensagensHandlerService } from '../mensagens-handler/mensagens-handler.service';
import { Compra } from '../servicos/entidades.model';
import { CompraService } from '../servicos/resumo-compra.service';
import { LogadoService } from '../servicos/logado.service';
import { QuantidadeComponent } from '../../componentes/quantidade/quantidade.component';
import { EnderecoComponent } from '../../componentes/endereco/endereco.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

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
    
  ],
  templateUrl: './resumo-compra.component.html',
  styleUrl: './resumo-compra.component.css',
})
export class ResumoCompraComponent {
  @Output() logado = new EventEmitter<boolean>();

  titulo: string = '';
  isbn: string = '';
  autor: string = '';
  compra: Compra;
  enderecosAdicionais: Compra[] = [];

  constructor(
    private router: Router,
    private mensagensHandlerService: MensagensHandlerService,
    private compraService: CompraService,
    private logadoService: LogadoService
  ) {
    this.compra = {
      id: 1,
      autor: 'Everton Araújo',
      titulo: 'Título do Livro',
      isbn: '123-456-789',
      imagemUrl: 'https://via.placeholder.com/200x200',
      preco: '25',
      quantidade: 1,
      endereco: [
        {
          logradouro: "Rua Teste",
          numero: "242",
          cidade: "Fortaleza",
          cep: "6048850",
          complemento: "Rua fechada",
          estado: "CE"
        }
      ]
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
      estado: ''
    });
  }

  removerEndereco(index: number) {
    this.compra.endereco.splice(index, 1);
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
