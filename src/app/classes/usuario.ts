export abstract class Usuario {
    nombre: string; 
    apellido: string; 
    edad: string ;
    dni: string ;
    mail: string ;
    password: string; 
    imgPerfil: string; 
    perfil: string;
    aprobado: boolean;

    constructor(
      nombre: string, 
      apellido: string, 
      edad: string ,
      dni: string ,
      mail: string ,
      password: string, 
      imgPerfil: string,
    ){
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
      this.mail = mail;
      this.password = password;
      this.imgPerfil = imgPerfil;
      this.perfil = "";
      this.aprobado = false;
    }
}
