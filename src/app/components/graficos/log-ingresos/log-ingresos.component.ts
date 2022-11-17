import { Component, OnInit } from '@angular/core';
import { GraficosService, Ingresos } from 'src/app/services/graficos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-log-ingresos',
  templateUrl: './log-ingresos.component.html',
  styleUrls: ['./log-ingresos.component.scss'],
})
export class LogIngresosComponent implements OnInit {
  ingresos: Ingresos[] = [];
  verLogs: boolean = false;

  constructor(private graph: GraficosService) {}

  ngOnInit(): void {
    this.graph.traerIngresos().subscribe((data) => {
      this.ingresos = data;
    });
  }

  descargarLogs() {
    const data: any = [];
    this.ingresos.forEach((element) => {
      data.push({
        momento: element.momento.toDate().toLocaleString(),
        usuario: element.usuario,
      });
    });
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'INGRESOS');

    XLSX.writeFile(book, 'ingresos.xlsx');
  }
}
