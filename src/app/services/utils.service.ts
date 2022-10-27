import { Injectable } from '@angular/core';
import { collectionData, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Especialista } from '../classes/especialista';
import { Usuario } from '../classes/usuario';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private fs: Firestore, private l: LoadingService) { }


  aniadirEspecialidad(nuevo: string){
    const col = collection(this.fs, "Especialidades");
    addDoc(col, {nombre: nuevo});
  }

  getEspecialidades() {
    const col = collection(this.fs, "Especialidades");
    return collectionData(col);
  }

  getEspecialistasNoAprobados() {
    const col = collection(this.fs, "Especialistas");
    const q = query(col, where("aprobado", "==", false));
    return collectionData(q);
  }
  
  async aprobarEspecialista(mail: string) {
    this.l.loading = true;
    const col = collection(this.fs, "Especialistas");
    const q = query(col, where("mail", "==", mail));
    let querySnapshot = await getDocs(q);  
    querySnapshot.forEach((d) => {
      let esp = d.data() as Especialista;
      esp.aprobado = true;
      updateDoc(d.ref, {...esp});
    })
    this.l.loading = false;
  }
  
  async getArrayAccesoRapido() : Promise<Usuario[]> {
    const colRAPIDA = collection(this.fs, "AccesosRapdidos");
    const accesosRapidos = await getDocs(colRAPIDA);
    let usuarios : Usuario[] = [];
    accesosRapidos.forEach((doc) => {
      usuarios.push(doc.data() as Usuario);
    })
    return usuarios;
  }
}
