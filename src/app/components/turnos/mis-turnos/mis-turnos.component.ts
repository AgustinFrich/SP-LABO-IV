import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialidad } from 'src/app/classes/especialidad';
import { Especialista } from 'src/app/classes/especialista';
import { Turno } from 'src/app/classes/turno';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
})
export class MisTurnosComponent implements OnInit, OnDestroy {
  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  especialistas: Especialista[] = [];
  especialidades: Especialidad[] = [];

  private unsub: Subscription = new Subscription();
  constructor(
    public auth: AuthService,
    private turnosService: TurnosService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    console.log('Entro');

    this.unsub = this.turnosService
      .getMisTurnos(this.auth.usuario!)
      .subscribe((doc) => {
        console.log(doc);
        this.turnos = [];
        this.turnos = doc as Turno[];
        this.turnosFiltrados = this.turnos;
        this.utils.getEspecialistas().forEach((esp) => {
          this.especialistas = esp as Especialista[];
        });
        this.utils.getEspecialidades().forEach((esp) => {
          this.especialidades = esp as Especialidad[];
        });
      });
  }

  ngOnDestroy(): void {
    console.log('Salgo');
    this.unsub.unsubscribe();
  }
  verResenia(resenia: string) {
    Swal.fire('Reseña de la atención: ', '"' + resenia + '"', 'info');
  }

  cancelarTurno(turno: Turno) {
    Swal.fire({
      title: 'Describa el motivo',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Cancelar turno',
      cancelButtonText: 'No cancelar turno',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value.length !== 0) {
          this.turnosService.cancelarTurno(turno, result.value);
        } else {
          Swal.fire(
            'Error',
            'No ingresó un comentario, no se canceló el turno',
            'warning'
          );
        }
      }
    });
  }

  filtrarPorEspecialista(especialista: Especialista) {
    this.turnosFiltrados = this.turnos.filter((t) => {
      return t.especialista.mail === especialista.mail;
    });
  }
  filtrarPorEspecialidad(especialidad: Especialidad) {
    this.turnosFiltrados = this.turnos.filter((t) => {
      return t.especialidad.nombre === especialidad.nombre;
    });
  }
}
