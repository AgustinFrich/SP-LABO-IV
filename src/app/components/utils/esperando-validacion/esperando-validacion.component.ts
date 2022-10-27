import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { collection, query } from '@firebase/firestore';
import { Firestore, getDocs, where } from '@angular/fire/firestore';
import { Especialista } from 'src/app/classes/especialista';
import { Paciente } from 'src/app/classes/paciente';
import { Router } from '@angular/router';
import Swall from 'sweetalert2'
import { Admin } from 'src/app/classes/admin';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-esperando-validacion',
  templateUrl: './esperando-validacion.component.html',
  styleUrls: ['./esperando-validacion.component.scss']
})
export class EsperandoValidacionComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private authS: AuthService, private fs: Firestore, private router: Router, private l: LoadingService) { }

  ngOnInit(): void {
  }

  Salir()  {
    this.authS.Salir();
  }

  async ConfirmarValidacion() {
    this.l.loading = true;
    let au = getAuth();
    au.currentUser?.reload();

    if(au.currentUser !== null){
      const q = query(collection(this.fs, 'Usuarios'), where("mail", "==", au.currentUser.email));
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        if(doc.data()['perfil'] === "Especialista") {
          this.authS.usuario = doc.data() as Especialista;
        } else if (doc.data()['perfil'] === "Paciente"){
          this.authS.usuario = doc.data() as Paciente;
        } else if (doc.data()['perfil'] === "Admin") {
          this.authS.usuario = doc.data() as Admin;
        }
      });
    
      if(this.authS.usuario !== null) {
        if(this.authS.usuario.perfil === 'Especialista') {  
          if(au.currentUser.emailVerified) {
            if(this.authS.usuario.aprobado) {
              this.router.navigateByUrl('home/especialistas')
              .then(() => this.l.loading = false )
            } else {
              Swall.fire('Error', 'El usuario no ha sido aprobado por un administrador. Consulte nuevamente cuando haya sido aprobado', 'error');
            }
          } else {
            Swall.fire('Error', 'Valide su mail antes de continuar', 'error');
          }
        } else if (this.authS.usuario.perfil === 'Paciente') {
          if(au.currentUser.emailVerified) {
            this.router.navigateByUrl('home/pacientes')
            .then(() => this.l.loading = false )
          } else {
            Swall.fire('Error', 'Valide su mail antes de continuar', 'error');
          }
        } else if (this.authS.usuario.perfil === 'Admin') {
          if(au.currentUser.emailVerified) {
            this.router.navigateByUrl('home/administradores')
            .then(() => this.l.loading = false )
          } else {
            Swall.fire('Error', 'Valide su mail antes de continuar', 'error');
          }
        } 
      } else {
        this.router.navigateByUrl('')
        .then(() => this.l.loading = false )
      }
      this.l.loading = false;

    }
  }
}
