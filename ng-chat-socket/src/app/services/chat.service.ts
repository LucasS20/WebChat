import {Injectable} from '@angular/core';
import SockJS from "sockjs-client";
import {Stomp} from '@stomp/stompjs';
import {ChatMessage} from "../models/chat-message";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  stompClient: any;

  private readonly url: string = '//100.27.30.223:8080';
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor() {
    this.initConnectionSocket();
  }

  initConnectionSocket() {

    const socketAdress = `${this.url}/chat-socket`;
    const socket = new SockJS(socketAdress);
    this.stompClient = Stomp.over(socket)
  }

  joinRoom(roomId: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, this.handleMessage.bind(this));
    });
  }

  handleMessage(mensagens: any) {
    const conteudoMensagem = JSON.parse(mensagens.body);
    const currentMessages = this.messageSubject.getValue();
    const newMessages = [...currentMessages, conteudoMensagem];
    this.messageSubject.next(newMessages);
  }


  sendMessage(roomId: string, chatMessage: ChatMessage) {
    this.stompClient.send(`app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
  }

  sendMessageToGameStartedEndpoint(roomId: string) {
    const message = {
      mensagem: 'Jogo Iniciado',
      user: 'System' // or any sender name
    };

    this.stompClient.send(`app/jogo-iniciado/${roomId}`);
  }


  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

}
