import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPacientesComponent } from './login-pacientes.component';

describe('LoginPacientesComponent', () => {
  let component: LoginPacientesComponent;
  let fixture: ComponentFixture<LoginPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
