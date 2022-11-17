import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-pacientes',
  templateUrl: './home-pacientes.component.html',
  styleUrls: ['./home-pacientes.component.scss'],
})
export class HomePacientesComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  Salir() {
    this.auth.Salir();
  }
}
