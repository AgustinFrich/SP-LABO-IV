import { HomePageComponent } from './pages/home-page/home-page.component';
import { EsperandoValidacionComponent } from './components/utils/esperando-validacion/esperando-validacion.component';
import { LoginPacientesComponent } from './pages/ingreso/login-pacientes/login-pacientes.component';
import { RegistroEspecialistasComponent } from './pages/ingreso/registro-especialistas/registro-especialistas.component';
import { RegistroPacientesComponent } from './pages/ingreso/registro-pacientes/registro-pacientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEspecialistasComponent } from './pages/homes/home-especialistas/home-especialistas.component';
import { HomePacientesComponent } from './pages/homes/home-pacientes/home-pacientes.component';
import { HabilitarUsuariosComponent } from './components/admin/habilitar-usuarios/habilitar-usuarios.component';
import { HomeAdminsComponent } from './pages/homes/home-admins/home-admins.component';
import { CrearEspecialistaComponent } from './components/admin/crear-especialista/crear-especialista.component';
import { CrearPacienteComponent } from './components/admin/crear-paciente/crear-paciente.component';
import { CrearAdminComponent } from './components/admin/crear-admin/crear-admin.component';

const routes: Routes = [
  { path: "registro/paciente", component: RegistroPacientesComponent },
  { path: "registro/especialista", component: RegistroEspecialistasComponent },
  
  { path: "ingreso", component: LoginPacientesComponent },
  
  { path: "home/esperando-validacion", component: EsperandoValidacionComponent },
  
  { path: "home/pacientes", component: HomePacientesComponent },
  { path: "home/especialistas", component: HomeEspecialistasComponent },
  { path: "home/administradores", component: HomeAdminsComponent,
    children: [
      {path: "", redirectTo: "habilitar-especialistas", pathMatch: "full"},
      { path: "habilitar-especialistas", component: HabilitarUsuariosComponent },
      { path: "generar-especialista", component: CrearEspecialistaComponent },
      { path: "generar-paciente", component: CrearPacienteComponent },
      { path: "generar-admin", component: CrearAdminComponent }
    ]
  },

  { path: "**", component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
