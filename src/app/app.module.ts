import { UtilsModule } from './components/utils/utils.module';
import { CommonModule } from '@angular/common';
import { IngresoModule } from './pages/ingreso/ingreso.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElegirEspecialidadComponent } from './components/utils/elegir-especialidad/elegir-especialidad.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HomeEspecialistasComponent } from './pages/homes/home-especialistas/home-especialistas.component';
import { HomePacientesComponent } from './pages/homes/home-pacientes/home-pacientes.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingComponent } from './components/utils/loading/loading.component';
import { VolverInicioComponent } from './components/utils/volver-inicio/volver-inicio.component';
import { HomeAdminsComponent } from './pages/homes/home-admins/home-admins.component';
import { HabilitarUsuariosComponent } from './components/admin/habilitar-usuarios/habilitar-usuarios.component';
import { CrearPacienteComponent } from './components/admin/crear-paciente/crear-paciente.component';
import { CrearEspecialistaComponent } from './components/admin/crear-especialista/crear-especialista.component';
import { CrearAdminComponent } from './components/admin/crear-admin/crear-admin.component';
import { SolicitarTurnoComponent } from './components/turnos/solicitar-turno/solicitar-turno.component';
import { MisTurnosComponent } from './components/turnos/mis-turnos/mis-turnos.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';

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
    MiPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule, CommonModule,
    FormsModule, IngresoModule, UtilsModule, SweetAlert2Module.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideFirebaseApp(() => initializeApp(environment.firebase, "Secondary")),
  ], exports: [],
  providers: [    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
