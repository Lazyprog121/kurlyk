import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private users: User[];


  constructor() {
    this.users = [
      { id: 0, name: 'Artur', surname: 'Sod', age: 19, email: 'a', password: 'a' }
    ];
  }

  createUser(user: User): number {
    const id = this.users.length;
    user.id = id;
    this.users.push(user);
    return id;
  }

  getUserPassword(email: string): string | undefined {
    const user = this.users.find(x => x.email === email);
    return user?.password;
  }

  getUserId(email: string): number | undefined {
    return this.users.find(x => x.email === email)?.id;
  }
}
