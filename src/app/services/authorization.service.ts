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
    private router: Router,
    private constants: AppConstants,
    private colorsService: ColorsService) { 
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
      if (this.authorizedUserId != undefined) {
        this.setInterfaceColor(this.authorizedUserId);
      }
      this.router.navigate(['/home']);
      return true;
    }

    return false;
  }

  setInterfaceColor(userId: number) {
    const age = this.dataService.getUserAge(userId);
    if (age) {
      let firstColor = ''; 
      if (age < 18) {
        firstColor = this.constants.childFirst;
      } else if (age > 18 && age < 51) {
        firstColor = this.constants.youngFirst;
      } else {
        firstColor = this.constants.oldFirst;
      }
      this.colorsService.colorChanged$.next(firstColor);
    }
  }

  signOut(): void {
    this.authorizedUserId = undefined;
  }
}
