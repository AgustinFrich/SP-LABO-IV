import { Paciente } from './../../../classes/paciente';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialidad } from 'src/app/classes/especialidad';
import { Especialista } from 'src/app/classes/especialista';
import { Turno } from 'src/app/classes/turno';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/classes/usuario';

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
  pacientes: Paciente[] = [];
  usuario!: Usuario;
  filtradoPor = 'Sin filtro aplicado';
  private unsub: Subscription = new Subscription();
  constructor(
    public auth: AuthService,
    private turnosService: TurnosService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.utils.getUsuario(this.auth.usuario!.mail).then((usr) => {
      console.log(usr);
      this.usuario = usr;
    });
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
        this.utils.getPacientes().forEach((pac) => {
          this.pacientes = pac as Paciente[];
        });
      });
  }

  ngOnDestroy(): void {
    console.log('Salgo');
    this.unsub.unsubscribe();
  }
  verResenia(resenia: string) {
    Swal.fire('Comentario del turno: ', '"' + resenia + '"', 'info');
  }

  verDiagnostico(
    resenia: string,
    diagnostico: string,
    clave: string,
    valor: string
  ) {
    Swal.fire(
      'Información de la atención: ',
      'Diagnóstico: "' +
        diagnostico +
        '<div style="height: 10px;"></div>' +
        'Comentario: "' +
        resenia +
        '"' +
        '<div style="height: 10px;"></div>' +
        clave +
        ': ' +
        valor,
      'info'
    );
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

  rechazarTurno(turno: Turno) {
    Swal.fire({
      title: 'Describa el motivo de rechazo',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Recharar turno',
      cancelButtonText: 'No rechazar turno',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value.length !== 0) {
          this.turnosService.rechazarTurno(turno, result.value);
        } else {
          Swal.fire(
            'Error',
            'No ingresó un comentario, no se rechazó el turno',
            'warning'
          );
        }
      }
    });
  }

  aceptarTurno(turno: Turno) {
    this.turnosService.aceptarTurno(turno);
  }
  /*
  finalizarTurno(turno: Turno) {
    Swal.fire({
      title: 'Describa el diagnóstico realizado',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value.length !== 0) {
          Swal.fire({
            title: 'Escriba una reseña sobre la consulta',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Finalizar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result2) => {
            if (result2.value.length !== 0) {
              this.turnosService.finalizarTurno(
                turno,
                result.value,
                result2.value
              );
            } else {
              Swal.fire(
                'Error',
                'No ingresó una reseña, no se finalizó el turno',
                'warning'
              );
            }
          });
        } else {
          Swal.fire(
            'Error',
            'No ingresó un diagnóstico, no se finalizó el turno',
            'warning'
          );
        }
      }
    });
  }
*/
  filtrarPorEspecialista(especialista: Especialista) {
    this.filtradoPor =
      'Especialista: ' + especialista.nombre + ' ' + especialista.apellido;
    this.turnosFiltrados = this.turnos.filter((t) => {
      return t.especialista.mail === especialista.mail;
    });
  }
  filtrarPorEspecialidad(especialidad: Especialidad) {
    this.filtradoPor = 'Especialidad: ' + especialidad.nombre;
    this.turnosFiltrados = this.turnos.filter((t) => {
      return t.especialidad.nombre === especialidad.nombre;
    });
  }
  filtrarPorPaciente(paciente: Paciente) {
    this.filtradoPor = 'Paciente: ' + paciente.nombre + ' ' + paciente.apellido;

    this.turnosFiltrados = this.turnos.filter((t) => {
      return t.paciente.nombre === paciente.nombre;
    });
  }

  async filtrarPorAltura($event: any) {
    this.filtradoPor = 'Altura: ' + $event.target.value;
    this.turnosFiltrados = [];
    this.turnos.forEach(async (t) => {
      let h = await this.turnosService.getHistoria(t.idHistoria);
      if (h.altura.toString() === $event.target.value)
        this.turnosFiltrados.push(t);
    });
  }
  async filtrarPorPeso($event: any) {
    this.filtradoPor = 'Peso: ' + $event.target.value;
    this.turnosFiltrados = [];
    this.turnos.forEach(async (t) => {
      let h = await this.turnosService.getHistoria(t.idHistoria);
      if (h.peso.toString() === $event.target.value)
        this.turnosFiltrados.push(t);
    });
  }
  async filtrarPorTemperatura($event: any) {
    this.filtradoPor = 'Temperatura: ' + $event.target.value;
    this.turnosFiltrados = [];
    this.turnos.forEach(async (t) => {
      let h = await this.turnosService.getHistoria(t.idHistoria);
      if (h.temperatura.toString() === $event.target.value)
        this.turnosFiltrados.push(t);
    });
  }
  async filtrarPorPresion($event: any) {
    this.filtradoPor = 'Presion: ' + $event.target.value;
    this.turnosFiltrados = [];
    this.turnos.forEach(async (t) => {
      let h = await this.turnosService.getHistoria(t.idHistoria);
      if (h.presion.toString() === $event.target.value)
        this.turnosFiltrados.push(t);
    });
  }
  async filtrarPorClave($event: any) {
    this.filtradoPor = 'Clave: ' + $event.target.value;
    this.turnosFiltrados = this.turnos.filter((t) => {
      return t.dinamicos.clave === $event.target.value;
    });
  }
  async filtrarPorValor($event: any) {
    this.filtradoPor = 'Valor: ' + $event.target.value;
    this.turnosFiltrados = this.turnos.filter((t) => {
      return t.dinamicos.valor === $event.target.value;
    });
  }
}
