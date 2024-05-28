import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MensagensHandlerComponent } from '../../mensagens-handler/mensagens-handler.component';
import { MensagensHandlerService } from '../../mensagens-handler/mensagens-handler.service';
import { UsuarioService } from '../../servicos/usuario.service';
import { AuthService } from '../../auth/auth.service';
import { Usuario } from '../../servicos/entidades.model';

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
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() logado = new EventEmitter<boolean>();
  id: number = 0;
  email: string = "";
  senha: string = "";
  usuario: Usuario;

  constructor(
    private router: Router,
    private mensagensHandlerService: MensagensHandlerService,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {
    this.usuario = { id: this.id ,email: this.email, senha: this.senha };
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.usuarioService.logar(this.usuario).subscribe(
        (response: Usuario) => {
          console.log(response)
          this.authService.login(response);
          this.router.navigate(['/pagina-inicial']);
          this.logado.emit(true);
          form.reset();
        },
        (erro) => {
          console.log(erro);
          if (erro.error.titulo) {
            this.mensagensHandlerService.mostrarMensagemDeErro(erro.error.titulo);
          } else {
            this.mensagensHandlerService.mostrarMensagemDeErro("Servidor indisponível");
          }
        }
      );
    } else {
      this.mensagensHandlerService.mostrarMensagemDeErro('Preencha os campos de email e senha');
    }
  }
}