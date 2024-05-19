import {Pergunta} from "./pergunta";

export interface GrupoPerguntas {
    id: number | null;
    perguntas: Pergunta[];
    categoria: string;
    userId: number;
}
