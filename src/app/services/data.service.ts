import { Injectable } from '@angular/core';
import { Chat, ChatToMessage, Message } from '../models/chat';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private users: User[];
  private chats: Chat[];
  private messages: Message[];
  private chatsToMessages: ChatToMessage[];


  constructor() {
    this.users = [
      { id: 0, name: 'Artur', surname: 'Sod', age: 19, email: 'a', password: 'a' },
      { id: 1, name: 'Dania', surname: 'Kotia', age: 10, email: 'dania_kotiai@gmail.com', password: '12345678' },
    ];
    this.chats = [];
    this.messages = [];
    this.chatsToMessages = [];
  }

  createUser(user: User): number {
    const id = this.users.length;
    user.id = id;
    this.users.push(user);
    return id;
  }

  getUser(userId: number): User | undefined {
    return this.users.find(x => x.id === userId);
  }

  getUserPassword(email: string): string | undefined {
    const user = this.users.find(x => x.email === email);
    return user?.password;
  }

  getUserId(email: string): number | undefined {
    return this.users.find(x => x.email === email)?.id;
  }

  getUserAge(id: number): number | undefined {
    return this.users.find(x => x.id === id)?.age;
  }

  createChat(firstUserId: number, secondUserId: number): number {
    const id = this.chats.length;
    this.chats.push({ id: id, firstUserId: firstUserId, secondUserId: secondUserId });
    return id;
  }
}
