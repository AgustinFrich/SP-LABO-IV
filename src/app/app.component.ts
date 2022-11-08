import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, public loading: LoadingService) {}

  ngOnInit() {
    // this.loading.loading = true;
    // setTimeout(() => {
    this.auth.Cambio();
    // }, 3000)
  }
}
