import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppConstants } from '../app.constants';
import { ColorsService } from './colors.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private authorizedUserId: number | undefined;

  constructor(private dataService: DataService, 
    private router: Router) { 
    this.authorizedUserId = 0;
  }

  getAuthorizedUserId(): number | undefined {
    return this.authorizedUserId;
  }

  userIsAuthorized(): Observable<boolean> {
    return of(this.authorizedUserId !== undefined);
  }

  signIn(email: string, password: string): boolean {
    const currentPassword = this.dataService.getUserPassword(email);
    if (currentPassword && currentPassword === password) {
      this.authorizedUserId = this.dataService.getUserId(email);
      this.router.navigate(['/home']);
      return true;
    }

    return false;
  }

  signOut(): void {
    this.authorizedUserId = undefined;
  }
}
