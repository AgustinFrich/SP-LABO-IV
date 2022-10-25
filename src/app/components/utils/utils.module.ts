import { FormsModule } from '@angular/forms';
import { ElegirEspecialidadComponent } from './elegir-especialidad/elegir-especialidad.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsperandoValidacionComponent } from './esperando-validacion/esperando-validacion.component';



@NgModule({
  declarations: [ElegirEspecialidadComponent, EsperandoValidacionComponent],
  imports: [
    CommonModule, FormsModule
  ], exports: [ElegirEspecialidadComponent]
})
export class UtilsModule { }
