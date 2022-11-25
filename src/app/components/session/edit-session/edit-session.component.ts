import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'src/app/models/session.model';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.scss'],
  providers: [DatePipe]
})
export class EditSessionComponent implements OnInit {

  currentSession: Session = {
    id: 0,
    sessionDate: new Date(),
    startTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
    endTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
  };
  message = '';
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

  selectedEndTime: any = {
    hour: 0,
    minute: 0
  }

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.getSession(this.route.snapshot.params["id"]);
  }

  getSession(id: string): void {
    this.sessionService.get(id)
      .subscribe({
        next: (data) => {
          this.currentSession = data;
          console.log(data);

          let sessionDateSt = this.datePipe.transform(this.currentSession.sessionDate, 'yyyyMMdd', 'UTC-0')?.toString();
          this.selectedSessionDate.year = Number(sessionDateSt?.substring(0, 4));
          this.selectedSessionDate.month = Number(sessionDateSt?.substring(4, 6));
          this.selectedSessionDate.day = Number(sessionDateSt?.substring(6));

          this.selectedStartTime.hour = Number(this.currentSession.startTime?.substring(0, 2));
          this.selectedStartTime.minute = Number(this.currentSession.startTime?.substring(3, 5));

          this.selectedEndTime.hour = Number(this.currentSession.endTime?.substring(0, 2));
          this.selectedEndTime.minute = Number(this.currentSession.endTime?.substring(3, 5));
        },
        error: (e) => console.error(e)
      });
  }

  updateSession(): void {
    this.message = '';

    this.currentSession.sessionDate = new Date(this.selectedSessionDate?.year.toString() + '/'
      + this.selectedSessionDate?.month.toString() + '/'
      + this.selectedSessionDate?.day.toString() + ' 00:00 UTC-0');

    this.currentSession.startTime = this.selectedStartTime.hour.toString() + ':' + this.selectedStartTime.minute.toString() + ':00';
    this.currentSession.endTime = this.selectedEndTime.hour.toString() + ':' + this.selectedEndTime.minute.toString() + ':00';

    this.sessionService.update(this.currentSession.id, this.currentSession)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This session was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteSession(): void {
    this.sessionService.delete(this.currentSession.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/session']);
        },
        error: (e) => console.error(e)
      });
  }

  cancel(): void {
    this.router.navigateByUrl('session');
  }

}
