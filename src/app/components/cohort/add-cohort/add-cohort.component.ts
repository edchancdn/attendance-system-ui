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
    this.cohort.startDate = new Date(this.selectedStartDate?.year.toString() + '/'
      + this.selectedStartDate?.month.toString() + '/'
      + this.selectedStartDate?.day.toString() + ' 00:00 UTC-0');

    this.cohort.endDate = new Date(this.selectedEndDate?.year.toString() + '/'
      + this.selectedEndDate?.month.toString() + '/'
      + this.selectedEndDate?.day.toString() + ' 00:00 UTC-0');

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

    let startDateSt = this.datePipe.transform(this.cohort.startDate, 'yyyyMMdd', 'UTC-0')?.toString();
    this.selectedStartDate.year = Number(startDateSt?.substring(0, 4));
    this.selectedStartDate.month = Number(startDateSt?.substring(4, 6));
    this.selectedStartDate.day = Number(startDateSt?.substring(6));

    let endDateSt = this.datePipe.transform(this.cohort.endDate, 'yyyyMMdd', 'UTC-0')?.toString();
    this.selectedEndDate.year = Number(endDateSt?.substring(0, 4));
    this.selectedEndDate.month = Number(endDateSt?.substring(4, 6));
    this.selectedEndDate.day = Number(endDateSt?.substring(6));
  }

  cancel(): void {
    this.router.navigateByUrl('cohort');
  }

}
