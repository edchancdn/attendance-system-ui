import { TestBed } from '@angular/core/testing';

import { CohortStudentService } from './cohort-student.service';

describe('CohortStudentService', () => {
  let service: CohortStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CohortStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
