import { Usuario } from "./usuario";

export class Especialista extends Usuario {
    especialidad: string[];
    
    constructor(
      nombre: string, 
      apellido: string, 
      edad: string ,
      dni: string ,
      especialidad: string[],
      mail: string ,
      password: string, 
      imgPerfil: string 
    ){
      super(nombre, apellido, edad, dni, mail, password, imgPerfil);
      this.aprobado = false,
      this.perfil = "Especialista";
      this.especialidad = especialidad;
    }
}
