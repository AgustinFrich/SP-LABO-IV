import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/classes/historia-clinica';
import { Turno } from 'src/app/classes/turno';
import { AuthService } from 'src/app/services/auth.service';
import { HistoriasClinicasService } from 'src/app/services/historias-clinicas.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-ver-historias',
  templateUrl: './ver-historias.component.html',
  styleUrls: ['./ver-historias.component.scss'],
})
export class VerHistoriasComponent implements OnInit {
  historias: HistoriaClinica[] = [];
  historiasFiltradas: HistoriaClinica[] = [];
  misTurnos: Turno[] = [];
  constructor(
    private hs: HistoriasClinicasService,
    private auth: AuthService,
    private turnosService: TurnosService
  ) {}

  ngOnInit(): void {
    this.turnosService.getMisTurnos(this.auth.usuario!).forEach((d) => {
      this.misTurnos = d as Turno[];
    });
    this.hs.traerHistorias().subscribe((h) => {
      this.historias = h as HistoriaClinica[];
      this.historiasFiltradas = h as HistoriaClinica[];
      if (this.auth.usuario!.perfil === 'Especialista') {
        this.historiasFiltradas = this.historias.filter((h) => {
          for (const element of this.misTurnos) {
            if (element.paciente.mail === h.paciente.mail) {
              return true;
            }
          }
          return false;
        });
      }
      console.log(this.historiasFiltradas);
    });
  }
}
