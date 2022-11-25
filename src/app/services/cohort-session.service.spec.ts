import { TestBed } from '@angular/core/testing';

import { CohortSessionService } from './cohort-session.service';

describe('CohortSessionService', () => {
  let service: CohortSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CohortSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
