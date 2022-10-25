import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEspecialistasComponent } from './home-especialistas.component';

describe('HomeEspecialistasComponent', () => {
  let component: HomeEspecialistasComponent;
  let fixture: ComponentFixture<HomeEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEspecialistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
