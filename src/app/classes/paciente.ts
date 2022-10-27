import { Usuario } from "./usuario";

export class Paciente extends Usuario {

    obraSocial: string;
    imgSecundaria: string; 

    constructor(
      nombre: string, 
      apellido: string, 
      edad: string ,
      obraSocial: string,
      dni: string ,
      mail: string ,
      password: string, 
      imgPerfil: string,
      imgSecundaria: string
    ){
      super(nombre, apellido, edad, dni, mail, password, imgPerfil);
      this.obraSocial = obraSocial;
      this.imgSecundaria = imgSecundaria;
      this.perfil = "Paciente";
      this.aprobado = true;
    }
}
