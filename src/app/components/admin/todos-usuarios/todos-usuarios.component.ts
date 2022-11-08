import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-todos-usuarios',
  templateUrl: './todos-usuarios.component.html',
  styleUrls: ['./todos-usuarios.component.scss'],
})
export class TodosUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private utils: UtilsService) {}

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
}
