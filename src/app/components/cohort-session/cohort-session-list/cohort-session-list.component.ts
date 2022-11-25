import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cohort } from 'src/app/models/cohort.model';
import { Session } from 'src/app/models/session.model';
import { CohortSessionService } from 'src/app/services/cohort-session.service';
import { CohortService } from 'src/app/services/cohort.service';
import { SessionService } from 'src/app/services/session.service';
import { AddCohortSessionComponent } from '../add-cohort-session/add-cohort-session.component';

@Component({
  selector: 'app-cohort-session-list',
  templateUrl: './cohort-session-list.component.html',
  styleUrls: ['./cohort-session-list.component.scss'],
  providers: [DatePipe]
})
export class CohortSessionListComponent implements OnInit {

  currentCohort: Cohort = {};
  message = '';
  sessions?: Session[];
  currentSession: Session = {};
  currentSessionIndex = -1;
  addSessionsToCohort: Session[] = [];

  selectedStartDate: NgbDateStruct = {
    year: 0,
    month: 0,
    day: 0
  };
  selectedEndDate: NgbDateStruct = {
    year: 0,
    month: 0,
    day: 0
  }

  constructor(
    private cohortService: CohortService,
    private cohortSessionService: CohortSessionService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private sessionService: SessionService,
    public modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCohort(this.route.snapshot.params["id"]);
  }

  getCohort(id: string): void {
    this.cohortService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCohort = data;
          console.log(data);

          let startDateSt = this.datePipe.transform(this.currentCohort.startDate, 'yyyyMMdd', 'UTC-0')?.toString();
          this.selectedStartDate.year = Number(startDateSt?.substring(0, 4));
          this.selectedStartDate.month = Number(startDateSt?.substring(4, 6));
          this.selectedStartDate.day = Number(startDateSt?.substring(6));

          let endDateSt = this.datePipe.transform(this.currentCohort.endDate, 'yyyyMMdd', 'UTC-0')?.toString();
          this.selectedEndDate.year = Number(endDateSt?.substring(0, 4));
          this.selectedEndDate.month = Number(endDateSt?.substring(4, 6));
          this.selectedEndDate.day = Number(endDateSt?.substring(6));

          this.sessions = this.currentCohort.sessions;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.getCohort(this.currentCohort.id);
    this.currentSession = {};
    this.currentSessionIndex = -1;
  }

  addSession(): void {
    // Get sessions
    this.sessionService.getAll()
      .subscribe({
        next: (data) => {
          this.addSessionsToCohort = data;
          console.log(data);
          // Open modal form
          const modalRef = this.modalService.open(AddCohortSessionComponent, { size: 'lg', backdrop: 'static' });
          modalRef.componentInstance.sessions = this.addSessionsToCohort;
          modalRef.result.then((result) => {
            if (result) {
              console.log(result);
              // Get selected sessions to add
              let add: number[] = result.filter(function (obj: { checked: any; }) {
                return obj.checked;
              }).map(function (obj: { id: any; }) { return obj.id; });
              this.cohortSessionService.addSessions(this.currentCohort.id, add)
                .subscribe({
                  next: (res) => {
                    console.log(res);
                    //this.refreshList();
                    this.currentCohort = res;
                    this.sessions = this.currentCohort.sessions;
                  },
                  error: (e) => console.error(e)
                });
            }
          }, (reason) => {
            console.log(reason);
          });
        },
        error: (e) => console.error(e)
      });
  }

  deleteSessionRow(index: number): void {
    this.currentSessionIndex = -1;
    let del: number[] = [index];
    this.cohortSessionService.delete(this.currentCohort.id, del)
      .subscribe({
        next: (res) => {
          console.log(res);
          //this.refreshList();
          this.currentCohort = res;
          this.sessions = this.currentCohort.sessions;
        },
        error: (e) => console.error(e)
      });
  }

  viewSessionStudentRow(index: number): void {
    // this.currentIndex = index;
    // this.router.navigateByUrl('sessionstudent/' + index);
  }

}
