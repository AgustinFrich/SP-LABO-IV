import { Especialista } from './../../../classes/especialista';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-especialistas',
  templateUrl: './registro-especialistas.component.html',
  styleUrls: ['./registro-especialistas.component.scss']
})
export class RegistroEspecialistasComponent implements OnInit {

  especialidades : string[] = [];
  imagen?: File;

  public forma!: FormGroup;

  constructor(public fb: FormBuilder, private auth: AuthService) {   }

  ngOnInit(): void 
  {
    this.forma = this.fb.group({
      "nombre": ['', [Validators.required]],
      "apellido": ['', [Validators.required]],
      "edad": ['', [Validators.required,, Validators.min(18), Validators.max(99)]],
      "dni": ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(7), Validators.maxLength(8)]],
      "mail": ['', [Validators.required, Validators.email]],
      "password": ['', [Validators.required, Validators.minLength(8)]],
      "img-perfil": ['', [Validators.required]]
     });
  }

  ElegirEspecialidad($event: string[]) {
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
      ""
    );
    this.auth.PostEspecialista(
      especialista, this.imagen
    );
  }

    onFileSelected($event: any) {
  if($event.target.files.length > 0)
    {
      this.imagen = $event.target.files[0];
    }
  }
}

//      this.forma.value.nombre,

/*
■ Nombre
■ Apellido
■ Edad
■ DNI
■ Especialidad
● En este caso se le deberá dar la posibilidad de elegir o agregar alguna
que no se encuentre entre las posibilidades
■ Mail
■ Password
■ Imagen de perfil
*/