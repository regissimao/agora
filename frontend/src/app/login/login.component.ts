import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MensagensHandlerComponent } from '../mensagens-handler/mensagens-handler.component';
import { MensagensHandlerService } from '../mensagens-handler/mensagens-handler.service';
import { Usuario } from '../servicos/entidades.model';
import { UsuarioService } from '../servicos/usuario.service';
import { LogadoService } from '../servicos/logado.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MensagensHandlerComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Output() logado = new EventEmitter<boolean>();

  email: string = "";
  senha: string = "";
  usuario: Usuario;

  constructor(
    private router: Router,
    private mensagensHandlerService: MensagensHandlerService,
    private usuarioService: UsuarioService,
    private logadoService: LogadoService,
  ) {
    this.usuario = new Usuario();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {

      this.usuarioService.logar(this.usuario).subscribe(
        (usuario) => {
          this.logadoService.informarLogado(true);
          this.router.navigate(['/pagina-inicial']);
          form.reset();
        },
        (erro) => {
          this.mensagensHandlerService.mostrarMensagensDeErro(erro.error);
        }
      );
    } else {
      this.mensagensHandlerService.mostrarMensagensDeErro(['Preecha os campor de email e senha']);
    }
  }

}
