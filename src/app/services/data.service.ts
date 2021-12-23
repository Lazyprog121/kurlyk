import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private users: User[];

  constructor() 
  {
    this.users = [];
  }

  createUser(user: User): void {
    this.users.push(user);
  }
}
