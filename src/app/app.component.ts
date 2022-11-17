import { GraficosService } from './services/graficos.service';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { homesAnimation, slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation, homesAnimation],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    public loading: LoadingService,
    private contexts: ChildrenOutletContexts,
    private graph: GraficosService
  ) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  ngOnInit() {
    // this.loading.loading = true;
    // setTimeout(() => {
    this.auth.Cambio();
    // }, 3000)
    console.log(this.graph.compararFechas(11, 11, 10, 20, 11, 11)); // TRUE
    console.log(this.graph.compararFechas(10, 11, 10, 20, 11, 11)); // TRUE
    console.log(this.graph.compararFechas(20, 11, 10, 20, 11, 11)); // TRUE
    console.log(this.graph.compararFechas(1, 11, 10, 20, 11, 11)); // FALSE
    console.log(this.graph.compararFechas(21, 11, 10, 20, 11, 11)); // FALSE
  }
}
