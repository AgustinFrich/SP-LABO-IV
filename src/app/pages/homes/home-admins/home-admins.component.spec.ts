import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminsComponent } from './home-admins.component';

describe('HomeAdminsComponent', () => {
  let component: HomeAdminsComponent;
  let fixture: ComponentFixture<HomeAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAdminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
