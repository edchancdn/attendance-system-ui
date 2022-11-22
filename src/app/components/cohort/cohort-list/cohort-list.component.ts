import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cohort } from 'src/app/models/cohort.model';
import { CohortService } from 'src/app/services/cohort.service';

@Component({
  selector: 'app-cohort-list',
  templateUrl: './cohort-list.component.html',
  styleUrls: ['./cohort-list.component.scss']
})
export class CohortListComponent implements OnInit {

  cohorts?: Cohort[];
  currentCohort: Cohort = {};
  currentIndex = -1;
  lastName = '';

  constructor(private cohortService: CohortService,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveCohorts();
  }

  retrieveCohorts(): void {
    this.cohortService.getAll()
      .subscribe({
        next: (data) => {
          this.cohorts = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCohorts();
    this.currentCohort = {};
    this.currentIndex = -1;
  }

  setActiveCohort(cohort: Cohort, index: number): void {
    this.currentCohort = cohort;
    this.currentIndex = index;
  }

  addCohort(): void {
    this.router.navigateByUrl('addcohort');
  }

  deleteRow(index: number): void {
    this.currentIndex = -1;
    this.cohortService.delete(index)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  editRow(index: number): void {
    this.currentIndex = index;
    this.router.navigateByUrl('editcohort/' + index);
  }

  viewCohortStudentRow(index: number): void {
    this.currentIndex = index;
    this.router.navigateByUrl('cohortstudent/' + index);
  }


  searchName(): void {
    this.currentCohort = {};
    this.currentIndex = -1;
    this.cohortService.findByName(this.lastName)
      .subscribe({
        next: (data) => {
          this.cohorts = data;
          console.log(data);
        },
        error: (e) => {
          console.error(e);
          this.cohorts = [];
        }
      });
  }

}
