import { TestBed } from '@angular/core/testing';

import { RidingSessionService } from './riding-session.service';

describe('RiderSessionService', () => {
  let service: RidingSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidingSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
