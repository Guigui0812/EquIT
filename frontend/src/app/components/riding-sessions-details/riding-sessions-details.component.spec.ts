import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidingSessionsDetailsComponent } from './riding-sessions-details.component';

describe('RidingSessionsDetailsComponent', () => {
  let component: RidingSessionsDetailsComponent;
  let fixture: ComponentFixture<RidingSessionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidingSessionsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RidingSessionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
