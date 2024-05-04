import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidingSessionsOverviewComponent } from './riding-sessions-overview.component';

describe('RidingSessionsOverviewComponent', () => {
  let component: RidingSessionsOverviewComponent;
  let fixture: ComponentFixture<RidingSessionsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidingSessionsOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RidingSessionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
