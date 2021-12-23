import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';
import { ColorsService } from './services/colors.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'kurlyk';
  public colorFirst!: string;
  public colorSecond!: string;

  constructor(private colorsService: ColorsService,
    private authService: AuthorizationService) { }

  ngOnInit(): void {
    this.colorFirst = this.colorsService.getColorsForCurrentUser()[0];
  }

  userIsAuthorized(): boolean {
    return this.authService.getAuthorizedUserId() != undefined;
  }

  signOut() {
    this.authService.signOut();
  }
}
