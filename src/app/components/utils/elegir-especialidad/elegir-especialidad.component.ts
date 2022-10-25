import { UtilsService } from './../../../services/utils.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-elegir-especialidad',
  templateUrl: './elegir-especialidad.component.html',
  styleUrls: ['./elegir-especialidad.component.scss']
})
export class ElegirEspecialidadComponent implements OnInit {
  @Output() elegirEspecialidad = new EventEmitter<string[]>();
  @Input() permitirAniadir = false;
  
  especialidades: any[] = [];
  seleccionadas: any[] = [];
  
  nuevo = "";
  
  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.utilsService.getEspecialidades().subscribe(((docs) => {
      this.especialidades = [];
      docs.forEach((doc) => {
        this.especialidades.push({nombre: doc['nombre'], checked: false});
      })
    }))
  }

  tocar(e: any) {
    const index = this.especialidades.indexOf(e);
    if(index != -1) {
      this.especialidades[index].checked = !this.especialidades[index].checked
      if(e.checked) {
        this.seleccionar(e.nombre);
      } else {
        this.deseleccionar(e.nombre);
      }
    }

    this.elegirEspecialidad.emit(this.seleccionadas);
  }

  seleccionar(especialidad: string) {
    this.seleccionadas.push(especialidad);
    console.log(this.seleccionadas);
  }
  
  deseleccionar(especialidad: string) {
    
    const index = this.seleccionadas.indexOf(especialidad);
    if(index >= 0){
      this.seleccionadas.splice(index, 1);
    }
    console.log(this.seleccionadas);
  }

  Aniadir() {
    if(this.nuevo.length > 0) {
      this.utilsService.aniadirEspecialidad(this.nuevo);
      this.nuevo = "";
    }
  }
}
