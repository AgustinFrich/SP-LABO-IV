import { Paciente } from './paciente';

export class HistoriaClinica {
  altura: number;
  peso: number;
  temperatura: number;
  presion: number;

  paciente: Paciente;
  dinamicos: dinamicos[];

  constructor(
    paciente: Paciente,
    altura: number,
    peso: number,
    temperatura: number,
    presion: number,
    dinamicos: dinamicos[]
  ) {
    this.altura = altura;
    this.peso = peso;
    this.temperatura = temperatura;
    this.presion = presion;
    this.dinamicos = dinamicos;
    this.paciente = paciente;
  }
}

interface dinamicos {
  clave: string;
  valor: string;
}
