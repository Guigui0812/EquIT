import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidingSessionReservationFormComponent } from './riding-session-reservation-form.component';

describe('RidingSessionReservationFormComponent', () => {
  let component: RidingSessionReservationFormComponent;
  let fixture: ComponentFixture<RidingSessionReservationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidingSessionReservationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RidingSessionReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
