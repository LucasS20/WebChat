import {Aluno} from "./Aluno";
import {Pergunta} from "./pergunta";
import {Resposta} from "./resposta";

export interface RespostaAluno {
    aluno: Aluno;
    pergunta: Pergunta;
    resposta: Resposta;
}
