import { Component, Input, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/classes/historia-clinica';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mi-historia',
  templateUrl: './mi-historia.component.html',
  styleUrls: ['./mi-historia.component.scss'],
})
export class MiHistoriaComponent implements OnInit {
  @Input() historia?: HistoriaClinica;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
