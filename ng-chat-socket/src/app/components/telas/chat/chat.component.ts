import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatMessage} from '../../../models/chat-message';
import {ActivatedRoute} from '@angular/router';
import {FormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {ChatService} from '../../../services/chatService/chat.service';
import {ButtonComponent} from '../../inputs/button/button.component';
import {InputComponent} from '../../inputs/input/input.component';
import {FormComponent} from '../../form/form/form.component';
import {MessageType} from '../../../models/MessageType';
import {Dto} from '../../../models/dto';
import {Pergunta} from '../../../models/pergunta';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent extends FormComponent implements OnInit, OnDestroy {
  constructor(public chatService: ChatService,
              public route: ActivatedRoute) {
    super();
    this.form = this.formBuilder.group({
      mensagem: [null, Validators.required],
    });
  }

  salaID: string = '';
  messageInput: string = '';
  userID: string = '';
  listaMensagens: any[] = [];

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['userID'];
    this.salaID = this.route.snapshot.params['salaID'];
    this.chatService.initConnectionSocket(this.userID, this.salaID);
    this.listenerMessage();
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  sendMessage() {
    if (this.messageInput) {
      const dto: Dto = {
        salaID: this.salaID,
        chatMessage: this.messageInput,
        aluno: {id: null, nome: this.userID},
        resposta: null,
        verificaResposta: null,
        pergunta: {} as Pergunta,
        type: MessageType.mensagem
      }
      this.chatService.sendMessage(this.salaID, dto);
    }
    this.messageInput = '';
  }

  sendGameStartedMessage() {
    this.chatService.sendMessageToGameStartedEndpoint(this.salaID);
  }

  listenerMessage() {
    this.chatService.getMessageSubject().subscribe((dtos: Dto[]) => {
      const mensagens = dtos.filter(dto => dto.type === MessageType.mensagem);
      this.listaMensagens = mensagens;
      console.log(this.listaMensagens);
    });
  }
}
