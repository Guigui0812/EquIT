import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderFormComponent } from './rider-form.component';

describe('RiderFormComponent', () => {
  let component: RiderFormComponent;
  let fixture: ComponentFixture<RiderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
