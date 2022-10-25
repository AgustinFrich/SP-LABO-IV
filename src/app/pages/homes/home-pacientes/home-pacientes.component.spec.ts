import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePacientesComponent } from './home-pacientes.component';

describe('HomePacientesComponent', () => {
  let component: HomePacientesComponent;
  let fixture: ComponentFixture<HomePacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
