import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthorizationService } from '../services/authorization.service';
import { ColorsService } from '../services/colors.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public contacts: User[];
  currentUserId: number;

  public colorFirst!: string;
  public colorSecond!: string;

  constructor(
    private dataService: DataService, 
    private router: Router,
    private authorizationService: AuthorizationService,
    private colorsService: ColorsService) {
      this.currentUserId = 0;
      this.contacts = [];
  }

  ngOnInit(): void {
    this.currentUserId = this.authorizationService.getAuthorizedUserId() as number;
      this.contacts = this.dataService.getUsersWithoutOne(this.currentUserId);
      this.colorFirst = this.colorsService.getColorsForCurrentUser()[0];
      this.colorSecond = this.colorsService.getColorsForCurrentUser()[1];
  }

  openChat(usedId: number) {
    let chatId = this.dataService.getChatId(this.currentUserId, usedId);
    chatId = chatId != undefined
      ? chatId
      : this.dataService.createChat([usedId, this.currentUserId]);
    
    this.router.navigate(['/chats', chatId]);
  }
}
