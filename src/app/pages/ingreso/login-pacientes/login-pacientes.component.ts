import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-pacientes',
  templateUrl: './login-pacientes.component.html',
  styleUrls: ['./login-pacientes.component.scss']
})
export class LoginPacientesComponent implements OnInit {

  public forma!: FormGroup;

  constructor(public fb: FormBuilder, private auth: AuthService) {   }

  ngOnInit(): void 
  {
    this.forma = this.fb.group({
      "mail": ['', [Validators.required, Validators.email]],
      "password": ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  LoginPaciente() {
    this.auth.LoginPaciente(
      this.forma.value.mail,
      this.forma.value.password
    );
  }
}
