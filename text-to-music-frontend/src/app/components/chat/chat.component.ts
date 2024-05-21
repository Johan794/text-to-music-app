import { Component } from '@angular/core';
import {NgClass, NgFor, NgIf, NgOptimizedImage} from "@angular/common";
import {ChatService} from "../../services/chat.service";
import {FormsModule} from "@angular/forms";
import { NgxLoadingModule } from "ngx-loading";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NgClass, NgOptimizedImage, NgxLoadingModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  userMessage!: string;
  assistantReply!: string;
  loading = false;
  chatMessages: { role: string, content: string, type: string }[] = [
    { role: 'assistant', content: 'Welcome to the Text to Music App!', type: 'text' }
  ];

  constructor(private chatService: ChatService){}

  sendMessage() {
    this.loading = true;
    const userMessage = this.userMessage;
    this.chatMessages.push({ role: 'user', content: userMessage, type: 'text'});
    this.chatService.sendMessage(this.userMessage)
      .subscribe( {
        next: (response: any) => {
          this.assistantReply = response.audioUrl;
          this.chatMessages.push({ role: 'assistant', content: this.assistantReply, type: 'audio'});
          this.userMessage = '';
          this.loading = false;
        },
        error: (error: any) => {
          this.assistantReply = 'Sorry, I am unable to process your request at the moment. Please try again later.';
          this.chatMessages.push({ role: 'assistant', content: this.assistantReply, type: 'text'});
          this.loading = false;
        }
      });
  }
}
