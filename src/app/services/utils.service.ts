import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private fs: Firestore) { }


  aniadirEspecialidad(nuevo: string){
    const col = collection(this.fs, "Especialidades");
    addDoc(col, {nombre: nuevo});
  }

  getEspecialidades() {
    const col = collection(this.fs, "Especialidades");
    return collectionData(col);
  }
}
