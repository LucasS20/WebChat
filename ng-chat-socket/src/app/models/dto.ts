import {MessageType} from "./MessageType";
import {Pergunta} from "./pergunta";
import {Aluno} from "./Aluno";
import {RespostaAluno} from "./respostaAluno";


export interface Dto {
    salaID: String;
    aluno: Aluno | null;
    chatMessage: string | null;
    pergunta: Pergunta | null;
    resposta: RespostaAluno | null;
    verificaResposta: string | null;
    type: MessageType
}
