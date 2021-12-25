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
      { id: 0, name: 'Artur', surname: 'Sodolskyi', age: 19, email: 'next.tmz.mit@gmail.com', password: '12345678a!' },
      { id: 1, name: 'Danya', surname: 'Kot', age: 20, email: 'daniakot@gmail.com', password: '12345678a!' },
      { id: 2, name: 'Roma', surname: 'Kasianov', age: 20, email: 'romakas@gmail.com', password: '12345678a!' },
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
      { id: 0, userId: 1, message: 'Hi Artur!', date: new Date() },
      { id: 1, userId: 0, message: 'Hi Danya!', date: new Date() },
      { id: 2, userId: 1, message: "What's up!", date: new Date() }

    ];
    this.chatsToMessages = [
      { chatId: 0, messageId: 0 },
      { chatId: 0, messageId: 1 },
      { chatId: 0, messageId: 2 },
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
      this.chatsToUsers.push({ userId: userId, chatId: chatId });
    })
    return chatId;
  }

  getUserChats(userId: number): ChatViewModel[] {
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

  getChatCompanion(chatId: number, currentUserId: number): User | undefined {
    const companionId = this.chatsToUsers.find(x => x.chatId === chatId && x.userId !== currentUserId)?.userId;
    if (companionId != undefined) {
      const companion = this.users.find(x => x.id === companionId)
      return companion;
    }
    return undefined;
  }

  getChatId(currentUserId: number, userId: number): number | undefined {
    const chatIds = this.chatsToUsers.filter(x => x.userId === currentUserId).map(x => x.chatId);
    for (let i = 0; i < chatIds.length; i++) {
      const chatId = chatIds[i];
      const chat = this.chatsToUsers.find(x => x.chatId === chatId && x.userId === userId);
      if (chat != undefined) {
        return chat.chatId;
      }
    }
    return undefined;
  }

  createMessage(chatId: number, userId: number, message: string, date: Date): number {
    const id = this.messages.length;
    this.messages.push({
      id: id,
      userId: userId,
      message: message,
      date: date
    });
    this.chatsToMessages.push({
      chatId: chatId,
      messageId: id
    });

    return id;
  }
}
