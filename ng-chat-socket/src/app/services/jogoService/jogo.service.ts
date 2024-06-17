import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateSala} from "../../models/create-sala";
import {Jogo} from "../../models/Jogo";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {SpinnerService} from "../spinnerService/spinner.service";
import {Subject} from 'rxjs';
import {Dto} from "../../models/dto";
import {MessageType} from "../../models/MessageType";
import {Pergunta} from "../../models/pergunta";

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  private readonly urlHost: string = 'http://localhost:8081';
  private readonly urlHostRest: string = 'http://localhost:8080';
  private readonly endpointJogoRest = 'api/jogo';
  private stompClient: any;
  public perguntaAtual = new Subject<any>();
  private roomID: string = '';
  private userID: string = '';

  constructor(public http: HttpClient, public spinner: SpinnerService) {
    this.spinner.show();
    this.initConnectionSocket();
    this.spinner.hide();
  }

  criarSala(dadosSala: CreateSala): Observable<any> {
    const create: string = 'create';
    return this.http.post<Jogo>(`${this.urlHostRest}/${this.endpointJogoRest}/${create}`, dadosSala);
  }

  conectarAosSockets(roomId: string, userID: string): Promise<void> {
    this.roomID = roomId;
    this.userID = userID;

    const headers = {
      nome: userID,
      salaID: roomId
    };
    return new Promise((resolve, reject) => {
      this.stompClient.connect(headers, () => {
        this.stompClient.subscribe(`/topic/jogo/${this.roomID}`, (message: {
          body: any
        }) => {
          this.perguntaAtual.next(message.body);
        });
        resolve();
      }, (error: any) => {
        reject(error);
      });
    })
  }


  private initConnectionSocket() {
    const socketAdress = `${this.urlHost}/chat-socket`;
    const socket = new SockJS(socketAdress);
    this.stompClient = Stomp.over(socket);
  }

  responder(respostaAluno: Dto) {
    console.log(respostaAluno);
    this.stompClient.send(`app/jogo/${this.roomID}`, {}, JSON.stringify(respostaAluno));
  }

  sendSolicitacaoPergunta() {
    const dto: Dto = {
      salaID: this.roomID,
      aluno: null,
      chatMessage: null,
      pergunta: null,
      resposta: null,
      verificaResposta: null,
      type: MessageType.solicitacaoPergunta
    }
    this.stompClient.send(`app/jogo/${this.roomID}`, {}, JSON.stringify(dto));
  }
}
