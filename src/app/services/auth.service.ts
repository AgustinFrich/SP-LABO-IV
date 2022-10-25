import { Paciente } from './../classes/paciente';
import { getAuth, sendEmailVerification, UserCredential } from '@angular/fire/auth';
import { collection, addDoc } from '@firebase/firestore';
import { doc, Firestore, query, where, collectionData, docData } from '@angular/fire/firestore';
import { Especialista } from './../classes/especialista';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: null | Paciente | Especialista = null;
  constructor(private fs: Firestore, private storage: AngularFireStorage, private auth: AngularFireAuth, private router: Router, private firebase: FirebaseApp) { }

  PostEspecialista(especialista: Especialista, imagen: File | undefined) {
    console.log(especialista);
    this.auth.createUserWithEmailAndPassword(especialista.mail, especialista.password).then(() => {
      this.auth.signInWithEmailAndPassword(especialista.mail, especialista.password).then((user) => {  
        console.log("creado");
        const auth = getAuth();
        if(user.user !== null) {
          sendEmailVerification(user.user);
        }
        if(imagen !== undefined) {
          const filePath = 'perfiles/especialista/' + especialista.nombre + '-' + Date.now();
          const storageRef = this.storage.ref(filePath);
          const subir = storageRef.put(imagen, {
            contentType: 'image/png'
          });
          subir.snapshotChanges()
          .pipe(
            finalize(() => {
            storageRef.getDownloadURL().subscribe((res) => {
              const imgPerfil = res;
              especialista.imgPerfil = res;
              const col = collection(this.fs, "Especialistas");
              const col2 = collection(this.fs, "Usuarios");
              this.usuario = especialista;
              addDoc(col, { ...especialista });
              addDoc(col2, { ...especialista });
            });
          })
          ).subscribe();
        } else {
          const col = collection(this.fs, "Especialistas");
          const col2 = collection(this.fs, "Usuarios");
          addDoc(col, { ...especialista });
          addDoc(col2, { ...especialista });
        }
      });
    });
  }

  PostPaciente(paciente: Paciente, imagenPerfil: File | undefined, imagenSecundaria: File | undefined) {
    this.auth.createUserWithEmailAndPassword(paciente.mail, paciente.password).then(() => {
      this.auth.signInWithEmailAndPassword(paciente.mail, paciente.password).then((user) => {  
        console.log("creado");
        const auth = getAuth();
        if(user.user !== null) {
          sendEmailVerification(user.user);
        }
        if(imagenPerfil !== undefined) {
          const filePath1 = 'perfiles/paciente/' + paciente.nombre + '-' + Date.now();
          const storageRef1 = this.storage.ref(filePath1);
          const subir1 = storageRef1.put(paciente.imgPerfil, {
            contentType: 'image/png'
          });
          subir1.snapshotChanges()
          .pipe(
            finalize(() => {
            storageRef1.getDownloadURL().subscribe((res) => {
              const imgPerfil = res;
              paciente.imgPerfil = res;
            });
          })
          ).subscribe();
        }
        if(imagenSecundaria !== undefined) {
          const filePath2 = 'perfiles/paciente/' + paciente.nombre + '-' + Date.now();
          const storageRef2 = this.storage.ref(filePath2);
          const subir2 = storageRef2.put(imagenSecundaria, {
            contentType: 'image/png'
          });
          subir2.snapshotChanges()
          .pipe(
            finalize(() => {
            storageRef2.getDownloadURL().subscribe((res) => {
              const imgSec = res;
              paciente.imgSecundaria = imgSec;
            });
          })
          ).subscribe();
        }
        
        const col = collection(this.fs, "Pacientes");
        const col2 = collection(this.fs, "Usuarios");
        this.usuario = paciente;
        addDoc(col, { ...paciente });
        addDoc(col2, { ...paciente });
      });
    });
  }

  Cambio() {
    this.auth.onAuthStateChanged((user) =>{
      if(user !== null && this.usuario !== null) {
        if(this.usuario.perfil === 'especialista') {  
          if(user.emailVerified) {
            this.router.navigateByUrl('home/especialistas');
          } else {
            this.router.navigateByUrl('home/esperando-validacion');
          }
        } else if (this.usuario.perfil === 'paciente') {
          if(user.emailVerified) {
            this.router.navigateByUrl('home/pacientes');
          } else {
            this.router.navigateByUrl('home/esperando-validacion');
          }
        } 
      } else {
        this.router.navigateByUrl('');
      }
    });
  }

  LoginPaciente(mail: string, password: string) {
    this.auth.signInWithEmailAndPassword(mail, password).then((user) => {
      const q = query(collection(this.fs, 'Pacientes'), where('mail', '==', mail.toLocaleLowerCase()));
      collectionData(q).subscribe((doc) => {
        doc.forEach((document) => {
          this.usuario = document as Paciente;
        })
      })
    });
  }

  LoginEspecialista(mail: string, password: string) {
    this.auth.signInWithEmailAndPassword(mail, password).then((user) => {
      const q = query(collection(this.fs, 'Especialistas'), where('mail', '==', mail.toLocaleLowerCase()));
      collectionData(q).subscribe((doc) => {
        doc.forEach((document) => {
          this.usuario = document as Especialista;
        })
      })
    });
  }

  Salir() {
    this.usuario = null;
    this.auth.signOut();
  }
}
