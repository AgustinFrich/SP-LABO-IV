import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsperandoValidacionComponent } from './esperando-validacion.component';

describe('EsperandoValidacionComponent', () => {
  let component: EsperandoValidacionComponent;
  let fixture: ComponentFixture<EsperandoValidacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsperandoValidacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsperandoValidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
