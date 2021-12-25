import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatViewModel } from '../models/chatViewModel';
import { AuthorizationService } from '../services/authorization.service';
import { ColorsService } from '../services/colors.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  chats: ChatViewModel[];

  public colorFirst!: string;
  public colorSecond!: string;

  constructor(private dataService: DataService,
    private authService: AuthorizationService,
    private router: Router,
    private colorsService: ColorsService) {
    this.chats = [];
  }

  ngOnInit(): void {
    this.loadChats();

    this.colorFirst = this.colorsService.getColorsForCurrentUser()[0];
    this.colorSecond = this.colorsService.getColorsForCurrentUser()[1];
  }

  loadChats() {
    const userId = this.authService.getAuthorizedUserId();
    if (userId != undefined) {
      this.chats = this.dataService.getUserChats(userId);
    }
  }

  openChat(id: number) {
    this.router.navigate(['/chats', id]);
  }
}
