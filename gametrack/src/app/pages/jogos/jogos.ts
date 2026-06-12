import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../material-module';
import Swal from 'sweetalert2';
import { Jogo } from '../../models/jogo';
import { JogoService } from '../../services/jogo.service';

@Component({
  selector: 'app-jogos',
  imports: [ReactiveFormsModule, CommonModule, MaterialModule, FormsModule, RouterLink],
  templateUrl: './jogos.html',
  styleUrl: './jogos.scss',
})
export class Jogos {
  form = new FormGroup({
    nome: new FormControl<string>('', [Validators.required]),
    genero: new FormControl<string>('', [Validators.required]),
    plataforma: new FormControl<string>('', [Validators.required]),
    nota: new FormControl<number>(0, [Validators.min(0), Validators.max(10)]),
    status: new FormControl<string>('Na fila', [Validators.required]),
  });

  listaStatus = [
    { value: 'Na fila', viewValue: 'Na fila' },
    { value: 'Jogando', viewValue: 'Jogando' },
    { value: 'Concluído', viewValue: 'Concluído' },
    { value: 'Abandonado', viewValue: 'Abandonado' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: JogoService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.service.buscarJogoPorId(id).subscribe((jogo) => {
        if (jogo) {
          this.form.patchValue(jogo);
        }
      });
    }
  }


  id?: string;

  salvarJogo() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const jogo: Jogo = {
        nome: this.form.value.nome!,
        genero: this.form.value.genero!,
        plataforma: this.form.value.plataforma!,
        nota: this.form.value.nota!,
        status: this.form.value.status!,
      };
      
      if (this.id) {
        jogo.id = this.id;
      }

      this.service
        .salvarJogo(jogo)
        .then(() => {
          Swal.fire('Sucesso!', 'Jogo salvo com sucesso!', 'success').then(() => {
            this.router.navigate(['/home']);
          });
        })
        .catch((erro) => {
          Swal.fire('Erro!', 'Ocorreu um erro ao salvar o jogo.', 'error');
          console.log(erro, 'erro');
        });
    }
  }
}
