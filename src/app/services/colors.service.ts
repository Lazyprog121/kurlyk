import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConstants } from '../app.constants';
import { AuthorizationService } from './authorization.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  constructor(private constants: AppConstants,
    private dataService: DataService,
    private authorizationService: AuthorizationService) { }

  getColorsForCurrentUser() {
    const userId = this.authorizationService.getAuthorizedUserId() as number;
    const age = this.dataService.getUserAge(userId) as number;

    if (age < 18) {
      return [this.constants.childFirst, this.constants.childSecond];
    } else if (age > 45) {
      return [this.constants.oldFirst, this.constants.oldSecond];
    } else {
      return [this.constants.youngFirst, this.constants.youngSecond];
    }
  }
}
