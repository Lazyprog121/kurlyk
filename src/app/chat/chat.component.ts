import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models/chat';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatId: number;;
  messages: Message[];

  constructor(private dataService: DataService,
    private route: ActivatedRoute) {
    this.messages = [];
    this.chatId = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.chatId = Number(params['id']);
      this.loadMessages(this.chatId);
    });
  }

  loadMessages(chatId: number) {
    this.messages = this.dataService.getChatMessages(chatId);
  }
}
