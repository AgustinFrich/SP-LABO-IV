import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-esperando-validacion',
  templateUrl: './esperando-validacion.component.html',
  styleUrls: ['./esperando-validacion.component.scss']
})
export class EsperandoValidacionComponent implements OnInit {

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  ConfirmarValidacion() {
    let au = getAuth();
    if(au.currentUser?.emailVerified) {
      au.currentUser?.reload();
    } else {
      //Swal Fire not verified pliss
    }
  }
}
