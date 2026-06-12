import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../material-module';
import { Jogo } from '../../models/jogo';
import { JogoService } from '../../services/jogo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink, MaterialModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  jogos: Jogo[] = [];
  carregando = signal(true);

  ngOnInit() {
    this.carregarJogos();
  }

  carregarJogos() {
    this.carregando.set(true);
    this.service.listarJogos().subscribe(
      (dados) => {
        this.jogos = dados;
        this.carregando.set(false);
      },
      (erro) => {
        console.error('Erro ao carregar jogos:', erro);
        Swal.fire('Erro', 'Erro ao carregar jogos.', 'error');
        this.carregando.set(false);
      },
    );
  }

  constructor(
    private route: Router,
    private service: JogoService,
  ) {}

  novoJogo() {
    this.route.navigate(['/novo-jogo']);
  }

  deletarJogo(id: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service
          .excluirJogo(id)
          .then(() => {
            Swal.fire('Deletado!', 'O jogo foi deletado.', 'success');
            this.carregarJogos();
          })
          .catch((erro) => {
            console.error('Erro ao deletar jogo no Firebase:', erro);
            Swal.fire('Erro', 'Não foi possível deletar o jogo do servidor.', 'error');
          });
      }
    });
  }

   editarJogo(jogo: Jogo) {
    this.service.salvarJogo(jogo);
  }

  corStatus(status: string): string {
    switch (status.toLocaleLowerCase()) {
      case 'finalizado':
        return 'success';
      case 'jogando':
        return 'primary';
      case 'abandonado':
        return 'red';
      case 'na fila':
        return 'accent';
      default:
        return 'gray';
    }
  }
}
