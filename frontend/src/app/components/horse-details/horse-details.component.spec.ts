import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseDetailsComponent } from './horse-details.component';

describe('HorseDetailsComponent', () => {
  let component: HorseDetailsComponent;
  let fixture: ComponentFixture<HorseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorseDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
