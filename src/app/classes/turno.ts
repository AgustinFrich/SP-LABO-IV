import { Especialidad } from './especialidad';
import { Especialista } from './especialista';
import { Horario } from './horario';
import { Paciente } from './paciente';

export class Turno {
  especialista: Especialista;
  especialidad: Especialidad;
  horario: Horario;
  paciente: Paciente;
  aceptado: boolean;
  realizado: boolean;
  rechazado: boolean;
  cancelado: boolean;
  comentario: string;
  comentarioEspecialista: string;
  diagnostico: string;
  estado: string;
  id: string;
  idHistoria: any;
  finalizar = false;
  clave: string;
  valor: string;
  dinamicos: dinamicos;

  constructor(
    especialista: Especialista,
    especialidad: Especialidad,
    horario: Horario,
    paciente: Paciente
  ) {
    this.especialista = especialista;
    this.especialidad = especialidad;
    this.horario = horario;
    this.paciente = paciente;
    this.aceptado = false;
    this.realizado = false;
    this.rechazado = false;
    this.cancelado = false;
    this.estado = 'Solicitado';
    this.comentario = '';
    this.id = '';
    this.diagnostico = '';
    this.comentarioEspecialista = '';
    this.idHistoria = '';
    this.clave = '';
    this.valor = '';
    this.dinamicos = { clave: '', valor: '' };
  }
}
interface dinamicos {
  clave: string;
  valor: string;
}
