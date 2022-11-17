import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UtilsService } from 'src/app/services/utils.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-todos-usuarios',
  templateUrl: './todos-usuarios.component.html',
  styleUrls: ['./todos-usuarios.component.scss'],
})
export class TodosUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private utils: UtilsService,
    private turnosServie: TurnosService
  ) {}

  ngOnInit(): void {
    this.utils.getUsuarios().subscribe((d) => {
      this.usuarios = d as Usuario[];
    });
  }

  descargarExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.usuarios);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'USUARIOS');

    XLSX.writeFile(book, 'Usuarios.xlsx');
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
