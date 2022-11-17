import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Turno } from 'src/app/classes/turno';
import { GraficosService, Ingresos } from 'src/app/services/graficos.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
