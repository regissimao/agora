import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicos/usuario.service';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true,
  imports: [
    FormsModule,
  ],
})
export class CadastrarUsuarioComponent {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(form: NgForm, event: Event) {
    event.preventDefault(); 

    if (form.valid) {
      console.log(form)
      const userData = {
        email: form.value.email,
        nome: form.value.name,
        cpfCnpj: form.value.cpf_cnpj, 
        dataNascimento: form.value.birthdate, 
        endereco: {
          logradouro: form.value.address,
          numero: form.value.number,
          complemento: form.value.complement,
          cidade: form.value.city,
          estado: form.value.state,
          cep: form.value.cep
        },
        senha: form.value.password 
      };
      console.log(userData)
      this.usuarioService.cadastrarUsuario(userData).subscribe({
        next: () => {
          this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', { duration: 3000 });
          form.resetForm();
          this.router.navigate(['/pagina-inicial']);
        },
        error: (error) => {
          console.error(error);
          this.snackBar.open('Erro ao cadastrar usuário. Por favor, tente novamente.', 'Fechar', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Por favor, preencha todos os campos corretamente.', 'Fechar', { duration: 3000 });
    }
  }

}