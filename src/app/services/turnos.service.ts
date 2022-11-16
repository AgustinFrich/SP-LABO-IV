import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  doc,
  documentId,
  Firestore,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection, query, where } from '@firebase/firestore';
import { Especialidad } from '../classes/especialidad';
import { Especialista } from '../classes/especialista';
import { HistoriaClinica } from '../classes/historia-clinica';
import { Horario } from '../classes/horario';
import { Paciente } from '../classes/paciente';
import { Turno } from '../classes/turno';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  constructor(private fs: Firestore) {}

  getMisTurnos(usuario: Usuario) {
    const col = collection(this.fs, 'Turnos');
    if (usuario.perfil === 'Paciente') {
      const q = query(col, where('paciente.mail', '==', usuario.mail));
      return collectionData(q);
    } else if (usuario.perfil === 'Especialista') {
      const q = query(col, where('especialista.mail', '==', usuario.mail));
      return collectionData(q);
    } else {
      return collectionData(col);
    }
  }

  postTurno(
    especialidad: Especialidad,
    especialista: Especialista,
    horario: Horario,
    paciente: Paciente
  ) {
    const turno = new Turno(especialista, especialidad, horario, paciente);
    const ref = doc(collection(this.fs, 'Turnos'));
    setDoc(ref, { ...turno, id: ref.id });
  }

  async actualizarHorarios(
    especialista: Especialista,
    especialidad: Especialidad,
    i: number
  ) {
    if (especialista !== null && especialidad !== null && i !== -1) {
      const col = collection(this.fs, 'Especialistas');
      const col2 = collection(this.fs, 'Usuarios');
      const q = query(col, where('mail', '==', especialista.mail));
      const q2 = query(col2, where('mail', '==', especialista.mail));
      const snapshot = await getDocs(q);
      const snapshot2 = await getDocs(q2);
      snapshot.forEach((document) => {
        const referencia = doc(col, document.id);
        especialista.especialidad[i] = especialidad;

        updateDoc(referencia, { ...especialista });
      });
      snapshot2.forEach((document) => {
        const referencia = doc(col2, document.id);
        especialista.especialidad[i] = especialidad;

        updateDoc(referencia, { ...especialista });
      });
    }
  }

  cancelarTurno(tunro: Turno, comentario: string) {
    const ref = doc(this.fs, 'Turnos', tunro.id);
    tunro.cancelado = true;
    tunro.estado = 'Cancelado';
    tunro.comentario = comentario;
    updateDoc(ref, { ...tunro });
  }
  rechazarTurno(tunro: Turno, comentario: string) {
    const ref = doc(this.fs, 'Turnos', tunro.id);
    tunro.rechazado = true;
    tunro.estado = 'Rechazado';
    tunro.comentario = comentario;
    updateDoc(ref, { ...tunro });
  }
  finalizarTurno(tunro: Turno, diagnositco: string, comentario: string) {
    const ref = doc(this.fs, 'Turnos', tunro.id);
    tunro.realizado = true;
    tunro.estado = 'Realizado';
    tunro.comentarioEspecialista = comentario;
    tunro.diagnostico = diagnositco;
    updateDoc(ref, { ...tunro });
  }
  aceptarTurno(tunro: Turno) {
    const ref = doc(this.fs, 'Turnos', tunro.id);
    tunro.aceptado = true;
    tunro.estado = 'Aceptado';
    updateDoc(ref, { ...tunro });
  }

  traerTurnoConHistoriaSegunEspecialista(
    paciente: Paciente,
    especialista: Especialista
  ) {
    let turnos: Turno[];

    this.getMisTurnos(paciente as Usuario).forEach((data) => {
      turnos = data as Turno[];
    });
  }

  async getHistoria(idHistria: any) {
    const d = doc(this.fs, 'historias/' + idHistria.id);
    const r = await getDoc(d);
    return r.data() as HistoriaClinica;
  }

  getMistTurnosSegunProfesional(
    paciente: Paciente,
    especialista: Especialista
  ) {
    const col = collection(this.fs, 'Turnos');
    const q = query(
      col,
      where('paciente.mail', '==', paciente.mail),
      where('especialista.mail', '==', especialista.mail)
    );
    return collectionData(q);
  }
}
