import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateSala} from "../../models/create-sala";
import {Jogo} from "../../models/Jogo";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {SpinnerService} from "../spinnerService/spinner.service";
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JogoService {
    private readonly urlHost: string = 'http://localhost:8080';
    private readonly endpointJogoRest = 'api/jogo';
    private stompClient: any;
    public perguntaAtual = new Subject<string>();

    constructor(public http: HttpClient, public spinner: SpinnerService) {
        this.spinner.show();
        this.initConnectionSocket();
        this.spinner.hide();
    }

    criarSala(dadosSala: CreateSala): Observable<any> {
        const create: string = 'create';
        return this.http.post<Jogo>(`${this.urlHost}/${this.endpointJogoRest}/${create}`, dadosSala);
    }

    conectarAosSockets(roomId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.stompClient.connect({}, () => {
                this.stompClient.subscribe(`/topic/jogo/${roomId}`, (message: { body: string }) => {
                    console.log(message.body);
                    this.perguntaAtual.next(message.body); // Emitindo a pergunta recebida
                });
                resolve();
            }, (error: any) => {
                reject(error);
            });
        })
    }


    solicitarPergunta(roomId: string) {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send(`app/jogo/get-pergunta/${roomId}`, {});
        } else {
            console.error("WebSocket connection is not established.");
        }
    }

    private initConnectionSocket() {
        const socketAdress = `${this.urlHost}/chat-socket`;
        const socket = new SockJS(socketAdress);
        this.stompClient = Stomp.over(socket);
    }
}
