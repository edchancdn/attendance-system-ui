import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSessionStudentComponent } from './add-session-student.component';

describe('AddSessionStudentComponent', () => {
  let component: AddSessionStudentComponent;
  let fixture: ComponentFixture<AddSessionStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSessionStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSessionStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
