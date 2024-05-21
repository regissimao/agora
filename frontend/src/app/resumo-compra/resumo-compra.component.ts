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

@Component({
  selector: 'app-resumo-compra',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MensagensHandlerComponent,
    QuantidadeComponent,
    MatCardModule
  ],
  templateUrl: './resumo-compra.component.html',
  styleUrl: './resumo-compra.component.css'
})
export class ResumoCompraComponent {

  @Output() logado = new EventEmitter<boolean>();

  titulo: string = "";
  isbn: string = "";
  autor: string = "";
  compra: Compra;

  constructor(
    private router: Router,
    private mensagensHandlerService: MensagensHandlerService,
    private compraService: CompraService,
    private logadoService: LogadoService,
  ) {
    this.compra = {
        id: 1, 
        autor: 'Everton Araújo',
        titulo: 'Título do Livro',
        isbn: '123-456-789',
        imagemUrl: 'https://via.placeholder.com/200x200',
        preco: '25',
        quantidade: 1,
      };
  }

  get total(): number {
    return Number(this.compra.preco) * this.compra.quantidade;
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
      this.mensagensHandlerService.mostrarMensagemDeErro('Preecha os campos obrigatórios');
    }
  }

}
