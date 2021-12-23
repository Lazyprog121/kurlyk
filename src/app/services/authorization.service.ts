import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

  userIsAuthorized(): Observable<boolean> {
    return of(this.authorizedUserId !== undefined);
  }

  signIn(usedId: number): void {
    this.authorizedUserId = usedId;
  }

  signOut(): void {
    this.authorizedUserId = undefined;
  }
}
