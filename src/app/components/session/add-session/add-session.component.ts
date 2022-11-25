import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'src/app/models/session.model';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss'],
  providers: [DatePipe]
})
export class AddSessionComponent {

  session: Session = {
    sessionDate: new Date(),
    startTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
    endTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
  };
  submitted = false;
  meridian = true;

  selectedSessionDate: NgbDateStruct = {
    year: 0,
    month: 0,
    day: 0
  }

  selectedStartTime: any = {
    hour: 0,
    minute: 0
  }

  selectedEndTime: NgbTimeStruct = {
    hour: 0,
    minute: 0,
    second: 0
  }

  constructor(private sessionService: SessionService,
    private router: Router,
    private datePipe: DatePipe) { }

  saveSession(): void {
    this.session.sessionDate = new Date(this.selectedSessionDate?.year.toString() + '/'
      + this.selectedSessionDate?.month.toString() + '/'
      + this.selectedSessionDate?.day.toString() + ' 00:00 UTC-0');

    this.session.startTime = this.selectedStartTime.hour.toString() + ':' + this.selectedStartTime.minute.toString() + ':00';
    this.session.endTime = this.selectedEndTime.hour.toString() + ':' + this.selectedEndTime.minute.toString() + ':00';

    const data = {
      sessionDate: this.session.sessionDate,
      startTime: this.session.startTime,
      endTime: this.session.endTime
    };

    this.sessionService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newSession(): void {
    this.submitted = false;
    this.session = {
      sessionDate: new Date(),
      startTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
      endTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    };

    let startDateSt = this.datePipe.transform(this.session.sessionDate, 'yyyyMMdd', 'UTC-0')?.toString();
    this.selectedSessionDate.year = Number(startDateSt?.substring(0, 4));
    this.selectedSessionDate.month = Number(startDateSt?.substring(4, 6));
    this.selectedSessionDate.day = Number(startDateSt?.substring(6));

    this.selectedStartTime.hour = Number(this.session.startTime?.substring(0, 2));
    this.selectedStartTime.minute = Number(this.session.startTime?.substring(3, 5));

    this.selectedEndTime.hour = Number(this.session.endTime?.substring(0, 2));
    this.selectedEndTime.minute = Number(this.session.endTime?.substring(3, 5));
  }

  cancel(): void {
    this.router.navigateByUrl('session');
  }

}
