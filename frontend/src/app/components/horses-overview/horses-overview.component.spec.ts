import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorsesOverviewComponent } from './horses-overview.component';

describe('HorsesOverviewComponent', () => {
  let component: HorsesOverviewComponent;
  let fixture: ComponentFixture<HorsesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorsesOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorsesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
