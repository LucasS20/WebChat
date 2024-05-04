import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {ChatMessage} from "../../models/chat-message";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  constructor(private chatService: ChatService,
              private route: ActivatedRoute) {
  }

  isModalOpen: boolean = true;
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
    console.log(mensagem);
    this.chatService.sendMessage(this.roomId, mensagem);
    this.messageInput = '';
  }

  listenerMessage() {
    this.chatService.getMessageSubject().subscribe((mensagem: ChatMessage[]) => {
      this.listaMensagens = mensagem;
    });
  }
}
