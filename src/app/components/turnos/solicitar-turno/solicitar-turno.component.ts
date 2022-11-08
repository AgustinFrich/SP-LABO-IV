import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/classes/especialidad';
import { Especialista } from 'src/app/classes/especialista';
import { Horario } from 'src/app/classes/horario';
import { Paciente } from 'src/app/classes/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss'],
})
export class SolicitarTurnoComponent implements OnInit {
  constructor(
    private service: UtilsService,
    private turnosService: TurnosService,
    private auth: AuthService
  ) {}
  especialidades: Especialidad[] = [];
  especialistas: Especialista[] = [];
  especialistasFiltrados: Especialista[] = [];
  horarios: Horario[] | null = null;

  horario: Horario | null = null;
  especialidad: Especialidad | null = null;
  especialista: Especialista | null = null;

  ngOnInit(): void {
    this.service.getEspecialidades().subscribe((doc) => {
      this.especialidades = doc as Especialidad[];
    });

    this.service.getEspecialistas().subscribe((doc) => {
      this.especialistas = doc as Especialista[];
    });
  }

  elegirEspecialidad(especialidad: Especialidad) {
    this.especialidad = especialidad;
    this.especialista = null;
    this.horarios = null;
    this.horario = null;
    this.especialistasFiltrados = this.especialistas.filter(
      (e: Especialista) => {
        const r = e.especialidad.find((esp) => {
          console.log(e, esp, especialidad);
          return esp.nombre === especialidad.nombre && e.aprobado;
        });
        if (r !== undefined) {
          return e.especialidad.indexOf(r) >= 0;
        } else {
          return false;
        }
      }
    );
  }

  elegirEspecialista(especialista: Especialista) {
    this.especialista = especialista;
    this.horario = null;

    const h = especialista.especialidad.find((esp) => {
      return esp.nombre === this.especialidad!.nombre;
    })?.horarios;

    if (h !== undefined) {
      this.horarios = h;
    } else {
      //ALERTEAR
    }
  }

  elegirHorario(horario: Horario) {
    this.horario = horario;
  }

  aceptarTurno() {
    this.turnosService.postTurno(
      this.especialidad!,
      this.especialista!,
      this.horario!,
      this.auth.usuario as Paciente
    );
    Swal.fire(
      'Todo correcto!',
      'El turno fue registrado correctamente',
      'success'
    );
    this.especialidad = null;
    this.especialista = null;
    this.horario = null;
  }
}
