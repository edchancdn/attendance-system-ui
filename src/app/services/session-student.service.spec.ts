import { TestBed } from '@angular/core/testing';

import { SessionStudentService } from './session-student.service';

describe('SessionStudentService', () => {
  let service: SessionStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
