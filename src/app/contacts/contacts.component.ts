import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthorizationService } from '../services/authorization.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public contacts: User[];
  currentUserId: number;

  constructor(private dataService: DataService,
    private router: Router,
    private authorizationService: AuthorizationService) {
      this.currentUserId = 0;
      this.contacts = [];
  }

  ngOnInit(): void {
    this.currentUserId = this.authorizationService.getAuthorizedUserId() as number;
    this.contacts = this.dataService.getUsersWithoutOne(this.currentUserId);
  }

  openChat(usedId: number) {
    let chatId = this.dataService.getChatId(this.currentUserId, usedId);
    chatId = chatId != undefined
      ? chatId
      : this.dataService.createChat([usedId, this.currentUserId]);
    
    this.router.navigate(['/chats', chatId]);
  }
}
