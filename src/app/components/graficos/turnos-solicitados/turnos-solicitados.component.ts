import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/classes/turno';
import { GraficosService } from 'src/app/services/graficos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-turnos-solicitados',
  templateUrl: './turnos-solicitados.component.html',
  styleUrls: ['./turnos-solicitados.component.scss'],
})
export class TurnosSolicitadosComponent implements OnInit {
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
  unsub: Subscription = new Subscription();

  dia1: number = 1;
  mes1: number = 1;
  dia2: number = 31;
  mes2: number = 12;

  ngOnInit() {
    this.unsub.unsubscribe();
    this.unsub = this.graph
      .traerTurnosPorMedicoEnLapso()
      .subscribe((data: Turno[]) => {
        this.data = data;

        this.buscar();
      });
  }

  buscar() {
    this.pieChartDatasets = [];
    this.pieChartLabels = [];
    const filtrados = this.data.filter((d, i) => {
      return this.graph.compararFechas(
        d.horario.dia,
        d.horario.mes,
        this.dia1,
        this.dia2,
        this.mes1,
        this.mes2
      );
    });

    const especialistas: string[] = [];
    filtrados.forEach((t) => {
      especialistas.push(t.especialista.nombre + ' ' + t.especialista.apellido);
    });
    const especialistasSinRepeticiones = especialistas.filter((d, i) => {
      return especialistas.indexOf(d) === i;
    });

    especialistasSinRepeticiones.forEach((d, i) => {
      this.pieChartDatasets[i] = {
        data: [],
        label: d,
        backgroundColor: '',
      };
      this.pieChartDatasets[i].data.push(0);
    });

    this.pieChartLabels = [];
    this.pieChartLabels.push('Turnos');
    especialistasSinRepeticiones.forEach((turno, index) => {
      for (let i = 0; i < filtrados.length; i++) {
        if (
          turno ===
          filtrados[i].especialista.nombre +
            ' ' +
            filtrados[i].especialista.apellido
        ) {
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
  }

  descargarTurnos() {
    const result: any = [];

    const especialistas: string[] = [];
    const filtrados = this.data.filter((d, i) => {
      return this.graph.compararFechas(
        d.horario.dia,
        d.horario.mes,
        this.dia1,
        this.dia2,
        this.mes1,
        this.mes2
      );
    });
    filtrados.forEach((t) => {
      especialistas.push(t.especialista.nombre + ' ' + t.especialista.apellido);
    });

    const especialistasSinRepeticiones = especialistas.filter((d, i) => {
      return especialistas.indexOf(d) === i;
    });

    especialistasSinRepeticiones.forEach((d, i) => {
      result[i] = { turnos: 0, especialista: d };
    });

    especialistasSinRepeticiones.forEach((turno, index) => {
      for (let i = 0; i < filtrados.length; i++) {
        if (
          turno ===
          filtrados[i].especialista.nombre +
            ' ' +
            filtrados[i].especialista.apellido
        ) {
          result[index].turnos += 1;
        }
      }
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(result);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'TURNOS');

    XLSX.writeFile(
      book,
      `Turnos por especialista entre ${this.dia1} del ${this.mes1} y ${this.dia2} del ${this.mes2}.xlsx`
    );
  }
}
