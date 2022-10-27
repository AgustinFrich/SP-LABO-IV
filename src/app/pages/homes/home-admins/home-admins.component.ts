import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-admins',
  templateUrl: './home-admins.component.html',
  styleUrls: ['./home-admins.component.scss']
})
export class HomeAdminsComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  Salir() {
    this.auth.Salir();
  }

}
