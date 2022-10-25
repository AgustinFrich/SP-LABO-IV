export class Paciente {
    nombre: string; 
    apellido: string; 
    edad: string ;
    dni: string ;
    obraSocial: string;
    mail: string ;
    password: string; 
    imgPerfil: string; 
    imgSecundaria: string; 
    perfil: string;
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
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.obraSocial = obraSocial;
      this.dni = dni;
      this.mail = mail;
      this.password = password;
      this.imgPerfil = imgPerfil;
      this.imgSecundaria = imgSecundaria;
      this.perfil = "Paciente";
    }
}
