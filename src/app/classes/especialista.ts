import { Especialidad } from './especialidad';
import { Usuario } from './usuario';

export class Especialista extends Usuario {
  especialidad: Especialidad[];

  constructor(
    nombre: string,
    apellido: string,
    edad: string,
    dni: string,
    especialidad: Especialidad[],
    mail: string,
    password: string,
    imgPerfil: string
  ) {
    super(nombre, apellido, edad, dni, mail, password, imgPerfil);
    (this.aprobado = false), (this.perfil = 'Especialista');
    this.especialidad = especialidad;
  }
}
