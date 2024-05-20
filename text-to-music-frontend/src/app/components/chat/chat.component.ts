import { Component } from '@angular/core';
import {NgClass, NgFor, NgOptimizedImage} from "@angular/common";
import {ChatService} from "../../services/chat.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, FormsModule, NgClass, NgOptimizedImage],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  userMessage!: string;
  assistantReply!: string;
  chatMessages: { role: string, content: string }[] = [
    { role: 'assistant', content: 'Welcome to the system!' }
  ];

  constructor(private chatService: ChatService){}

  sendMessage() {
    const userMessage = this.userMessage;
    this.chatMessages.push({ role: 'user', content: userMessage });
    this.chatService.sendMessage(this.userMessage)
      .subscribe(response => {
        this.assistantReply = response.audioUrl;
        this.chatMessages.push({ role: 'assistant', content: this.assistantReply });
        this.userMessage = '';
      });
  }
}
