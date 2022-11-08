import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiHistoriaComponent } from './mi-historia.component';

describe('MiHistoriaComponent', () => {
  let component: MiHistoriaComponent;
  let fixture: ComponentFixture<MiHistoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiHistoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
