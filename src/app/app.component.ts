import { Component, OnInit } from '@angular/core';
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

  constructor(private colorsService: ColorsService) { }

  ngOnInit(): void {
    this.colorFirst = this.colorsService.getColorsForCurrentUser()[0];
  }


}
