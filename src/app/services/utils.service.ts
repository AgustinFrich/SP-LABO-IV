import { Injectable } from '@angular/core';
import {
  collectionData,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { getDownloadURL, Storage, uploadBytes } from '@angular/fire/storage';
import { addDoc, collection } from '@firebase/firestore';
import { ref, uploadString } from 'firebase/storage';
import { Especialidad } from '../classes/especialidad';
import { Especialista } from '../classes/especialista';
import { Usuario } from '../classes/usuario';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private fs: Firestore,
    private l: LoadingService,
    private storage: Storage
  ) {}

  async aniadirEspecialidad(especialidad: Especialidad, imagen: File) {
    const path = 'especialidades/' + especialidad.nombre;
    const storageRef = ref(this.storage, path);

    await uploadBytes(storageRef, imagen);

    const imageUrl = await getDownloadURL(storageRef);
    especialidad.imagen = imageUrl;
    const col = collection(this.fs, 'Especialidades');
    addDoc(col, { ...especialidad });
  }

  getEspecialidades() {
    const col = collection(this.fs, 'Especialidades');
    return collectionData(col);
  }
  getPacientes() {
    const col = collection(this.fs, 'Pacientes');
    return collectionData(col);
  }

  getEspecialistasNoAprobados() {
    const col = collection(this.fs, 'Especialistas');
    const q = query(col, where('aprobado', '==', false));
    return collectionData(q);
  }

  async aprobarEspecialista(mail: string) {
    this.l.loading = true;
    const col = collection(this.fs, 'Especialistas');
    const col2 = collection(this.fs, 'Usuarios');
    const q = query(col, where('mail', '==', mail));
    const q2 = query(col2, where('mail', '==', mail));
    let querySnapshot = await getDocs(q);
    let querySnapshot2 = await getDocs(q2);
    querySnapshot.forEach((d) => {
      let esp = d.data() as Especialista;
      esp.aprobado = true;
      updateDoc(d.ref, { ...esp });
    });
    querySnapshot2.forEach((d) => {
      let esp = d.data() as Especialista;
      esp.aprobado = true;
      updateDoc(d.ref, { ...esp });
    });
    this.l.loading = false;
  }

  async getArrayAccesoRapido(): Promise<Usuario[]> {
    const colRAPIDA = collection(this.fs, 'AccesosRapdidos');
    const accesosRapidos = await getDocs(colRAPIDA);
    let usuarios: Usuario[] = [];
    accesosRapidos.forEach((doc) => {
      usuarios.push(doc.data() as Usuario);
    });
    return usuarios;
  }

  getEspecialistas() {
    const col = collection(this.fs, 'Especialistas');
    return collectionData(col);
  }
}
