import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { Usuario } from 'src/app/classes/usuario';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login-pacientes',
  templateUrl: './login-pacientes.component.html',
  styleUrls: ['./login-pacientes.component.scss']
})
export class LoginPacientesComponent implements OnInit, AfterViewInit {
  accesos: Usuario[] = [];
  public forma!: FormGroup;

  constructor(public fb: FormBuilder, private auth: AuthService, private utils: UtilsService, private l: LoadingService ) {   }

  ngOnInit(): void 
  {
    this.l.loading = true;
    this.utils.getArrayAccesoRapido().then((usuarios) => {
      this.accesos = usuarios;
    });
    this.forma = this.fb.group({
      "mail": ['', [Validators.required, Validators.email]],
      "password": ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  
  ngAfterViewInit(): void {
    this.l.loading = false;
  }

  LoginPaciente() {
    console.log("LOG INNNN");
    this.auth.LoginPaciente(
      this.forma.value.mail,
      this.forma.value.password
    );
  }

  Seleccionar(mail: string, password: string) {
    this.forma.setValue({mail: mail, password: password});
  }
}
