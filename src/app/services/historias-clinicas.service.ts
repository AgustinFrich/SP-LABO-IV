import { Injectable } from '@angular/core';
import {
  collectionData,
  doc,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';
import { HistoriaClinica } from '../classes/historia-clinica';
import { Paciente } from '../classes/paciente';
import { Turno } from '../classes/turno';

@Injectable({
  providedIn: 'root',
})
export class HistoriasClinicasService {
  constructor(private fs: Firestore) {}

  async agregarHistoriaClinica(
    historia: HistoriaClinica,
    turno: Turno,
    diagnostico: string,
    comentario: string
  ) {
    let ref = null;
    const col = collection(this.fs, 'historias');
    const q = query(col, where('paciente.mail', '==', historia.paciente.mail));
    const docs = await getDocs(q);
    docs.forEach((d) => {
      if (d.exists()) {
        ref = d.ref;
      }
    });
    const turnoRef = doc(this.fs, 'Turnos', turno.id);

    turno.realizado = true;
    turno.estado = 'Realizado';
    turno.comentarioEspecialista = comentario;
    turno.diagnostico = diagnostico;

    if (ref === null) {
      addDoc(col, { ...historia }).then((ref) => {
        updateDoc(turnoRef, {
          ...turno,
          historiaActualizada: true,
          idHistoria: ref,
        });
      });
    } else {
      setDoc(ref, { ...historia });
      updateDoc(turnoRef, {
        ...turno,
        historiaActualizada: true,
        idHistoria: ref,
      });
    }
  }

  async traerHistoria(paciente: Paciente): Promise<HistoriaClinica> {
    let respuesta: HistoriaClinica = new HistoriaClinica(
      paciente,
      5,
      5,
      0,
      0,
      []
    );
    const col = collection(this.fs, 'historias');
    const q = query(col, where('paciente.mail', '==', paciente.mail));
    const docs = await getDocs(q);
    docs.forEach((d) => {
      if (d.exists()) {
        respuesta = d.data() as HistoriaClinica;
      }
    });
    return respuesta;
  }

  traerHistorias() {
    const col = collection(this.fs, 'historias');
    return collectionData(col);
  }
}
