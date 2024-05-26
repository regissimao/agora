import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MensagensHandlerComponent } from '../../app/mensagens-handler/mensagens-handler.component';
import { QuantidadeComponent } from '../quantidade/quantidade.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MensagensHandlerComponent,
    QuantidadeComponent,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
})
export class EnderecoComponent {
  @Input() logradouro: string = '';
  @Input() numero: string = '';
  @Input() cidade: string = '';
  @Input() cep: string = '';
  @Input() complemento: string = '';
  @Input() estado: string = '';  
  @Output() enderecoRemovido = new EventEmitter<void>();

  removerEndereco() {
    this.enderecoRemovido.emit();
  }
}
