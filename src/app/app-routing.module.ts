import { HomePageComponent } from './pages/home-page/home-page.component';
import { EsperandoValidacionComponent } from './components/utils/esperando-validacion/esperando-validacion.component';
import { LoginPacientesComponent } from './pages/ingreso/login-pacientes/login-pacientes.component';
import { RegistroEspecialistasComponent } from './pages/ingreso/registro-especialistas/registro-especialistas.component';
import { RegistroPacientesComponent } from './pages/ingreso/registro-pacientes/registro-pacientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginEspecialistasComponent } from './pages/ingreso/login-especialistas/login-especialistas.component';
import { HomeEspecialistasComponent } from './pages/homes/home-especialistas/home-especialistas.component';

const routes: Routes = [
  { path: "registro/paciente", component: RegistroPacientesComponent },
  { path: "registro/especialista", component: RegistroEspecialistasComponent },
  { path: "ingreso/paciente", component: LoginPacientesComponent },
  { path: "ingreso/especialista", component: LoginEspecialistasComponent },
  { path: "home/esperando-validacion", component: EsperandoValidacionComponent },
  { path: "home/especialistas", component: HomeEspecialistasComponent },
  // { path: "home/paciente", component:  }
  { path: "**", component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
