import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/classes/admin';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-admin',
  templateUrl: './crear-admin.component.html',
  styleUrls: ['./crear-admin.component.scss'],
})
export class CrearAdminComponent implements OnInit {
  especialidades: string[] = [];
  imagen?: File;

  public forma!: FormGroup;

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
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      'img-perfil': ['', [Validators.required]],
    });
  }

  ElegirEspecialidad($event: string[]) {
    this.especialidades = $event;
  }

  PostEspecialista() {
    const admin = new Admin(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.edad,
      this.forma.value.dni,
      this.forma.value.mail,
      this.forma.value.password,
      ''
    );
    this.auth.registroDesdeAdminAdmin(admin, this.imagen);
    this.forma.reset();
    Swal.fire('Correcto!', 'Registrado!');
  }

  onFileSelected($event: any) {
    if ($event.target.files.length > 0) {
      this.imagen = $event.target.files[0];
    }
  }
}
