import {Aluno} from "./Aluno";

export class Player {
  aluno: Aluno;
  posicao: number;
  color: string;

  constructor(aluno: Aluno, posicao: number, color: string) {
    this.aluno = aluno;
    this.posicao = posicao;
    this.color = color;
  }
}
