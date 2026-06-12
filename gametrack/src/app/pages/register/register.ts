import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material-module';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, MaterialModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  nome = '';
  email = '';
  senha = '';
  mensagem!: string;
  senhaVisivel = false;

  constructor(
    private service: LoginService,
    private route: Router,
  ) {}

  async criarUsuario() {
    try {
      this.mensagem = '';
      await this.service.novoUsuario(this.nome, this.email, this.senha);
      Swal.fire('Sucesso!', 'Usuário registrado com sucesso!', 'success');
      this.route.navigate(['/']);
    } catch (erro: any) {
      this.mensagem = this.mensagemErro(erro.code);
      Swal.fire(
        'Erro!',
        'Ocorreu um erro ao registrar o usuário. Por favor, tente novamente.',
        'error',
      );
    }
  }

  mensagemErro(codigo: string) {
    switch (codigo) {
      case 'auth/weak-password':
        return 'A senha deve ter ao menos 6 caracteres';
      case 'auth/email-already-in-use':
        return 'O endereço do e-mail ja está em uso';
    }
    return 'Falha ao criar um novo usuário ' + codigo;
  }
}
