import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [slideInAnimation],
})
export class HomePageComponent implements OnInit {
  registro = false;
  constructor() {}

  ngOnInit(): void {}
}
