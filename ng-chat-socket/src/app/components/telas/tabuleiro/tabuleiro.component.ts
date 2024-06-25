import {Component, OnInit} from '@angular/core';
import {FormComponent} from "../../form/form/form.component";
import {ActivatedRoute} from "@angular/router";
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ButtonComponent} from "../../inputs/button/button.component";
import {JogoService} from "../../../services/jogoService/jogo.service";
import {MatButton} from "@angular/material/button";
import {Player} from "../../../models/Player";
import {Aluno} from "../../../models/Aluno";
import {Jogo} from "../../../models/Jogo";
import {Subscription} from "rxjs";
import {SpinnerService} from "../../../services/spinnerService/spinner.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-tabuleiro',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgClass,
    ButtonComponent,
    MatButton,
    NgIf,
    NgStyle
  ],
  templateUrl: './tabuleiro.component.html',
  styleUrl: './tabuleiro.component.scss'
})
export class TabuleiroComponent extends FormComponent implements OnInit {
  jogo: Jogo = {} as Jogo;
  cells: number[] = Array(24).fill(0);
  private subscription: Subscription = new Subscription();
  private userID: any;
  private salaID: any;


  colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#A633FF', '#FFD733'];
   players: any[] = [];

  constructor(public route: ActivatedRoute,
              public jogoService: JogoService,
              private spinner: SpinnerService) {

    super();
  }

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['userID'];
    this.salaID = this.route.snapshot.params['salaID'];
    this.jogoService.conectarAosSockets(this.salaID, this.userID).then(() => {

      this.subscription.add(this.jogoService.estadoTabuleiro.subscribe(pergunta => {
        this.spinner.show();
        const dto = JSON.parse(pergunta)
        this.jogo = dto.jogo;
        console.log(this.jogo);
        this.setAlunos(dto.jogo);
        this.spinner.hide();
      }));

    }).catch(error => {
      console.error("Erro ao estabelecer conexão WebSocket:", error);
    })
    this.requestEstadoTabuleiroWhenConnected();
  }
  private requestEstadoTabuleiroWhenConnected(): void {
    const interval = setInterval(() => {
      if (this.jogoService.isConnected()) {
        this.jogoService.pedirEstadoTabuleiro();
        clearInterval(interval);
      }
    }, 1000);
  }

  onButtonClick() {
    this.jogoService.sendSolicitacaoPergunta()
  }


  solicitarEstado() {

    this.jogoService.pedirEstadoTabuleiro();
  }

  private setAlunos(jogo: any): void {
    const posicoesDosAlunos = jogo.tabuleiro.posicoesDosAlunos;

    // @ts-ignore
    this.players = posicoesDosAlunos.map(posicaoAluno => {
      console.log(posicaoAluno);
      const aluno = new Aluno(posicaoAluno.aluno.id, posicaoAluno.aluno.nome);
      const color = this.getPlayerColor(aluno.id); //
      return new Player(aluno, posicaoAluno.posicao, color);
    });

  }

  private getPlayerColor(alunoId: number | null): string {
    if(alunoId===null)return 'white';
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    return colors[alunoId % colors.length];
  }

}
