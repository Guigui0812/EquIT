import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidersOverviewComponent } from './riders-overview.component';

describe('RidersOverviewComponent', () => {
  let component: RidersOverviewComponent;
  let fixture: ComponentFixture<RidersOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidersOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RidersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
