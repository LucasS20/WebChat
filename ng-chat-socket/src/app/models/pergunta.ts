import {GrupoPerguntas} from "./grupo-perguntas";
import {Resposta} from "./resposta";

export interface Pergunta {
    id: number;
    enunciado: string;
    opcoes: Resposta[];
}
