import { Turno } from 'src/app/classes/turno';
import { collection, query, where } from '@firebase/firestore';
import { collectionData, Firestore, Timestamp } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraficosService {
  constructor(private fs: Firestore) {}

  traerIngresos() {
    const c = collection(this.fs, 'ingresos');
    return collectionData(c) as Observable<Ingresos[]>;
  }

  traerTurnosPorEspecialidad(especialidad: string) {
    const c = collection(this.fs, 'Turnos');
    const q = query(c, where('especialidad.nombre', '==', especialidad));
    return collectionData(q) as Observable<Turno[]>;
  }

  traerTurnosPorDia(dia: string, mes: string) {
    const c = collection(this.fs, 'Turnos');
    const q = query(
      c,
      where('horario.dia', '==', dia),
      where('horario.mes', '==', mes)
    );
    return collectionData(q) as Observable<Turno[]>;
  }

  traerTurnosPorMedicoEnLapso(mail: string) {
    const c = collection(this.fs, 'Turnos');
    const q = query(
      c,
      where('especialista.mail', '==', mail),
      where('realizado', '==', false)
    );
    return collectionData(q) as Observable<Turno[]>;
  }

  traerTurnosRealizadosPorMedicoEnLapso(mail: string) {
    const c = collection(this.fs, 'Turnos');
    const q = query(
      c,
      where('especialista.mail', '==', mail),
      where('realizado', '==', true)
    );
    return collectionData(q) as Observable<Turno[]>;
  }

  compararFechas(
    dia: number,
    mes: number,
    dia1: number,
    dia2: number,
    mes1: number,
    mes2: number
  ) {
    if (
      mes >= mes1 &&
      mes <= mes2 &&
      ((dia >= dia1 && mes !== mes2) || (dia <= dia2 && mes !== mes1))
    ) {
      return true;
    }
    return false;
  }
}

export interface Ingresos {
  usuario: string;
  momento: Timestamp;
}
