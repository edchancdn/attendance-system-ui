import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCohortStudentComponent } from './add-cohort-student.component';

describe('AddCohortStudentComponent', () => {
  let component: AddCohortStudentComponent;
  let fixture: ComponentFixture<AddCohortStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCohortStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCohortStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
