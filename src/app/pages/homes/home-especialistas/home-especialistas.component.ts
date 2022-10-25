import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-especialistas',
  templateUrl: './home-especialistas.component.html',
  styleUrls: ['./home-especialistas.component.scss']
})
export class HomeEspecialistasComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  Salir()  {
    this.auth.Salir();
  }
}
