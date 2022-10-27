import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTotalComponent } from './registro-total.component';

describe('RegistroTotalComponent', () => {
  let component: RegistroTotalComponent;
  let fixture: ComponentFixture<RegistroTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroTotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
