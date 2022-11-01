import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Especialidad } from 'src/app/classes/especialidad';
import { Horario } from 'src/app/classes/horario';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
})
export class MiPerfilComponent implements OnInit, OnDestroy {
  constructor(
    public auth: AuthService,
    private _route: ActivatedRoute,
    private turnosService: TurnosService
  ) {}
  usr: Usuario | any;
  //  private _routerSubscription: any;
  unsub: Subscription = new Subscription();
  esp?: Especialidad;
  i: number = -1;
  dia: number = 0;
  mes: number = 0;
  hora: number = 0;
  minuto: number = 0;

  ngOnInit(): void {
    //this._routerSubscription = this._route.url.subscribe((url) => {
    // Your action/function will go here
    //console.log(this._route.url);
    this.usr = this.auth.usuario;
    this.unsub = this.auth.usuarioCambio$.subscribe((usr) => {
      if (usr !== null) {
        console.log(usr);
        this.usr = usr;
      }
    });
    //});
  }

  ngOnDestroy(): void {
    console.log('A');
    this.unsub.unsubscribe();
  }

  seleccionarEspecialidad(e: Especialidad, i: number) {
    this.esp = e;
    this.i = i;
  }

  agregarHorario() {
    if (
      this.esp !== null &&
      this.dia > 0 &&
      this.mes > 0 &&
      this.hora > 0 &&
      this.minuto > 0
    ) {
      const horario = new Horario(this.dia, this.mes, this.hora, this.minuto);

      console.log(this.esp?.horarios.push({ ...horario }));
      if (this.esp !== undefined) {
        this.turnosService.actualizarHorarios(this.usr, this.esp, this.i);
      }
    }
  }
}
