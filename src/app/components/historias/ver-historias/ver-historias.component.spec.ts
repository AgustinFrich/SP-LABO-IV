import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHistoriasComponent } from './ver-historias.component';

describe('VerHistoriasComponent', () => {
  let component: VerHistoriasComponent;
  let fixture: ComponentFixture<VerHistoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerHistoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerHistoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
