import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Cohort } from 'src/app/models/cohort.model';
import { CohortService } from 'src/app/services/cohort.service';

@Component({
  selector: 'app-edit-cohort',
  templateUrl: './edit-cohort.component.html',
  styleUrls: ['./edit-cohort.component.scss'],
  providers: [DatePipe]
})
export class EditCohortComponent implements OnInit {

  currentCohort: Cohort = {
    id: 0,
    name: '',
    courseName: '',
    startDate: new Date(),
    endDate: new Date()
  };
  message = '';

  selectedStartDate: NgbDateStruct = {
    year: 0,
    month: 0,
    day: 0
  }
  selectedEndDate: NgbDateStruct = {
    year: 0,
    month: 0,
    day: 0
  }

  constructor(
    private cohortService: CohortService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.getCohort(this.route.snapshot.params["id"]);
  }

  getCohort(id: string): void {
    this.cohortService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCohort = data;
          console.log(data);
          
          let startDateSt = this.datePipe.transform(this.currentCohort.startDate, 'yyyyMMdd')?.toString();
          this.selectedStartDate.year = Number(startDateSt?.substring(0, 4));
          this.selectedStartDate.month = Number(startDateSt?.substring(4, 6));
          this.selectedStartDate.day = Number(startDateSt?.substring(6));

          let endDateSt = this.datePipe.transform(this.currentCohort.endDate, 'yyyyMMdd')?.toString();
          this.selectedEndDate.year = Number(endDateSt?.substring(0, 4));
          this.selectedEndDate.month = Number(endDateSt?.substring(4, 6));
          this.selectedEndDate.day = Number(endDateSt?.substring(6));
        },
        error: (e) => console.error(e)
      });
  }

  updateCohort(): void {
    this.message = '';

    let sdMonth = this.selectedStartDate?.month.toString();
    if (this.selectedStartDate?.month < 10) {
      sdMonth = '0' + this.selectedStartDate?.month;
    }
    let sdDay = this.selectedStartDate?.day.toString();
    if (this.selectedStartDate?.day < 10) {
      sdDay = '0' + this.selectedStartDate?.day;
    }
    this.currentCohort.startDate = new Date(this.selectedStartDate?.year + '-' + sdMonth + '-' + sdDay + 'T01:00:00');

    let edMonth = this.selectedEndDate?.month.toString();
    if (this.selectedEndDate?.month < 10) {
      edMonth = '0' + this.selectedEndDate?.month;
    }
    let edDay = this.selectedEndDate?.day.toString();
    if (this.selectedEndDate?.day < 10) {
      edDay = '0' + this.selectedEndDate?.day;
    }
    this.currentCohort.endDate = new Date(this.selectedEndDate?.year + '-' + edMonth + '-' + edDay + 'T01:00:00');

    this.cohortService.update(this.currentCohort.id, this.currentCohort)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This cohort was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteCohort(): void {
    this.cohortService.delete(this.currentCohort.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/cohort']);
        },
        error: (e) => console.error(e)
      });
  }

  cancel(): void {
    this.router.navigateByUrl('cohort');
  }

}