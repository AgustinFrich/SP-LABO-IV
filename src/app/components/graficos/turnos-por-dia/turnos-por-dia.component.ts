import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Turno } from 'src/app/classes/turno';
import { GraficosService } from 'src/app/services/graficos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-turnos-por-dia',
  templateUrl: './turnos-por-dia.component.html',
  styleUrls: ['./turnos-por-dia.component.scss'],
})
export class TurnosPorDiaComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  constructor(private graph: GraficosService) {}

  public pieChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  public pieChartLabels: string[] = [];
  public pieChartDatasets: any[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  data: Turno[] = [];
  ngOnInit() {
    this.graph.traerTurnosPorDia('22', '10').subscribe((data: Turno[]) => {
      this.pieChartDatasets = [];
      this.pieChartLabels = [];
      this.data = data;
      const dias: string[] = [];
      data.forEach((t) => {
        dias.push(t.horario.dia + '/' + t.horario.mes);
      });

      const diasSinRepeticiones = dias.filter((d, i) => {
        return dias.indexOf(d) === i;
      });

      diasSinRepeticiones.forEach((d, i) => {
        this.pieChartDatasets[i] = { data: [], label: d, backgroundColor: '' };
        this.pieChartDatasets[i].data.push(0);
      });

      this.pieChartLabels.push('Turnos');
      diasSinRepeticiones.forEach((turno, index) => {
        for (let i = 0; i < data.length; i++) {
          if (turno === data[i].horario.dia + '/' + data[i].horario.mes) {
            this.pieChartDatasets[index].data[0] += 1;
          }
          this.pieChartDatasets[index].backgroundColor = `rgba(${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)},${Math.floor(
            Math.random() * 255
          )}, 1)`;
        }
      });
      this.chart?.update();
    });
  }

  descargarTurnos() {
    const result: any = [];
    const dias: string[] = [];

    this.data.forEach((t) => {
      dias.push(t.horario.dia + '/' + t.horario.mes);
    });

    const diasSinRepeticiones = dias.filter((d, i) => {
      return dias.indexOf(d) === i;
    });

    diasSinRepeticiones.forEach((d, i) => {
      result[i] = { turnos: 0, dia: d };
    });

    diasSinRepeticiones.forEach((turno, index) => {
      for (let i = 0; i < this.data.length; i++) {
        if (
          turno ===
          this.data[i].horario.dia + '/' + this.data[i].horario.mes
        ) {
          result[index].turnos += 1;
        }
      }
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(result);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'TURNOS');

    XLSX.writeFile(book, 'Turnos por dia.xlsx');
  }
}
