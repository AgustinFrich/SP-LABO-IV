import { Component, HostBinding, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { homesAnimation, slideInAnimation } from 'src/app/animations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-admins',
  templateUrl: './home-admins.component.html',
  styleUrls: ['./home-admins.component.scss'],
  animations: [homesAnimation],
})
export class HomeAdminsComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private contexts: ChildrenOutletContexts
  ) {}

  @HostBinding('@homesAnimations')
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  ngOnInit(): void {}

  Salir() {
    this.auth.Salir();
  }
}
