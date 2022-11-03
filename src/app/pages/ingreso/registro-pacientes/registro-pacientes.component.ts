import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Paciente } from 'src/app/classes/paciente';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro-pacientes',
  templateUrl: './registro-pacientes.component.html',
  styleUrls: ['./registro-pacientes.component.scss'],
})
export class RegistroPacientesComponent implements OnInit {
  public forma!: FormGroup;
  imagenPerfil?: File;
  imagenSecundaria?: File;
  siteKey = environment.recaptcha.siteKey;
  constructor(public fb: FormBuilder, private auth: AuthService) {}

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
      obra: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      'img-perfil': ['', [Validators.required]],
      'img-secundaria': ['', [Validators.required]],
      recaptcha: ['', [Validators.required]],
    });
  }

  PostPaciente() {
    const paciente = new Paciente(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.edad,
      this.forma.value.obra,
      this.forma.value.dni,
      this.forma.value.mail,
      this.forma.value.password,
      '',
      ''
    );
    this.auth.PostPaciente(paciente, this.imagenPerfil, this.imagenSecundaria);
  }

  onFileSelectedPerfil($event: any) {
    if ($event.target.files.length > 0) {
      this.imagenPerfil = $event.target.files[0];
    }
  }

  onFileSelectedSecundaria($event: any) {
    if ($event.target.files.length > 0) {
      this.imagenSecundaria = $event.target.files[0];
    }
  }
}
