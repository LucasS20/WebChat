import {GrupoPerguntas} from "./grupo-perguntas";

export interface Jogo {
    id: string;
    userID: string;
    tabuleiro: any;
    grupoPerguntas: GrupoPerguntas;
}
