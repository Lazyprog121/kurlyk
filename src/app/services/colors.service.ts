import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(private constants: AppConstants) { }

  getColorsForCurrentUser() {
    // TODO: get colors by user's type

    return [this.constants.childFirst, this.constants.childSecond];
  }
}
