import { FormsModule } from '@angular/forms';
import { ElegirEspecialidadComponent } from './elegir-especialidad/elegir-especialidad.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsperandoValidacionComponent } from './esperando-validacion/esperando-validacion.component';
import { VolverInicioComponent } from 'src/app/components/utils/volver-inicio/volver-inicio.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [ElegirEspecialidadComponent, EsperandoValidacionComponent, VolverInicioComponent, LoadingComponent],
  imports: [
    CommonModule, FormsModule, BrowserModule, RouterModule
  ], exports: [ElegirEspecialidadComponent, EsperandoValidacionComponent, VolverInicioComponent, LoadingComponent]
})
export class UtilsModule { }
