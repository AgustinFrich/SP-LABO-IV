export class Especialista {
    nombre: string; 
    apellido: string; 
    edad: string ;
    dni: string ;
    mail: string ;
    password: string; 
    imgPerfil: string; 
    aprobado: boolean;
    perfil: string;
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
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
      this.mail = mail;
      this.password = password;
      this.imgPerfil = imgPerfil;
      this.aprobado = false,
      this.perfil = "Especialista";
      this.especialidad = especialidad;
    }
}
