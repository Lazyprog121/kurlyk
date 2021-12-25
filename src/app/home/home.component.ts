import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public colorFirst!: string;
  public colorSecond!: string;

  constructor(private colorsService: ColorsService) { }

  ngOnInit(): void {
    this.colorFirst = this.colorsService.getColorsForCurrentUser()[0];
    this.colorSecond = this.colorsService.getColorsForCurrentUser()[1];
  }
}
