import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {CreateSala} from "../../models/create-sala";
import {Jogo} from "../../models/Jogo";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {SpinnerService} from "../spinnerService/spinner.service";
import {Dto} from "../../models/dto";
import {MessageType} from "../../models/MessageType";

@Injectable({
    providedIn: 'root'
})
export class JogoService {
    private readonly urlHost: string = 'http://ec2-44-203-95-223.compute-1.amazonaws.com:8081';
    private readonly urlHostRest: string = 'http://ec2-44-203-95-223.compute-1.amazonaws.com:8080';
    private readonly endpointJogoRest = 'api/jogo';
    private stompClient: any;
    public perguntaAtual = new Subject<any>();
    public estadoTabuleiro = new Subject<any>();
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

        const redirectByMessageType = (message: { body: any }) => {
            const mensagem = JSON.parse(message.body);
            console.log(mensagem);
            if (mensagem.type === MessageType.pergunta) this.perguntaAtual.next(message.body);
            if (mensagem.type === MessageType.estadoTabuleiro) this.estadoTabuleiro.next(message.body)
        }

        return new Promise((resolve, reject) => {
            this.stompClient.connect(headers, () => {
                this.stompClient.subscribe(`/topic/jogo/${this.roomID}`, (message: { body: any }) => {
                    redirectByMessageType(message);
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

    pedirEstadoTabuleiro() {

        const dto: Dto = {
            salaID: this.roomID,
            aluno: null,
            chatMessage: null,
            pergunta: null,
            resposta: null,
            verificaResposta: null,
            type: MessageType.estadoTabuleiro
        }
        this.stompClient.send(`app/jogo/${this.roomID}`, {}, JSON.stringify(dto));
    }

  isConnected(): boolean {
    return this.stompClient && this.stompClient.connected;
  }
}
