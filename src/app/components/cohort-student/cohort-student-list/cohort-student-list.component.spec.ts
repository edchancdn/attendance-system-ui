import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortStudentListComponent } from './cohort-student-list.component';

describe('CohortStudentListComponent', () => {
  let component: CohortStudentListComponent;
  let fixture: ComponentFixture<CohortStudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CohortStudentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CohortStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
