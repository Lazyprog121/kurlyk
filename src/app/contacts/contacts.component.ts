import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public contacts: any;

  constructor(
    private dataService: DataService, 
    private router: Router,
    private authorizationService: AuthorizationService
    ) { }

  ngOnInit(): void {
    const userId = this.authorizationService.getAuthorizedUserId() as number;
    const usersContacts = this.dataService.getUsersWithoutOne(userId);

    let chatIdCounter = 0;
    this.contacts = usersContacts.map(x => ({
      name: x.name + ' ' + x.surname,
      chatId: chatIdCounter++
    }));
  }

  openChat(chatId: number) {
    this.router.navigate(['/chats', chatId]);
  }
}
