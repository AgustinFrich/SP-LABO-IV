import { Paciente } from './../classes/paciente';
import { getAuth, sendEmailVerification, UserCredential } from '@angular/fire/auth';
import { collection, addDoc } from '@firebase/firestore';
import { doc, Firestore, query, where, collectionData, docData, getDocs } from '@angular/fire/firestore';
import { Especialista } from './../classes/especialista';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseApp, FirebaseAppSettings, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';
import { Usuario } from '../classes/usuario';
import { Admin } from '../classes/admin';
import { LoadingService } from './loading.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: null | Usuario = null;
  constructor(private fs: Firestore, private storage: AngularFireStorage, private auth: AngularFireAuth, private router: Router, private loading: LoadingService) { }

  PostEspecialista(especialista: Especialista, imagen: File | undefined) {
    this.usuario = new Especialista("", "", "", "", [], "", "", "");
    this.auth.createUserWithEmailAndPassword(especialista.mail, especialista.password).then(() => {
      this.auth.signInWithEmailAndPassword(especialista.mail, especialista.password).then((user) => {  
        const auth = getAuth();
        if(user.user !== null) {
          sendEmailVerification(user.user);
        }
        this.CREARESPECIALISTA(especialista, imagen);
    });
    }).catch((err: any) => {
      if(err.code === 'auth/email-already-in-use') {
        Swal.fire("Error al registrar", "El correo ya está siendo utilizado por otra cuenta", 'error');
      }
    });
  }

  PostPaciente(paciente: Paciente, imagenPerfil: File | undefined, imagenSecundaria: File | undefined) {
    this.usuario = new Paciente("", "", "", "", "", "", "", "", "");

    this.auth.createUserWithEmailAndPassword(paciente.mail, paciente.password).then((user) => {
        const auth = getAuth();
        if(user.user !== null) {
          sendEmailVerification(user.user);
        }
        this.CREARPACIENTE(paciente, imagenPerfil, imagenSecundaria);
      }).catch((err: any) => {
        if(err.code === 'auth/email-already-in-use') {
          Swal.fire("Error al registrar", "El correo ya está siendo utilizado por otra cuenta");
        }
      });
  }

  Cambio() {
    this.auth.onAuthStateChanged(async (user) =>{
      this.loading.loading = true;
      if(user !== null){
          const q = query(collection(this.fs, 'Usuarios'), where("mail", "==", user.email));
          const querySnapshot = await getDocs(q)
          querySnapshot.forEach((doc) => {
            if(doc.data()['perfil'] === "Especialista") {
              this.usuario = doc.data() as Especialista;
            } else if (doc.data()['perfil'] === "Paciente"){
              this.usuario = doc.data() as Paciente; 
            } else if (doc.data()['perfil'] === "Admin") {
              this.usuario = doc.data() as Admin;
            }
          });

          if(this.usuario !== null) {
            if(this.usuario.perfil === 'Especialista') {  
              if(user.emailVerified && this.usuario.aprobado) {
                this.router.navigateByUrl('home/especialistas')
                .then(() => this.loading.loading = false);
              } else {
                this.router.navigateByUrl('home/esperando-validacion')
                .then(() => this.loading.loading = false);
              }
            } else if (this.usuario.perfil === 'Paciente') {
              if(user.emailVerified) {
                this.router.navigateByUrl('home/pacientes')
                .then(() => this.loading.loading = false);
              } else {
                this.router.navigateByUrl('home/esperando-validacion')
                .then(() => this.loading.loading = false);
              }
            } else if (this.usuario.perfil === "Admin") {
              if(user.emailVerified) {
                this.router.navigateByUrl('home/administradores')
                .then(() => this.loading.loading = false);
              } else {
                this.router.navigateByUrl('home/esperando-validacion')
                .then(() => this.loading.loading = false);
              }
            }
          }
        } else {
          
          this.router.navigateByUrl('', {replaceUrl: true})
          .then(() => this.loading.loading = false);
        }
      });
      this.loading.loading = false
  }

   LoginPaciente(mail: string, password: string) {
    this.loading.loading = true;
    this.auth.signInWithEmailAndPassword(mail, password).then(async(user) => {
      const q = query(collection(this.fs, 'Usuarios'), where('mail', '==', mail.toLocaleLowerCase()));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        if(document.data()['perfil'] === "Especialista") {
          this.usuario = document.data() as Especialista;
        } else if (document.data()['perfil'] === "Paciente"){
          this.usuario = document.data() as Paciente;
        } else if (document.data()['perfil'] === "Admin") {
          this.usuario = document.data() as Admin;
        }
      })
      this.loading.loading = false;
    }).catch((err: any) => {
        Swal.fire("Error al ingresar", "Usuario o contraseña incorrectos", 'error');      
    })
    this.loading.loading = false;
  }

  registroDesdeAdminPaciente(paciente: Paciente, imagenPerfil: File | undefined, imagenSecundaria: File|undefined ) {
    this.loading.loading = true;
    const secondaryApp = firebase.initializeApp(environment.firebase, "SEC");
    secondaryApp.auth().createUserWithEmailAndPassword(paciente.mail, paciente.password).then((firebaseUser) => {
      this.CREARPACIENTE(paciente, imagenPerfil, imagenSecundaria);
      firebaseUser.user?.sendEmailVerification();
      this.loading.loading = false;
    }).catch((err: any) => {
      if(err.code === 'auth/email-already-in-use') {
        Swal.fire("Error al registrar", "El correo ya está siendo utilizado por otra cuenta");
      }
    });
    this.loading.loading = false;
  }
  
  registroDesdeAdminEspecialista(especialista: Especialista, imagen: File | undefined ) {
    this.loading.loading = true;
    const secondaryApp = firebase.initializeApp(environment.firebase, "SEC");
    secondaryApp.auth().createUserWithEmailAndPassword(especialista.mail, especialista.password).then((firebaseUser) => {
      this.CREARESPECIALISTA(especialista, imagen);
      firebaseUser.user?.sendEmailVerification();
      this.loading.loading = false;
    }).catch((err: any) => {
      if(err.code === 'auth/email-already-in-use') {
        Swal.fire("Error al registrar", "El correo ya está siendo utilizado por otra cuenta");
      }
    });
    this.loading.loading = false;
  }
  
  registroDesdeAdminAdmin(admin: Admin, imagen: File | undefined ) {
    this.loading.loading = true;
    const secondaryApp = firebase.initializeApp(environment.firebase, "SEC");
    secondaryApp.auth().createUserWithEmailAndPassword(admin.mail, admin.password).then((firebaseUser) => {
      this.CREARADMIN(admin, imagen);
      firebaseUser.user?.sendEmailVerification();
      this.loading.loading = false;
    }).catch((err: any) => {
      if(err.code === 'auth/email-already-in-use') {
        Swal.fire("Error al registrar", "El correo ya está siendo utilizado por otra cuenta");
      }
    });
    this.loading.loading = false;
  }

  Salir() {
    this.usuario = null;
    this.auth.signOut();
  }

  async CREARPACIENTE(paciente: Paciente, imagenPerfil: File | undefined, imagenSecundaria: File|undefined) {
    if(imagenPerfil !== undefined) {
      const filePath1 = 'perfiles/paciente/' + paciente.nombre + '-pri-' + Date.now();
      const storageRef1 = this.storage.ref(filePath1);
      const subir1 = storageRef1.put(paciente.imgPerfil, {
        contentType: 'image/png'
      });
      subir1.snapshotChanges()
      .pipe(
       finalize(() => {
        storageRef1.getDownloadURL().subscribe((res) => {
          paciente.imgPerfil = res;
        });
      })
      ).subscribe();
    }
    if(imagenSecundaria !== undefined) {
      const filePath2 = 'perfiles/paciente/' + paciente.nombre + '-sec-' + Date.now();
      const storageRef2 = this.storage.ref(filePath2);
      const subir2 = storageRef2.put(imagenSecundaria, {
        contentType: 'image/png'
      });
      subir2.snapshotChanges()
      .pipe(
        finalize(() => {
        storageRef2.getDownloadURL().subscribe((res) => {
          paciente.imgSecundaria = res;
        });
      })
      ).subscribe();
    }
    
    const col = collection(this.fs, "Pacientes");
    const col2 = collection(this.fs, "Usuarios");
    this.usuario = paciente;
    addDoc(col, { ...paciente });
    addDoc(col2, { ...paciente });
  }

  CREARESPECIALISTA(especialista: Especialista, imagen: File | undefined) {
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
  }


  CREARADMIN(admin: Admin, imagen: File | undefined) {
    if(imagen !== undefined) {
      const filePath = 'perfiles/admins/' + admin.nombre + '-' + Date.now();
      const storageRef = this.storage.ref(filePath);
      const subir = storageRef.put(imagen, {
        contentType: 'image/png'
      });
      subir.snapshotChanges()
      .pipe(
        finalize(() => {
        storageRef.getDownloadURL().subscribe((res) => {
          const imgPerfil = res;
          admin.imgPerfil = res;
          const col = collection(this.fs, "Admins");
          const col2 = collection(this.fs, "Usuarios");
          this.usuario = admin;
          addDoc(col, { ...admin });
          addDoc(col2, { ...admin });
        });
      })
      ).subscribe();
    } else {
      const col = collection(this.fs, "Admins");
      const col2 = collection(this.fs, "Usuarios");
      addDoc(col, { ...admin });
      addDoc(col2, { ...admin });
    }
  }
}
