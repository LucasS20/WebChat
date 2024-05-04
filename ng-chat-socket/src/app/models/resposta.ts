import {GrupoPerguntas} from "./grupo-perguntas";

export interface Resposta {
   id: number;
   conteudo: string;
   correta: boolean;
   grupoPerguntasDTO: GrupoPerguntas;

}
