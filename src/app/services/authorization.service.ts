import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private authorizedUserId: number | undefined;

  constructor() { 
    this.authorizedUserId = undefined;
  }

  getAuthorizedUserId(): number | undefined {
    return this.authorizedUserId;
  }

  signIn(usedId: number): void {
    this.authorizedUserId = usedId;
  }

  signOut(): void {
    this.authorizedUserId = undefined;
  }
}
