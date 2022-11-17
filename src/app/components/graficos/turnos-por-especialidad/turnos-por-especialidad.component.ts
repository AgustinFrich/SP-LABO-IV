import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/classes/turno';
import { GraficosService } from 'src/app/services/graficos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-turnos-por-especialidad',
  templateUrl: './turnos-por-especialidad.component.html',
  styleUrls: ['./turnos-por-especialidad.component.scss'],
})
export class TurnosPorEspecialidadComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  constructor(private graph: GraficosService) {}
  data: Turno[] = [];

  public pieChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  public pieChartLabels: string[] = [];
  public pieChartDatasets: any[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  unsub: Subscription = new Subscription();
  ngOnInit() {
    this.unsub = this.graph
      .traerTurnosPorEspecialidad('Doctor')
      .subscribe((data: Turno[]) => {
        this.pieChartDatasets = [];
        this.pieChartLabels = [];
        this.data = data;

        const especialidades: string[] = [];
        data.forEach((t) => {
          especialidades.push(t.especialidad.nombre);
        });

        const especialidadesSinRepeticiones = especialidades.filter((d, i) => {
          return especialidades.indexOf(d) === i;
        });

        especialidadesSinRepeticiones.forEach((d, i) => {
          this.pieChartDatasets[i] = {
            data: [],
            label: d,
            backgroundColor: '',
          };
          this.pieChartDatasets[i].data.push(0);
        });

        this.pieChartLabels.push('Turnos');
        especialidadesSinRepeticiones.forEach((turno, index) => {
          for (let i = 0; i < data.length; i++) {
            if (turno === data[i].especialidad.nombre) {
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

    const especialidades: string[] = [];
    this.data.forEach((t) => {
      especialidades.push(t.especialidad.nombre);
    });

    const especialidadesSinRepeticiones = especialidades.filter((d, i) => {
      return especialidades.indexOf(d) === i;
    });

    especialidadesSinRepeticiones.forEach((d, i) => {
      result[i] = { turnos: 0, especialidad: d };
    });

    especialidadesSinRepeticiones.forEach((turno, index) => {
      for (let i = 0; i < this.data.length; i++) {
        if (turno === this.data[i].especialidad.nombre) {
          result[index].turnos += 1;
        }
      }
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(result);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'TURNOS');

    XLSX.writeFile(book, 'Turnos por especialidad.xlsx');
  }
}
