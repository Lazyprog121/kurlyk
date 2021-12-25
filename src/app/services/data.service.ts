import { Injectable } from '@angular/core';
import { Chat, ChatToMessage, Message, UserToChat } from '../models/chat';
import { ChatViewModel } from '../models/chatViewModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private users: User[];
  private chats: Chat[];
  private chatsToUsers: UserToChat[];
  private messages: Message[];
  private chatsToMessages: ChatToMessage[];


  constructor() {
    this.users = [
      { id: 0, name: 'Artur', surname: 'Sod', age: 19, email: 'a', password: 'a' },
      { id: 1, name: 'Danya', surname: 'Kot', age: 20, email: 'b', password: 'a' }
    ];
    this.chats = [
      { id: 0 },
      { id: 1 },
      { id: 2 }
    ];
    this.chatsToUsers = [
      { userId: 0, chatId: 0 },
      { userId: 1, chatId: 0 }
    ];
    this.messages = [
      { id: 0, userId: 1, message: 'Test message.', date: new Date() }
    ];
    this.chatsToMessages = [
      { chatId: 0, messageId: 0 }
    ];
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

  createChat(userIds: number[]): number {
    const chatId = this.chats.length;

    this.chats.push({ id: chatId });
    userIds.forEach(userId => {
      this.chatsToUsers.push({ chatId: chatId, userId: userId });
    })
    return chatId;
  }

  getUserChats(userId: number): ChatViewModel[] 
  {
    const chatIds = this.chatsToUsers
      .filter(x => x.userId === userId)
      .map(x => x.chatId);

    const userIds = this.chatsToUsers
      .filter(x => x.userId !== userId && chatIds.includes(x.chatId))
      .map(x => x.userId);

    const result: ChatViewModel[] = [];
    for (let i = 0; i < chatIds.length; i++) {
      const user = this.users.find(x => x.id === userIds[i]);
      const messageId = this.chatsToMessages.reverse().find(x => x.chatId == chatIds[i])?.messageId;
      if (user && messageId != undefined) {
        const message = this.messages.find(x => x.id === messageId);
        if (message) {
          result.push(
            {
              chatId: chatIds[i],
              userFullName: user.name + ' ' + user.surname,
              message: message.message,
              date: message.date
            }
          );
        }
      }
    }
    return result;
  }

  getChatMessages(chatId: number): Message[] {
    let result: Message[] = [];
    const messageIds = this.chatsToMessages.filter(x => x.chatId === chatId).map(x => x.messageId);
    if (messageIds) {
      messageIds.forEach(messageId => {
        const message = this.messages.find(x => x.id === messageId);
        if (message) {
          result.push(message);
        }
      });
    }
    
    return result;
  }

  getUsersWithoutOne(userId: number): User[] {
    return this.users.filter(x => x.id !== userId);
  }
}
