import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidingSessionReservationComponent } from './riding-session-reservation.component';

describe('RidingSessionReservationComponent', () => {
  let component: RidingSessionReservationComponent;
  let fixture: ComponentFixture<RidingSessionReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidingSessionReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RidingSessionReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
