import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCohortSessionComponent } from './add-cohort-session.component';

describe('AddCohortSessionComponent', () => {
  let component: AddCohortSessionComponent;
  let fixture: ComponentFixture<AddCohortSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCohortSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCohortSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
