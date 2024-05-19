import {Component, OnInit} from '@angular/core';
import {ChatMessage} from "../../../models/chat-message";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ChatService} from "../../../services/chatService/chat.service";
import {ButtonComponent} from "../../inputs/button/button.component";
import {InputComponent} from "../../inputs/input/input.component";
import {FormComponent} from "../../form/form/form.component";

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
  styleUrl: './chat.component.scss'
})
export class ChatComponent extends FormComponent implements OnInit {
  constructor(public chatService: ChatService,
              public route: ActivatedRoute) {
    super();
    this.form = this.formBuilder.group({
      mensagem: [null, Validators.required],
    });
  }

  roomId: string = '';
  messageInput: string = '';
  userId: string = '';
  listaMensagens: any[] = [];

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.roomId = this.route.snapshot.params['roomId'];

    this.chatService.joinRoom(this.roomId);
    this.listenerMessage();
  }

  sendMessage() {
    const mensagem = {
      mensagem: this.messageInput,
      user: this.userId
    } as ChatMessage;
    this.chatService.sendMessage(this.roomId, mensagem);
    this.messageInput = '';
  }

  sendGameStartedMessage() {
    this.chatService.sendMessageToGameStartedEndpoint(this.roomId);
  }


  listenerMessage() {
    this.chatService.getMessageSubject().subscribe((mensagem: ChatMessage[]) => {

      if (mensagem.length && mensagem[mensagem.length - 1].mensagem.includes('O jogo vai começar'))
        window.location.href = `http://localhost:5173/${this.roomId}`;
      this.listaMensagens = mensagem;
    });
  }


}
