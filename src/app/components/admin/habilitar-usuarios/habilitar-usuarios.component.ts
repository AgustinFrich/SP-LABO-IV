import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/classes/especialista';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-habilitar-usuarios',
  templateUrl: './habilitar-usuarios.component.html',
  styleUrls: ['./habilitar-usuarios.component.scss'],
})
export class HabilitarUsuariosComponent implements OnInit {
  especialistas: Especialista[] = [];

  constructor(private utils: UtilsService) {}

  ngOnInit(): void {
    this.utils.getEspecialistasNoAprobados().subscribe((doc) => {
      this.especialistas = doc as Especialista[];
      console.log(this.especialistas);
    });
  }

  Aprobar(mail: string) {
    this.utils.aprobarEspecialista(mail);
  }
}
