import { UtilsModule } from './components/utils/utils.module';
import { CommonModule } from '@angular/common';
import { IngresoModule } from './pages/ingreso/ingreso.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HomeEspecialistasComponent } from './pages/homes/home-especialistas/home-especialistas.component';
import { HomePacientesComponent } from './pages/homes/home-pacientes/home-pacientes.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HomeAdminsComponent } from './pages/homes/home-admins/home-admins.component';
import { HabilitarUsuariosComponent } from './components/admin/habilitar-usuarios/habilitar-usuarios.component';
import { CrearPacienteComponent } from './components/admin/crear-paciente/crear-paciente.component';
import { CrearEspecialistaComponent } from './components/admin/crear-especialista/crear-especialista.component';
import { CrearAdminComponent } from './components/admin/crear-admin/crear-admin.component';
import { SolicitarTurnoComponent } from './components/turnos/solicitar-turno/solicitar-turno.component';
import { MisTurnosComponent } from './components/turnos/mis-turnos/mis-turnos.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { HttpClientModule } from '@angular/common/http';

import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { SeccionUsuariosComponent } from './components/seccion-usuarios/seccion-usuarios.component';
import { AgregarHistoriaComponent } from './components/historias/agregar-historia/agregar-historia.component';
import { TodosUsuariosComponent } from './components/admin/todos-usuarios/todos-usuarios.component';
import { VerHistoriasComponent } from './components/historias/ver-historias/ver-historias.component';
import { MiHistoriaComponent } from './components/historias/mi-historia/mi-historia.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { GraficosComponent } from './components/graficos/graficos.component';
import { TurnosPorDiaComponent } from './components/graficos/turnos-por-dia/turnos-por-dia.component';
import { TurnosPorEspecialidadComponent } from './components/graficos/turnos-por-especialidad/turnos-por-especialidad.component';
import { LogIngresosComponent } from './components/graficos/log-ingresos/log-ingresos.component';
import { TurnosSolicitadosComponent } from './components/graficos/turnos-solicitados/turnos-solicitados.component';
import { TurnosFinalizadosComponent } from './components/graficos/turnos-finalizados/turnos-finalizados.component';
import { DniPipe } from './pipes/dni.pipe';
import { TempPipe } from './pipes/temp.pipe';
import { AlturaPipe } from './pipes/altura.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { AgrandarDirective } from './directives/agrandar.directive';
import { BorderDirective } from './directives/border.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeEspecialistasComponent,
    HomePacientesComponent,
    HomeAdminsComponent,
    HabilitarUsuariosComponent,
    CrearPacienteComponent,
    CrearEspecialistaComponent,
    CrearAdminComponent,
    SolicitarTurnoComponent,
    MisTurnosComponent,
    MiPerfilComponent,
    SeccionUsuariosComponent,
    AgregarHistoriaComponent,
    TodosUsuariosComponent,
    VerHistoriasComponent,
    MiHistoriaComponent,
    GraficosComponent,
    TurnosPorDiaComponent,
    TurnosPorEspecialidadComponent,
    LogIngresosComponent,
    TurnosSolicitadosComponent,
    TurnosFinalizadosComponent,
    DniPipe,
    TempPipe,
    AlturaPipe,
    HighlightDirective,
    AgrandarDirective,
    BorderDirective,
  ],
  imports: [
    BrowserModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IngresoModule,
    BrowserAnimationsModule,
    UtilsModule,
    SweetAlert2Module.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideFirebaseApp(() => initializeApp(environment.firebase, 'Secondary')),
    NgChartsModule,
  ],
  exports: [],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
