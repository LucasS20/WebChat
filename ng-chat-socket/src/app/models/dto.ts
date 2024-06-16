import {MessageType} from "./MessageType";
import {Pergunta} from "./pergunta";
import {ChatMessage} from "./chat-message";

export interface Dto {
  type: MessageType;

  salaID: string;
  chatMessage: string;
  pergunta: Pergunta;
}
