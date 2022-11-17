import { Component, Input, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/classes/historia-clinica';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-mi-historia',
  templateUrl: './mi-historia.component.html',
  styleUrls: ['./mi-historia.component.scss'],
})
export class MiHistoriaComponent implements OnInit {
  @Input() historia?: HistoriaClinica;
  mostrar = false;
  constructor(public auth: AuthService, private turnosServie: TurnosService) {}

  ngOnInit(): void {}

  cambio() {
    this.mostrar = !this.mostrar;
  }

  descargarTurnos(usuario: Usuario) {
    this.turnosServie.getMisTurnos(usuario).forEach((data) => {
      data.forEach((data: any) => {
        data.especialidad = data.especialidad.nombre;
        data.especialista = data.especialista.nombre;
        delete data.dinamicos;
        delete data.idHistoria;
        delete data.id;
        delete data.paciente;
        delete data.finalizar;
        data.horario =
          data.horario.dia +
          '/' +
          data.horario.mes +
          ' - ' +
          data.horario.hora +
          ':' +
          data.horario.minuto;
      });

      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

      const book: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, worksheet, 'TURNOS');

      XLSX.writeFile(
        book,
        'Turnos de de ' + usuario.nombre + ' ' + usuario.apellido + '.xlsx'
      );
    });
  }
}
