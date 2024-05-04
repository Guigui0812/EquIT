import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidingSessionFormComponent } from './riding-session-form.component';

describe('RiderSessionFormComponent', () => {
  let component: RidingSessionFormComponent;
  let fixture: ComponentFixture<RidingSessionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidingSessionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RidingSessionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
