import { UtilsModule } from './../../components/utils/utils.module';
import { ElegirEspecialidadComponent } from './../../components/utils/elegir-especialidad/elegir-especialidad.component';
import { AppModule } from './../../app.module';
import { AppRoutingModule } from './../../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPacientesComponent } from './login-pacientes/login-pacientes.component';
import { LoginEspecialistasComponent } from './login-especialistas/login-especialistas.component';
import { RegistroEspecialistasComponent } from './registro-especialistas/registro-especialistas.component';
import { RegistroPacientesComponent } from './registro-pacientes/registro-pacientes.component';

@NgModule({
  declarations: [
    LoginPacientesComponent,
    LoginEspecialistasComponent,
    RegistroEspecialistasComponent,
    RegistroPacientesComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, UtilsModule
  ], providers: []
})
export class IngresoModule { }
