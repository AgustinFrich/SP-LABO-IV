import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEspecialistasComponent } from './login-especialistas.component';

describe('LoginEspecialistasComponent', () => {
  let component: LoginEspecialistasComponent;
  let fixture: ComponentFixture<LoginEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEspecialistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
