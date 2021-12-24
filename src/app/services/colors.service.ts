import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  colorChanged$: Subject<string> = new Subject<string>();
  constructor(private constants: AppConstants) { }

  getColorsForCurrentUser() {
    // TODO: get colors by user's type

    return [this.constants.childFirst, this.constants.childSecond];
  }

  setColor(color: string): void {
    this.colorChanged$.next(color);
  }
}
