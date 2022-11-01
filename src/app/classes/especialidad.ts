import { Horario } from './horario';

export class Especialidad {
  nombre: string;
  imagen: string;
  horarios: Horario[];

  constructor(nombre: string, imagen: string) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.horarios = [];
  }
}
