import { Especialista } from './../../../classes/especialista';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/classes/especialidad';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro-especialistas',
  templateUrl: './registro-especialistas.component.html',
  styleUrls: ['./registro-especialistas.component.scss'],
})
export class RegistroEspecialistasComponent implements OnInit {
  especialidades: Especialidad[] = [];
  imagen?: File;
  token: string | undefined;
  public forma!: FormGroup;
  siteKey = '';
  constructor(public fb: FormBuilder, private auth: AuthService) {
    this.token = undefined;
    this.siteKey = environment.recaptcha.siteKey;
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: [
        '',
        [Validators.required, , Validators.min(18), Validators.max(99)],
      ],
      dni: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(7),
          Validators.maxLength(8),
        ],
      ],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      'img-perfil': ['', [Validators.required]],
      recaptcha: ['', [Validators.required]],
    });
  }

  ElegirEspecialidad($event: Especialidad[]) {
    this.especialidades = $event;
  }

  PostEspecialista() {
    const especialista = new Especialista(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.edad,
      this.forma.value.dni,
      this.especialidades,
      this.forma.value.mail,
      this.forma.value.password,
      ''
    );
    this.auth.PostEspecialista(especialista, this.imagen);
  }

  onFileSelected($event: any) {
    if ($event.target.files.length > 0) {
      this.imagen = $event.target.files[0];
    }
  }
}

//      this.forma.value.nombre,

/*
??? Nombre
??? Apellido
??? Edad
??? DNI
??? Especialidad
??? En este caso se le deber?? dar la posibilidad de elegir o agregar alguna
que no se encuentre entre las posibilidades
??? Mail
??? Password
??? Imagen de perfil
*/
