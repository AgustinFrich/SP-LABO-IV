import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  doc,
  documentId,
  Firestore,
  getDocs,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection, query, where } from '@firebase/firestore';
import { Especialidad } from '../classes/especialidad';
import { Especialista } from '../classes/especialista';
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
    //if (usuario.perfil === 'Paciente') {
    const q = query(col, where('paciente.mail', '==', usuario.mail));
    return collectionData(q);
    //}
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
}
