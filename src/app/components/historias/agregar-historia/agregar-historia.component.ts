import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoriaClinica } from 'src/app/classes/historia-clinica';
import { Paciente } from 'src/app/classes/paciente';
import { Turno } from 'src/app/classes/turno';
import { HistoriasClinicasService } from 'src/app/services/historias-clinicas.service';

@Component({
  selector: 'app-agregar-historia',
  templateUrl: './agregar-historia.component.html',
  styleUrls: ['./agregar-historia.component.scss'],
})
export class AgregarHistoriaComponent implements OnInit {
  @Input() turno?: Turno;

  public forma!: FormGroup;
  historiaClinica!: HistoriaClinica;

  constructor(private fb: FormBuilder, private hs: HistoriasClinicasService) {}

  ngOnInit(): void {
    this.forma = this.fb.group({
      comentario: ['', [Validators.required]],
      diagnostico: ['', [Validators.required]],
      altura: [this.historiaClinica?.altura, [Validators.required]],
      peso: [this.historiaClinica?.peso, [Validators.required]],
      temperatura: [this.historiaClinica?.temperatura, [Validators.required]],
      presion: [this.historiaClinica?.presion, [Validators.required]],
      clave: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });
    this.hs
      .traerHistoria(this.turno?.paciente!)
      .then((h) => {
        this.historiaClinica = h;
      })
      .then(() => {
        this.forma = this.fb.group({
          comentario: ['', [Validators.required]],
          diagnostico: ['', [Validators.required]],
          altura: [
            this.historiaClinica?.altura,
            [Validators.required, Validators.min(1), Validators.minLength(0)],
          ],
          peso: [
            this.historiaClinica?.peso,
            [Validators.required, Validators.min(1), Validators.minLength(0)],
          ],
          temperatura: [
            this.historiaClinica?.temperatura,
            [Validators.required],
          ],
          presion: [
            this.historiaClinica?.presion,
            [Validators.required, Validators.min(1), Validators.minLength(0)],
          ],
          clave: ['', [Validators.required]],
          valor: [
            '',
            [Validators.required, Validators.min(1), Validators.minLength(0)],
          ],
        });
      });
  }

  agregarHistoria() {
    this.historiaClinica.altura = this.forma.value.altura;
    this.historiaClinica.peso = this.forma.value.peso;
    this.historiaClinica.temperatura = this.forma.value.temperatura;
    this.historiaClinica.presion = this.forma.value.presion;
    this.turno!.finalizar = false;
    this.historiaClinica.dinamicos.push({
      clave: this.forma.value.clave,
      valor: this.forma.value.valor,
    });
    this.turno!.clave = this.forma.value.clave;
    this.turno!.valor = this.forma.value.valor;
    this.hs.agregarHistoriaClinica(
      this.historiaClinica,
      this.turno!,
      this.forma.value.diagnostico,
      this.forma.value.comentario
    );
  }
}
