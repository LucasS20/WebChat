import {GrupoPerguntas} from "./grupo-perguntas";

export interface Pergunta {
  id: number;
  conteudo: string;
  correta: boolean;
  grupoPerguntasDTO: GrupoPerguntas;
}
