import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {
  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let cleanedValue = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    this.control.control?.setValue(cleanedValue);
  }
}
