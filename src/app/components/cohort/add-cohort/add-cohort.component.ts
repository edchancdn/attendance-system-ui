import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cohort } from 'src/app/models/cohort.model';
import { CohortService } from 'src/app/services/cohort.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-cohort',
  templateUrl: './add-cohort.component.html',
  styleUrls: ['./add-cohort.component.scss'],
  providers: [DatePipe]
})
export class AddCohortComponent {

  cohort: Cohort = {
    name: '',
    courseName: '',
    startDate: new Date(),
    endDate: new Date()
  };
  submitted = false;

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

  constructor(private cohortService: CohortService,
    private router: Router,
    private datePipe: DatePipe) { }

  saveCohort(): void {
    let sdMonth = this.selectedStartDate?.month.toString();
    if (this.selectedStartDate?.month < 10) {
      sdMonth = '0' + this.selectedStartDate?.month;
    }
    let sdDay = this.selectedStartDate?.day.toString();
    if (this.selectedStartDate?.day < 10) {
      sdDay = '0' + this.selectedStartDate?.day;
    }
    this.cohort.startDate = new Date(this.selectedStartDate?.year + '-' + sdMonth + '-' + sdDay + 'T01:00:00');

    let edMonth = this.selectedEndDate?.month.toString();
    if (this.selectedEndDate?.month < 10) {
      edMonth = '0' + this.selectedEndDate?.month;
    }
    let edDay = this.selectedEndDate?.day.toString();
    if (this.selectedEndDate?.day < 10) {
      edDay = '0' + this.selectedEndDate?.day;
    }
    this.cohort.endDate = new Date(this.selectedEndDate?.year + '-' + edMonth + '-' + edDay + 'T01:00:00');

    const data = {
      name: this.cohort.name,
      courseName: this.cohort.courseName,
      startDate: this.cohort.startDate,
      endDate: this.cohort.endDate
    };

    this.cohortService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newCohort(): void {
    this.submitted = false;
    this.cohort = {
      name: '',
      courseName: '',
      startDate: new Date(),
      endDate: new Date()
    };

    let startDateSt = this.datePipe.transform(this.cohort.startDate, 'yyyyMMdd')?.toString();
    this.selectedStartDate.year = Number(startDateSt?.substring(0, 4));
    this.selectedStartDate.month = Number(startDateSt?.substring(4, 6));
    this.selectedStartDate.day = Number(startDateSt?.substring(6));

    let endDateSt = this.datePipe.transform(this.cohort.endDate, 'yyyyMMdd')?.toString();
    this.selectedEndDate.year = Number(endDateSt?.substring(0, 4));
    this.selectedEndDate.month = Number(endDateSt?.substring(4, 6));
    this.selectedEndDate.day = Number(endDateSt?.substring(6));
  }

  cancel(): void {
    this.router.navigateByUrl('cohort');
  }

}
