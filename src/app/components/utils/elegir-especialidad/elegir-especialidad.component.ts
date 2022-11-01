import { UtilsService } from './../../../services/utils.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Especialidad } from 'src/app/classes/especialidad';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-elegir-especialidad',
  templateUrl: './elegir-especialidad.component.html',
  styleUrls: ['./elegir-especialidad.component.scss'],
})
export class ElegirEspecialidadComponent implements OnInit {
  @Output() elegirEspecialidad = new EventEmitter<Especialidad[]>();
  @Input() permitirAniadir = false;

  especialidades: any[] = [];
  seleccionadas: any[] = [];

  nuevo = '';
  imagen?: File;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.utilsService.getEspecialidades().subscribe((docs) => {
      this.especialidades = [];
      docs.forEach((doc) => {
        this.especialidades.push({ ...doc, checked: false });
      });
    });
  }

  tocar(e: any) {
    const index = this.especialidades.indexOf(e);
    if (index != -1) {
      this.especialidades[index].checked = !this.especialidades[index].checked;
      if (e.checked) {
        this.seleccionar(e);
      } else {
        this.deseleccionar(e);
      }
    }

    this.elegirEspecialidad.emit(this.seleccionadas);
  }

  seleccionar(especialidad: Especialidad) {
    this.seleccionadas.push(especialidad);
    console.log(this.seleccionadas);
  }

  deseleccionar(especialidad: Especialidad) {
    const index = this.seleccionadas.indexOf(especialidad);
    if (index >= 0) {
      this.seleccionadas.splice(index, 1);
    }
    console.log(this.seleccionadas);
  }

  Aniadir() {
    if (this.nuevo.length > 0 && this.imagen !== undefined) {
      const e = new Especialidad(this.nuevo, '');
      this.utilsService.aniadirEspecialidad(e, this.imagen);
      this.nuevo = '';
      this.imagen = undefined;
    } else {
      Swal.fire(
        'Error!',
        'No puede añadir una especialidad con un campo vacio',
        'error'
      );
    }
  }

  cambiarImagen($event: any) {
    if ($event.target.files.length > 0) {
      this.imagen = $event.target.files[0];
    }
  }
}
