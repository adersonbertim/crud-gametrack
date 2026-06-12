import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material-module';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  usuario!: string;
  senha!: string;
  erro!: string;
  senhaVisivel = false;
  carregando = false;

  constructor(
    private router: Router,
    private service: LoginService,
  ) {}

  async login() {
    this.carregando = true;
    try {
      await this.service.login(this.usuario, this.senha);
      this.router.navigate(['/home']);
    } catch (e: any) {
      console.log('Erro: ', e.code);
      this.erro = e.code;
    }
  }

  mensagemErro(codigo: string) {
    switch (codigo) {
      case 'auth/invalid-email':
        return 'Email inválido.';
      case 'auth/invalid-credential':
        return 'Credenciais inválidas.';
      default:
        return 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.';
    }
  }
}
