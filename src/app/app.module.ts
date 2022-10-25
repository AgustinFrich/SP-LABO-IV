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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeEspecialistasComponent,
    HomePacientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule, CommonModule,
    FormsModule, IngresoModule, UtilsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ], exports: [],
  providers: [    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
