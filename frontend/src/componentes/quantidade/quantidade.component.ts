import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-component-quantidade',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './quantidade.component.html',
  styleUrls: ['./quantidade.component.css']
})
export class QuantidadeComponent {
  @Input() quantidade: number = 1;
  @Output() quantidadeChange: EventEmitter<number> = new EventEmitter<number>();

  increment() {
    this.quantidade++;
    this.quantidadeChange.emit(this.quantidade);
  }

  decrement() {
    if (this.quantidade > 1) {
      this.quantidade--;
      this.quantidadeChange.emit(this.quantidade);
    }
  }
}
