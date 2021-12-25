import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models/chat';
import { User } from '../models/user';
import { AuthorizationService } from '../services/authorization.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatId: number;;
  messages: Message[];
  currentUserId: number;
  chatCompanion: User | undefined;
  messageControl: FormControl;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private authService: AuthorizationService) {
    this.messages = [];
    this.chatId = 0;
    this.currentUserId = 0;
    this.chatCompanion = undefined;
    this.messageControl = new FormControl('');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.chatId = Number(params['id']);
      this.loadMessages(this.chatId);
      this.loadCurrentUserId();
      this.loadCompanion();
    });
  }

  loadMessages(chatId: number) {
    this.messages = this.dataService.getChatMessages(chatId);
  }

  loadCurrentUserId() {
    const id = this.authService.getAuthorizedUserId();
    if(id) {
      this.currentUserId = id;
    }
  }

  loadCompanion() {
    this.chatCompanion = this.dataService.getChatCompanion(this.chatId, this.currentUserId);
  }

  createMessage() {
    const date = new Date();

    const messageId = this.dataService.createMessage(this.chatId,
      this.currentUserId,
      this.messageControl.value,
      date);

    this.messages.push({
      id: messageId,
      userId: this.currentUserId,
      message: this.messageControl.value,
      date: date
    });

    this.messageControl.setValue('');
  }
}
