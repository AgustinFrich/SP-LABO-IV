import { Usuario } from "./usuario";

export class Admin extends Usuario {
    constructor(
        nombre: string, 
        apellido: string, 
        edad: string ,
        dni: string ,
        mail: string ,
        password: string, 
        imgPerfil: string,
    ){
    super(nombre, apellido, edad, dni, mail, password, imgPerfil);
        this.perfil = "Admin";
        this.aprobado = true;
    }
}
