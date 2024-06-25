import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SpinnerService} from "./spinnerService/spinner.service";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

@Injectable({
  providedIn: 'root'
})
export class TabuleiroService {
  private readonly urlHost: string = 'http://ec2-52-90-189-121.compute-1.amazonaws.com:8081';
  private readonly endpointJogoRest = 'api/jogo';
  private stompClient: any;
  public perguntaAtual = new Subject<string>();

  constructor(public http: HttpClient, public spinner: SpinnerService) {
    this.spinner.show();
    this.initConnectionSocket();
    this.spinner.hide();
  }

  conectarAosSockets(salaID: string): Promise<void> {
    console.log(salaID);
    return new Promise((resolve, reject) => {
      this.stompClient.connect({}, () => {
        this.stompClient.subscribe(`/topic/jogo/respostas-alunos/${salaID}`, (message: any) => {
          console.log(message.body);
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
}
