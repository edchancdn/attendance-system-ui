import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortSessionListComponent } from './cohort-session-list.component';

describe('CohortSessionListComponent', () => {
  let component: CohortSessionListComponent;
  let fixture: ComponentFixture<CohortSessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CohortSessionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CohortSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
