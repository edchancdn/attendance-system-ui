import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionStudentListComponent } from './session-student-list.component';

describe('SessionStudentListComponent', () => {
  let component: SessionStudentListComponent;
  let fixture: ComponentFixture<SessionStudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionStudentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
