import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { ChatMessage } from '../../models/chat-message';
import { BehaviorSubject } from 'rxjs';
import { Dto } from '../../models/dto';
import { MessageType } from '../../models/MessageType';
import { Pergunta } from '../../models/pergunta';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  stompClient: any;
  private readonly url: string = 'http://localhost:8081';
  private messageSubject: BehaviorSubject<Dto[]> = new BehaviorSubject<Dto[]>([]);
  private nome: string = '';
  private salaID: string = '';

  constructor() { }

  initConnectionSocket(nome: string, salaID: string) {
    this.nome = nome;
    this.salaID = salaID;
    const socket = new SockJS(`${this.url}/chat-socket`);
    this.stompClient = Stomp.over(socket);
    const headers = {
      nome: nome,
      salaID: salaID
    };

    this.stompClient.connect(headers, () => {
        this.stompClient.subscribe(`/topic/jogo/${salaID}`, (message: any) => {
          this.handleMessage(message);
        });
      },
      (error: any) => {
        console.error('Connection error:', error);
      });
  }

  disconnect() {
    if (this.stompClient) {
      const headers = {
        nome: this.nome,
        salaID: this.salaID
      };
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      }, headers);
    }
  }

  handleMessage(message: any) {
    const conteudoMensagem = JSON.parse(message.body);
    const currentMessages = this.messageSubject.getValue();
    const newMessages = [...currentMessages, conteudoMensagem];
    this.messageSubject.next(newMessages);
  }

  sendMessage(salaID: string, dto: Dto) {
    this.stompClient.send(`app/jogo/${salaID}`, {}, JSON.stringify(dto));
  }

  sendMessageToGameStartedEndpoint(roomID: string) {
    const dtoInicioJogo: Dto = {
      salaID: roomID,
      chatMessage: {} as string,
      pergunta: {} as Pergunta,
      type: MessageType.iniciarJogo
    }
    this.stompClient.send(`app/jogo/${roomID}`, {}, JSON.stringify(dtoInicioJogo));
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}
